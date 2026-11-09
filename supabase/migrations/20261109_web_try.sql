-- /try on flav.app: run log and result cache for the web recipe tool.
-- Only the service role (the Next.js API route) reads or writes these tables.
-- RLS is on with no policies, so the anon and authenticated roles get nothing.

create table if not exists public.web_try_events (
    id bigint generated always as identity primary key,
    created_at timestamptz not null default now(),
    ip_hash text not null,          -- sha256(ip + TRY_IP_SALT); the raw IP is never stored
    platform text,                  -- tiktok | instagram | web
    status text not null,           -- running | recipe | no_recipe | limited | refunded (failed, try given back)
    ms integer,
    cached boolean not null default false
);

comment on table public.web_try_events is
    'One row per /try run. Daily limits count rows since UTC midnight where cached = false and status not in (''limited'', ''refunded''); a visitor also gets at most 10 attempts a day including refunded ones. Rows older than 30 days can be deleted: delete from public.web_try_events where created_at < now() - interval ''30 days'';';

create index if not exists web_try_events_created_at_idx on public.web_try_events (created_at);

create table if not exists public.web_try_cache (
    url_key text primary key,       -- normalized link, see src/lib/try/validate.ts cacheKeyFor
    result jsonb not null,          -- { status, recipe?, source }
    created_at timestamptz not null default now()
);

comment on table public.web_try_cache is
    '/try results by normalized link. Read for 7 days; older rows are ignored and can be deleted.';

alter table public.web_try_events enable row level security;
alter table public.web_try_cache enable row level security;

-- Rollback:
-- drop table if exists public.web_try_cache;
-- drop table if exists public.web_try_events;
