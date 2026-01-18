-- ============================================
-- SUBSCRIPTIONS & ENTITLEMENTS MIGRATION
-- Unified subscription model for Stripe + Apple IAP
-- ============================================

-- Unified subscriptions table (source-agnostic)
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL UNIQUE,
  tier TEXT CHECK (tier IN ('free', 'verified', 'pro')) DEFAULT 'free',
  source TEXT CHECK (source IN ('stripe', 'apple_iap')),
  status TEXT CHECK (status IN ('active', 'canceled', 'past_due', 'trialing', 'expired')) DEFAULT 'active',
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  apple_original_transaction_id TEXT,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Stripe webhook events for idempotency
CREATE TABLE IF NOT EXISTS stripe_events (
  event_id TEXT PRIMARY KEY,
  event_type TEXT NOT NULL,
  processed_at TIMESTAMPTZ DEFAULT NOW(),
  payload JSONB
);

-- Audit logs for subscription changes
CREATE TABLE IF NOT EXISTS subscription_audit_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  action TEXT NOT NULL,
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_customer ON subscriptions(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_sub ON subscriptions(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_subscription_audit_user ON subscription_audit_logs(user_id);

-- Enable Row Level Security
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_audit_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies
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
  
  -- Build features based on tier
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

-- Create default free subscription for existing users
INSERT INTO subscriptions (user_id, tier, status)
SELECT p.id, 'free', 'active'
FROM profiles p
WHERE NOT EXISTS (
  SELECT 1 FROM subscriptions s WHERE s.user_id = p.id
)
ON CONFLICT (user_id) DO NOTHING;

-- Trigger to create subscription record when profile is created
CREATE OR REPLACE FUNCTION create_subscription_record()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO subscriptions (user_id, tier, status)
  VALUES (NEW.id, 'free', 'active')
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_profile_created_subscription ON profiles;
CREATE TRIGGER on_profile_created_subscription
  AFTER INSERT ON profiles
  FOR EACH ROW EXECUTE PROCEDURE create_subscription_record();
