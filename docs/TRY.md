# /try

flav.app/try lets someone paste a TikTok, an Instagram Reel or a recipe page link and see the recipe Flav pulls from it, then sends them to the App Store. It is also the page for "tiktok recipe extractor" searches. Approved for launch 2026-11-08.

## How a run works

`POST /api/try` with `{ "url": "..." }`. Code is in `src/lib/try/`, the route in `src/app/api/try/route.ts`.

1. Validate the link: https, 500 characters max. TikTok (tiktok.com, vt., vm.), Instagram (/p/, /reel/, /reels/, /tv/) or any other public https site. Localhost, IP literals and private ranges are refused, and every DNS answer and redirect hop for web pages is checked again, so a public name pointing at a private address is refused too.
2. Cache by normalized link for 7 days (`web_try_cache`). A cached result comes back with `cached: true` and does not count against any limit.
3. Limits, before any fetch: 3 runs per visitor per UTC day, keyed by `sha256(ip + TRY_IP_SALT)`, and `TRY_DAILY_CAP` runs per UTC day site wide (default 200), which is the AI spend cap. A run reserves its slot by writing a `running` row to `web_try_events` and then counting, so parallel requests cannot slip past. If Supabase is unreachable the run is refused rather than spending.
4. Source text:
   - TikTok: the `scrape-tiktok` edge function, caption from `rawCaption`.
   - Instagram: the `scrape-instagram` edge function with the anon key. Its response shape is not verified yet; caption is read from `rawCaption`, `caption`, `description` or `text`, creator from `creator`, `author` or `username`, image from `imageUrl`, `image` or `thumbnail`.
   - Web: the page itself (10 s, 2 MB). If it has a schema.org Recipe in JSON-LD the recipe is built from that with no AI call. Otherwise up to 12,000 characters of visible text go to the model.
5. Model, only when needed: Anthropic Messages API over fetch, `FLAV_TRY_MODEL` (default `claude-haiku-5-5`), 1,500 max tokens, 25 s. It is told to use only what is written and to return `found: false` when there is no recipe. A caption that is only a title and hashtags skips the model and returns `no_recipe` straight away.
6. Every run is logged to `web_try_events` (platform, status, ms, cached, ip hash, created_at). The raw IP is never stored.

Results render in the browser only, so creators' recipes are not indexed. The page itself is indexable with canonical https://flav.app/try. `/try?url=...` runs the import on load, which is how the link pill on home and guides hands off.

## Env vars to add in Vercel

| Name | What it is |
| --- | --- |
| `FLAV_TRY_ANTHROPIC_API_KEY` | A separate Anthropic key just for /try. Set a monthly spend limit on it in the Anthropic console so the web tool can never run up the main bill. |
| `FLAV_TRY_MODEL` | Optional. Defaults to `claude-haiku-5-5`. |
| `TRY_IP_SALT` | Long random string. Without it visitor hashes are unsalted (a warning is logged). |
| `TRY_DAILY_CAP` | Optional. Site wide runs per UTC day. Defaults to 200. |
| `TRY_ENABLED` | Optional. Set to `false` to turn the page off (below). |
| `NEXT_PUBLIC_ASC_PROVIDER_TOKEN` | App Store Connect provider token, so the "web-try" campaign shows up in App Analytics. Without it the plain App Store link is used. |

Already set and reused: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`. Without the service role key (local dev) limits and cache live in memory and reset on restart.

Vercel only picks up env changes on the next deploy, so redeploy after changing any of these.

## Migration

Run `supabase/migrations/20261109_web_try.sql` in the Supabase SQL editor (or `supabase db push`). It creates `web_try_events` and `web_try_cache` with RLS on and no policies, so only the service role can touch them. The rollback is commented at the bottom of the file.

Housekeeping: rows in `web_try_events` older than 30 days can be deleted, and cache rows older than 7 days are ignored and can be deleted too.

## Turning it off

Set `TRY_ENABLED=false` in Vercel and redeploy. The API then answers every request with status `error` and "The web version is off for now. Try it in the app instead.", and the page shows that message with the App Store button in place of the form. Remove the variable (or set it to anything else) and redeploy to turn it back on.

## Checking on it

```sql
-- Today's runs by status
select status, count(*) from web_try_events
where created_at >= date_trunc('day', now() at time zone 'utc')
group by status;
```
