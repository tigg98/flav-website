-- Add UTM tracking columns to waitlist table
ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS utm_source text;
ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS utm_medium text;
ALTER TABLE waitlist ADD COLUMN IF NOT EXISTS utm_campaign text;

-- Index for attribution queries
CREATE INDEX IF NOT EXISTS idx_waitlist_utm_source ON waitlist(utm_source) WHERE utm_source IS NOT NULL;
