-- ============================================
-- BILLING SYSTEM MIGRATION
-- Run this in your Supabase SQL Editor
-- ============================================

-- Advertiser account balances
create table if not exists advertiser_balances (
  id uuid references profiles(id) primary key,
  balance numeric(12, 2) default 0.00 not null,
  currency text default 'USD' not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  constraint positive_balance check (balance >= 0)
);

alter table advertiser_balances enable row level security;

-- Drop existing policies if they exist (safe for re-runs)
drop policy if exists "Users can view their own balance." on advertiser_balances;
drop policy if exists "Users can insert their own balance record." on advertiser_balances;
drop policy if exists "Balance updates via function only." on advertiser_balances;

create policy "Users can view their own balance."
  on advertiser_balances for select
  using ( auth.uid() = id );

create policy "Users can insert their own balance record."
  on advertiser_balances for insert
  with check ( auth.uid() = id );

create policy "Balance updates via function only."
  on advertiser_balances for update
  using ( auth.uid() = id );

-- Billing transactions for audit trail
create table if not exists billing_transactions (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  advertiser_id uuid references profiles(id) not null,
  amount numeric(12, 2) not null,
  type text check (type in ('deposit', 'spend', 'refund', 'adjustment')) not null,
  description text not null,
  balance_before numeric(12, 2) not null,
  balance_after numeric(12, 2) not null,
  reference_id text,
  metadata jsonb default '{}'::jsonb
);

alter table billing_transactions enable row level security;

drop policy if exists "Users can view their own transactions." on billing_transactions;

create policy "Users can view their own transactions."
  on billing_transactions for select
  using ( auth.uid() = advertiser_id );

-- Indexes for efficient querying
create index if not exists idx_billing_transactions_advertiser on billing_transactions(advertiser_id);
create index if not exists idx_billing_transactions_created on billing_transactions(created_at);
create index if not exists idx_billing_transactions_type on billing_transactions(type);

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

-- Create balance records for existing users who don't have one
insert into advertiser_balances (id, balance)
select p.id, 0.00
from profiles p
where not exists (
  select 1 from advertiser_balances ab where ab.id = p.id
);

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

drop trigger if exists on_profile_created on profiles;

create trigger on_profile_created
  after insert on profiles
  for each row execute procedure create_balance_record();
