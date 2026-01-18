-- ============================================
-- COMPLETE FIX: Add unique constraint and remaining objects
-- ============================================

-- Add unique constraint on user_id (required for upserts)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'subscriptions_user_id_key'
  ) THEN
    ALTER TABLE subscriptions ADD CONSTRAINT subscriptions_user_id_key UNIQUE (user_id);
  END IF;
END $$;

-- Create stripe_events table if not exists
CREATE TABLE IF NOT EXISTS stripe_events (
  event_id TEXT PRIMARY KEY,
  event_type TEXT NOT NULL,
  processed_at TIMESTAMPTZ DEFAULT NOW(),
  payload JSONB
);

-- Create audit logs table if not exists
CREATE TABLE IF NOT EXISTS subscription_audit_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  action TEXT NOT NULL,
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_subscription_audit_user ON subscription_audit_logs(user_id);

-- Enable RLS
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_audit_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies (drop and recreate to be safe)
DROP POLICY IF EXISTS "Users can view own subscription" ON subscriptions;
CREATE POLICY "Users can view own subscription" 
  ON subscriptions FOR SELECT 
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view own audit logs" ON subscription_audit_logs;
CREATE POLICY "Users can view own audit logs" 
  ON subscription_audit_logs FOR SELECT 
  USING (auth.uid() = user_id);

-- Function to get user entitlements
CREATE OR REPLACE FUNCTION get_user_entitlements(p_user_id UUID)
RETURNS JSON AS $$
DECLARE
  v_subscription RECORD;
  v_features JSON;
BEGIN
  SELECT * INTO v_subscription 
  FROM subscriptions 
  WHERE user_id = p_user_id;
  
  IF v_subscription IS NULL THEN
    RETURN json_build_object(
      'tier', 'free',
      'source', NULL,
      'status', NULL,
      'current_period_end', NULL,
      'cancel_at_period_end', FALSE,
      'features', json_build_object(
        'can_monetize', FALSE,
        'payout_rate', 0,
        'verified_badge', FALSE,
        'pro_badge', FALSE,
        'advanced_analytics', FALSE,
        'priority_support', FALSE
      )
    );
  END IF;
  
  v_features := CASE v_subscription.tier
    WHEN 'pro' THEN json_build_object(
      'can_monetize', TRUE,
      'payout_rate', 0.97,
      'verified_badge', TRUE,
      'pro_badge', TRUE,
      'advanced_analytics', TRUE,
      'priority_support', TRUE
    )
    WHEN 'verified' THEN json_build_object(
      'can_monetize', TRUE,
      'payout_rate', 0.90,
      'verified_badge', TRUE,
      'pro_badge', FALSE,
      'advanced_analytics', TRUE,
      'priority_support', FALSE
    )
    ELSE json_build_object(
      'can_monetize', FALSE,
      'payout_rate', 0,
      'verified_badge', FALSE,
      'pro_badge', FALSE,
      'advanced_analytics', FALSE,
      'priority_support', FALSE
    )
  END;
  
  RETURN json_build_object(
    'tier', v_subscription.tier,
    'source', v_subscription.source,
    'status', v_subscription.status,
    'current_period_end', v_subscription.current_period_end,
    'cancel_at_period_end', v_subscription.cancel_at_period_end,
    'features', v_features
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger function
CREATE OR REPLACE FUNCTION create_subscription_record()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO subscriptions (user_id, tier, status)
  VALUES (NEW.id, 'free', 'active')
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger
DROP TRIGGER IF EXISTS on_profile_created_subscription ON profiles;
CREATE TRIGGER on_profile_created_subscription
  AFTER INSERT ON profiles
  FOR EACH ROW EXECUTE PROCEDURE create_subscription_record();
