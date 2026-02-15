-- Create a table for waitlist signups if it doesn't exist
create table if not exists waitlist (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  email text unique not null
);

-- Enable RLS
alter table waitlist enable row level security;

-- Drop policy if it exists to allow re-running this script
drop policy if exists "Anyone can join waitlist." on waitlist;

-- Allow public insert (anyone can join waitlist)
create policy "Anyone can join waitlist."
  on waitlist for insert
  with check ( true );

-- Explicitly grant permissions to anon and authenticated roles
grant usage on schema public to anon, authenticated;
grant insert on table waitlist to anon, authenticated;

-- Only admins/service role can view (secure by default, no select policy for public)
