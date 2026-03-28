-- ============================================
-- AD SERVING PIPELINE
-- Adds targeting, spend tracking, serving & impression functions
-- ============================================

-- 1. New columns on campaigns
ALTER TABLE campaigns
ADD COLUMN IF NOT EXISTS targeting jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS spend_today numeric(12, 2) DEFAULT 0.00,
ADD COLUMN IF NOT EXISTS spend_today_date date DEFAULT CURRENT_DATE,
ADD COLUMN IF NOT EXISTS total_spent numeric(12, 2) DEFAULT 0.00;

-- 2. Indexes for ad serving hot path
CREATE INDEX IF NOT EXISTS idx_campaigns_targeting ON campaigns USING gin (targeting);

CREATE INDEX IF NOT EXISTS idx_ads_serving
ON ads (status, campaign_id)
WHERE status = 'active';

CREATE INDEX IF NOT EXISTS idx_campaigns_serving
ON campaigns (status, start_date, end_date)
WHERE status = 'active';

-- Impression dedup lookup
CREATE INDEX IF NOT EXISTS idx_ad_events_dedup
ON ad_events (ad_id, user_id, created_at DESC)
WHERE event_type = 'impression';

-- Daily spend aggregation
CREATE INDEX IF NOT EXISTS idx_ad_events_daily_spend
ON ad_events (campaign_id, event_type, created_at)
WHERE event_type = 'impression';

-- ============================================
-- DAILY SPEND RESET (cron safety net)
-- ============================================
CREATE OR REPLACE FUNCTION reset_daily_spend()
RETURNS void AS $$
BEGIN
  UPDATE campaigns
  SET spend_today = 0.00,
      spend_today_date = CURRENT_DATE,
      updated_at = NOW()
  WHERE status = 'active'
    AND spend_today_date < CURRENT_DATE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- SERVE ADS — returns ranked eligible ads
-- ============================================
CREATE OR REPLACE FUNCTION serve_ads(
  p_user_preferences TEXT[] DEFAULT '{}',
  p_format TEXT DEFAULT 'feed_image',
  p_limit INTEGER DEFAULT 3
)
RETURNS TABLE (
  ad_id UUID,
  campaign_id UUID,
  advertiser_id UUID,
  title TEXT,
  description TEXT,
  media_url TEXT,
  target_url TEXT,
  format TEXT,
  relevance_score NUMERIC
) AS $$
DECLARE
  v_hour INTEGER;
  v_pacing_fraction NUMERIC;
BEGIN
  v_hour := EXTRACT(HOUR FROM NOW());
  -- Linear pacing with 20% overpace buffer
  v_pacing_fraction := LEAST((v_hour + 1.0) / 24.0 * 1.2, 1.0);

  RETURN QUERY
  SELECT
    a.id AS ad_id,
    a.campaign_id,
    a.advertiser_id,
    a.title,
    a.description,
    a.media_url,
    a.target_url,
    a.format,
    (
      -- Targeting relevance (60 pts)
      CASE
        WHEN c.targeting IS NULL OR c.targeting = '[]'::jsonb OR jsonb_array_length(c.targeting) = 0
        THEN 0.5
        ELSE (
          SELECT COUNT(*)::NUMERIC / jsonb_array_length(c.targeting)
          FROM jsonb_array_elements_text(c.targeting) AS tag
          WHERE tag = ANY(p_user_preferences)
        )
      END * 60.0
      -- Budget headroom (20 pts)
      + CASE
          WHEN c.budget_daily > 0
          THEN LEAST((c.budget_daily - COALESCE(c.spend_today, 0)) / c.budget_daily, 1.0) * 20.0
          ELSE 10.0
        END
      -- Random factor (20 pts)
      + random() * 20.0
    ) AS relevance_score
  FROM ads a
  JOIN campaigns c ON a.campaign_id = c.id
  JOIN advertiser_balances ab ON c.advertiser_id = ab.id
  WHERE
    a.status = 'active'
    AND c.status = 'active'
    AND CURRENT_DATE >= c.start_date
    AND CURRENT_DATE <= c.end_date
    AND a.format = p_format
    AND COALESCE(c.spend_today, 0) < (c.budget_daily * v_pacing_fraction)
    AND COALESCE(c.total_spent, 0) < c.budget_total
    AND ab.balance >= 0.005
  ORDER BY relevance_score DESC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- RECORD IMPRESSION — dedup + pacing + billing
-- ============================================
CREATE OR REPLACE FUNCTION record_impression(
  p_ad_id UUID,
  p_campaign_id UUID,
  p_user_id UUID DEFAULT NULL,
  p_device_id TEXT DEFAULT NULL,
  p_metadata JSONB DEFAULT '{}'::JSONB
)
RETURNS JSON AS $$
DECLARE
  v_campaign RECORD;
  v_ad RECORD;
  v_cpm NUMERIC := 5.00;
  v_cost NUMERIC;
  v_recent UUID;
  v_dedup_window INTERVAL := INTERVAL '30 minutes';
  v_spend_result JSON;
  v_event_id UUID;
  v_pacing_fraction NUMERIC;
  v_hour INTEGER;
BEGIN
  v_cost := v_cpm / 1000.0;  -- $0.005 per impression

  -- 1. Verify ad is active
  SELECT a.id, a.campaign_id, a.advertiser_id, a.status
  INTO v_ad
  FROM ads a
  WHERE a.id = p_ad_id AND a.status = 'active';

  IF v_ad IS NULL THEN
    RETURN json_build_object('success', false, 'error', 'Ad not active or not found');
  END IF;

  -- 2. Lock and verify campaign
  SELECT c.id, c.advertiser_id, c.budget_daily, c.budget_total,
         c.spend_today, c.spend_today_date, c.total_spent, c.status
  INTO v_campaign
  FROM campaigns c
  WHERE c.id = p_campaign_id AND c.status = 'active'
  FOR UPDATE;

  IF v_campaign IS NULL THEN
    RETURN json_build_object('success', false, 'error', 'Campaign not active');
  END IF;

  -- 3. Lazy daily reset
  IF v_campaign.spend_today_date < CURRENT_DATE THEN
    v_campaign.spend_today := 0.00;
    UPDATE campaigns
    SET spend_today = 0.00, spend_today_date = CURRENT_DATE
    WHERE id = p_campaign_id;
  END IF;

  -- 4. Daily budget check
  IF COALESCE(v_campaign.spend_today, 0) + v_cost > v_campaign.budget_daily THEN
    RETURN json_build_object('success', false, 'error', 'Daily budget exhausted');
  END IF;

  -- 5. Total budget check
  IF COALESCE(v_campaign.total_spent, 0) + v_cost > v_campaign.budget_total THEN
    UPDATE campaigns SET status = 'completed', updated_at = NOW()
    WHERE id = p_campaign_id;
    RETURN json_build_object('success', false, 'error', 'Total budget exhausted');
  END IF;

  -- 6. Dedup: check recent impression from same user or device
  IF p_user_id IS NOT NULL THEN
    SELECT id INTO v_recent
    FROM ad_events
    WHERE ad_id = p_ad_id
      AND user_id = p_user_id
      AND event_type = 'impression'
      AND created_at > NOW() - v_dedup_window
    LIMIT 1;
  ELSIF p_device_id IS NOT NULL THEN
    SELECT id INTO v_recent
    FROM ad_events
    WHERE ad_id = p_ad_id
      AND event_type = 'impression'
      AND metadata->>'device_id' = p_device_id
      AND created_at > NOW() - v_dedup_window
    LIMIT 1;
  END IF;

  IF v_recent IS NOT NULL THEN
    -- Record for analytics but don't charge
    INSERT INTO ad_events (ad_id, campaign_id, event_type, user_id, metadata)
    VALUES (p_ad_id, p_campaign_id, 'impression', p_user_id,
            p_metadata || jsonb_build_object('deduplicated', true, 'device_id', COALESCE(p_device_id, '')))
    RETURNING id INTO v_event_id;

    RETURN json_build_object(
      'success', true,
      'charged', false,
      'event_id', v_event_id,
      'reason', 'deduplicated'
    );
  END IF;

  -- 7. Deduct spend via existing atomic function
  SELECT record_ad_spend(
    v_campaign.advertiser_id,
    p_campaign_id,
    p_ad_id,
    v_cost,
    'CPM impression charge'
  ) INTO v_spend_result;

  IF NOT (v_spend_result->>'success')::boolean THEN
    RETURN json_build_object(
      'success', false,
      'error', 'Balance deduction failed: ' || COALESCE(v_spend_result->>'error', 'unknown')
    );
  END IF;

  -- 8. Update campaign spend counters
  UPDATE campaigns
  SET spend_today = COALESCE(spend_today, 0) + v_cost,
      total_spent = COALESCE(total_spent, 0) + v_cost,
      updated_at = NOW()
  WHERE id = p_campaign_id;

  -- 9. Record billable impression
  INSERT INTO ad_events (ad_id, campaign_id, event_type, user_id, metadata)
  VALUES (p_ad_id, p_campaign_id, 'impression', p_user_id,
          p_metadata || jsonb_build_object('charged', true, 'cost', v_cost, 'device_id', COALESCE(p_device_id, '')))
  RETURNING id INTO v_event_id;

  RETURN json_build_object(
    'success', true,
    'charged', true,
    'event_id', v_event_id,
    'cost', v_cost
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- BACKFILL total_spent from existing ad_events
-- ============================================
UPDATE campaigns c
SET total_spent = COALESCE((
  SELECT COUNT(*) * 0.005
  FROM ad_events e
  WHERE e.campaign_id = c.id
    AND e.event_type = 'impression'
    AND (e.metadata->>'deduplicated')::boolean IS NOT TRUE
), 0);
