
-- Create a table for public profiles using the auth.users table
create table profiles (
  id uuid references auth.users not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  company_name text,
  website text,

  constraint username_length check (char_length(username) >= 3)
);

-- Set up Row Level Security!
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Create a table for campaigns
create table campaigns (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  advertiser_id uuid references profiles(id) not null,
  name text not null,
  status text check (status in ('draft', 'active', 'paused', 'completed')) default 'draft',
  budget_total numeric,
  budget_daily numeric,
  start_date date,
  end_date date
);

alter table campaigns enable row level security;

create policy "Advertisers can view their own campaigns."
  on campaigns for select
  using ( auth.uid() = advertiser_id );

create policy "Advertisers can insert their own campaigns."
  on campaigns for insert
  with check ( auth.uid() = advertiser_id );

create policy "Advertisers can update their own campaigns."
  on campaigns for update
  using ( auth.uid() = advertiser_id );

create policy "Advertisers can delete their own campaigns."
  on campaigns for delete
  using ( auth.uid() = advertiser_id );

-- Create a table for ads
create table ads (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  campaign_id uuid references campaigns(id) on delete cascade not null,
  advertiser_id uuid references profiles(id) not null,
  title text not null,
  description text,
  media_url text, -- image or video url
  target_url text,
  status text check (status in ('draft', 'pending_review', 'active', 'rejected', 'paused')) default 'draft',
  format text check (format in ('feed_image', 'feed_video', 'story')) default 'feed_image'
);

alter table ads enable row level security;

create policy "Advertisers can view their own ads."
  on ads for select
  using ( auth.uid() = advertiser_id );

create policy "Advertisers can insert their own ads."
  on ads for insert
  with check ( auth.uid() = advertiser_id );

create policy "Advertisers can update their own ads."
  on ads for update
  using ( auth.uid() = advertiser_id );

-- Trigger to handle profile creation on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url, username)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url', new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create a table for ad events (impressions, clicks, saves)
create table ad_events (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  ad_id uuid references ads(id) on delete cascade not null,
  campaign_id uuid references campaigns(id) on delete cascade not null,
  event_type text check (event_type in ('impression', 'click', 'save')) not null,
  user_id uuid, -- nullable, for anonymous tracking
  metadata jsonb default '{}'::jsonb
);

-- Indexes for efficient querying
create index idx_ad_events_campaign on ad_events(campaign_id);
create index idx_ad_events_ad on ad_events(ad_id);
create index idx_ad_events_created on ad_events(created_at);
create index idx_ad_events_type on ad_events(event_type);

-- Enable RLS
alter table ad_events enable row level security;

-- Advertisers can view events for their own campaigns
create policy "Advertisers can view their own ad events."
  on ad_events for select
  using (
    campaign_id in (
      select id from campaigns where advertiser_id = auth.uid()
    )
  );

-- Anyone can insert events (for tracking from the app)
create policy "Events can be inserted by anyone."
  on ad_events for insert
  with check ( true );

-- ============================================
-- BILLING SYSTEM
-- ============================================

-- Advertiser account balances
create table advertiser_balances (
  id uuid references profiles(id) primary key,
  balance numeric(12, 2) default 0.00 not null,
  currency text default 'USD' not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  constraint positive_balance check (balance >= 0)
);

alter table advertiser_balances enable row level security;

create policy "Users can view their own balance."
  on advertiser_balances for select
  using ( auth.uid() = id );

create policy "Users can insert their own balance record."
  on advertiser_balances for insert
  with check ( auth.uid() = id );

-- Only update via the add_funds function (RPC), not direct updates
create policy "Balance updates via function only."
  on advertiser_balances for update
  using ( auth.uid() = id );

-- Billing transactions for audit trail
create table billing_transactions (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  advertiser_id uuid references profiles(id) not null,
  amount numeric(12, 2) not null,
  type text check (type in ('deposit', 'spend', 'refund', 'adjustment')) not null,
  description text not null,
  balance_before numeric(12, 2) not null,
  balance_after numeric(12, 2) not null,
  reference_id text, -- Stripe payment ID, campaign ID, etc.
  metadata jsonb default '{}'::jsonb
);

alter table billing_transactions enable row level security;

create policy "Users can view their own transactions."
  on billing_transactions for select
  using ( auth.uid() = advertiser_id );

-- Index for efficient querying
create index idx_billing_transactions_advertiser on billing_transactions(advertiser_id);
create index idx_billing_transactions_created on billing_transactions(created_at);
create index idx_billing_transactions_type on billing_transactions(type);

-- Function to add funds atomically (prevents race conditions)
create or replace function add_funds(
  p_user_id uuid,
  p_amount numeric,
  p_description text,
  p_reference_id text default null
)
returns json as $$
declare
  v_current_balance numeric;
  v_new_balance numeric;
  v_transaction_id uuid;
begin
  -- Validate amount
  if p_amount <= 0 then
    return json_build_object('success', false, 'error', 'Amount must be positive');
  end if;

  -- Lock the balance row for update (prevents race conditions)
  select balance into v_current_balance
  from advertiser_balances
  where id = p_user_id
  for update;

  -- Create balance record if doesn't exist
  if v_current_balance is null then
    insert into advertiser_balances (id, balance)
    values (p_user_id, 0.00);
    v_current_balance := 0.00;
  end if;

  v_new_balance := v_current_balance + p_amount;

  -- Update balance
  update advertiser_balances
  set balance = v_new_balance, updated_at = now()
  where id = p_user_id;

  -- Log transaction
  insert into billing_transactions (
    advertiser_id, amount, type, description,
    balance_before, balance_after, reference_id
  ) values (
    p_user_id, p_amount, 'deposit', p_description,
    v_current_balance, v_new_balance, p_reference_id
  )
  returning id into v_transaction_id;

  return json_build_object(
    'success', true,
    'transaction_id', v_transaction_id,
    'balance_before', v_current_balance,
    'balance_after', v_new_balance
  );
end;
$$ language plpgsql security definer;

-- Function to deduct spend (for campaign costs)
create or replace function deduct_spend(
  p_user_id uuid,
  p_amount numeric,
  p_description text,
  p_campaign_id uuid default null
)
returns json as $$
declare
  v_current_balance numeric;
  v_new_balance numeric;
  v_transaction_id uuid;
begin
  -- Validate amount
  if p_amount <= 0 then
    return json_build_object('success', false, 'error', 'Amount must be positive');
  end if;

  -- Lock the balance row for update
  select balance into v_current_balance
  from advertiser_balances
  where id = p_user_id
  for update;

  if v_current_balance is null then
    return json_build_object('success', false, 'error', 'No balance record found');
  end if;

  -- Check sufficient balance
  if v_current_balance < p_amount then
    return json_build_object('success', false, 'error', 'Insufficient balance');
  end if;

  v_new_balance := v_current_balance - p_amount;

  -- Update balance
  update advertiser_balances
  set balance = v_new_balance, updated_at = now()
  where id = p_user_id;

  -- Log transaction
  insert into billing_transactions (
    advertiser_id, amount, type, description,
    balance_before, balance_after, reference_id
  ) values (
    p_user_id, -p_amount, 'spend', p_description,
    v_current_balance, v_new_balance, p_campaign_id::text
  )
  returning id into v_transaction_id;

  return json_build_object(
    'success', true,
    'transaction_id', v_transaction_id,
    'balance_before', v_current_balance,
    'balance_after', v_new_balance
  );
end;
$$ language plpgsql security definer;

-- Trigger to create balance record when profile is created
create or replace function create_balance_record()
returns trigger as $$
begin
  insert into advertiser_balances (id, balance)
  values (new.id, 0.00)
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_profile_created
  after insert on profiles
  for each row execute procedure create_balance_record();
