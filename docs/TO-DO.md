# TO-DO

Upcoming and planned changes for **Diawur Link**.

Work happens on the `develop` branch and is merged into `main` once tested. Completed items are moved to [docs/CHANGELOGS.md](./CHANGELOGS.md).

## Deployment & Infrastructure

- [ ] Deploy Supabase Edge Functions via Supabase CLI (currently manual via dashboard)
- [ ] Verify `API_KEY_HASH` secret is set in Supabase Edge Function secrets
- [ ] Confirm `SUPABASE_URL`, `SUPABASE_KEY`, `BASE_URL` set in Vercel env vars
- [ ] Add `https://diawur.biz.id/dashboard` to GitHub OAuth redirect URLs in Supabase Auth
- [ ] Add Supabase database migrations to the repo (`supabase/migrations/`) for version-controlled schema
- [ ] Set up RLS policies on the `shortlinks` table and disable new signups in Supabase Auth

## Code Cleanup / Rebranding

- [ ] Customize `pages/blog/[short].vue` — still points to `yumiizumi.com`
- [ ] Customize `pages/gh/[short].vue` — still points to the original author's GitHub
- [ ] Review `pages/index.vue` and remaining branding references
- [ ] Update `LICENSE` attribution if desired

## UI / UX

- [ ] Improve dashboard panel appearance and UI/UX — buttons and controls currently feel clunky
- [ ] Add hover/active states and consistent spacing to dashboard action buttons (copy, edit, QR, delete)
- [ ] Add loading/skeleton states and form validation feedback in dashboard dialogs

## Features

- [ ] Add link click analytics/tracking
- [ ] Add rate limiting on `/api/new` to prevent API key abuse
- [ ] Add custom short code input in the dashboard (choose your own slug)
- [ ] Add link preview cards / OG meta tags for generated shortlinks
- [ ] Add bulk URL import/export (CSV)
- [ ] Add custom 404/error redirect configuration

## Quality & Tooling

- [x] Add `typecheck`, `lint`, and `check` scripts to `package.json`
- [x] Add ESLint config (`.eslintrc.cjs`) and ignore for Deno functions
- [x] Add `docs/TESTING.md` with local test workflow
- [ ] Update dependencies (Nuxt 3.7.4, Nitro 2.6.3, Vite 4 are outdated)
- [ ] Add a test framework (currently none configured)
- [ ] Add CI pipeline (GitHub Actions) — lint, build, and test on PRs into `main`
- [ ] Refresh `caniuse-lite` (`npx update-browserslist-db@latest`)
- [ ] Add `process.env.BASE_URL` fallback handling in `server/api/new.post.ts`

## Documentation

- [ ] Add deployment checklist as a `docs/DEPLOYMENT.md`
- [ ] Document Supabase Edge Function deployment steps and API key flow
- [ ] Document the iOS Shortcuts setup for the new domain