-- Create a table for waitlist signups
create table waitlist (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  email text unique not null
);

-- Enable RLS
alter table waitlist enable row level security;

-- Allow public insert (anyone can join waitlist)
create policy "Anyone can join waitlist."
  on waitlist for insert
  with check ( true );

-- Only admins/service role can view (secure by default, no select policy for public)
