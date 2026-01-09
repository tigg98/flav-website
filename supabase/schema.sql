
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
