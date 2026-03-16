-- Add referral system columns to waitlist table
ALTER TABLE waitlist
  ADD COLUMN IF NOT EXISTS referral_code text UNIQUE,
  ADD COLUMN IF NOT EXISTS referred_by text REFERENCES waitlist(referral_code),
  ADD COLUMN IF NOT EXISTS referral_count integer DEFAULT 0 NOT NULL,
  ADD COLUMN IF NOT EXISTS position serial,
  ADD COLUMN IF NOT EXISTS tier text DEFAULT 'standard' CHECK (tier IN ('standard', 'early_access', 'creator_badge', 'premium', 'lifetime'));

-- Generate referral codes for existing rows that don't have one
UPDATE waitlist
SET referral_code = substr(md5(random()::text || id::text), 1, 8)
WHERE referral_code IS NULL;

-- Make referral_code NOT NULL after backfill
ALTER TABLE waitlist ALTER COLUMN referral_code SET NOT NULL;

-- Create index for referral lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_referral_code ON waitlist(referral_code);
CREATE INDEX IF NOT EXISTS idx_waitlist_referred_by ON waitlist(referred_by);
CREATE INDEX IF NOT EXISTS idx_waitlist_position ON waitlist(position);

-- Function to auto-update referral tier based on count
CREATE OR REPLACE FUNCTION update_referral_tier()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.referral_count >= 50 THEN
    NEW.tier := 'lifetime';
  ELSIF NEW.referral_count >= 25 THEN
    NEW.tier := 'premium';
  ELSIF NEW.referral_count >= 10 THEN
    NEW.tier := 'creator_badge';
  ELSIF NEW.referral_count >= 3 THEN
    NEW.tier := 'early_access';
  ELSE
    NEW.tier := 'standard';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update tier when referral_count changes
DROP TRIGGER IF EXISTS trg_update_referral_tier ON waitlist;
CREATE TRIGGER trg_update_referral_tier
  BEFORE UPDATE OF referral_count ON waitlist
  FOR EACH ROW
  EXECUTE FUNCTION update_referral_tier();

-- Allow anon to select their own row by referral_code (for dashboard)
DROP POLICY IF EXISTS "Anyone can view their waitlist entry by referral code" ON waitlist;
CREATE POLICY "Anyone can view their waitlist entry by referral code"
  ON waitlist FOR SELECT
  USING ( true );

-- Grant select to anon for the referral dashboard
GRANT SELECT ON TABLE waitlist TO anon, authenticated;
