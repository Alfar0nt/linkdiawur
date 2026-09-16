# Testing

How to safely test **Diawur Link** locally before committing.

---

## Prerequisites

- [Bun](https://bun.sh/) installed
- A `.env` file in the project root (see below)

---

## Environment Setup

Create `.env` from the example:

```bash
cp .env.example .env
```

Fill in the values:

```bash
SUPABASE_URL=https://<your-project>.supabase.co
SUPABASE_KEY=<your-supabase-anon-key>
BASE_URL=http://localhost:3000
```

Without this, the build still succeeds but Supabase-dependent pages (redirect, dashboard) won't function.

---

## Recommended Pre-Commit Checks

Run these in order. Each one catches a different class of problem:

### 1. Lint (fastest — style and code quality)

```bash
bun run lint
```

Catches: unused imports, inconsistent quotes/semicolons, dead code, code smells.
Auto-fix most issues with `bun run lint --fix`.

### 2. Typecheck (fast — type safety)

```bash
bun run typecheck
```

Catches: wrong types, missing properties, mismatched function signatures — without running the app.
Requires no environment; runs `vue-tsc --noEmit` on all Nuxt source files.

### 3. Build (slow — full production build)

```bash
bun run build
```

Catches: bundling failures, missing dependencies, module resolution errors.

Note: locally the build uses the default `node-server` preset and outputs to `.output/`. The `vercel` preset is **auto-detected** in Vercel's environment (no hardcoded preset in `nuxt.config.ts`), so don't build with a Vercel output locally just to smoke-test.

### 4. One-liner (all three at once)

```bash
bun run check
```

Runs `typecheck` then `build` sequentially. Good as a final gate before pushing.

## Notes

- No Nitro preset is hardcoded in `nuxt.config.ts`. Local builds default to `node-server` (so `nuxt preview` works); on Vercel the `vercel` preset is auto-detected and the pinned `nodejs22.x` function runtime applies there.
- The `supabase/functions/` Deno edge functions are excluded from both typecheck and lint.

---

## Smoke-Testing the App Locally

After a successful build, start the production preview:

```bash
bun run preview
```

Visit `http://localhost:3000` and test:

| Flow | What to verify |
|---|---|
| Visit `/{short}` (valid code) | Redirects to target URL |
| Visit `/{short}` (invalid code) | Redirects to default (`useExternalRedirect` default URL) |
| Visit `/{short}` (expired code) | Redirects to default URL |
| `/dashboard` (unauthenticated) | Shows "Authenticate with GitHub" button |
| `/dashboard` (after auth) | Shows `ShortlinkList` with create/edit/search |
| `POST /api/new?link=<url>` with `apikey` header | Returns `{ status: 200, newShortlink: "..." }` |
| `POST /api/new?link=<url>` without `apikey` | Returns `{ status: 500 }` with error |

For dev-server testing (hot reload, no build):

```bash
bun run dev
```

---

## What to Check Before Committing

- [ ] `bun run lint` exits 0
- [ ] `bun run typecheck` exits 0 (ignore "Missing supabase" warnings — those are expected without `.env`)
- [ ] `bun run build` succeeds
- [ ] No uncommitted changes in `.vercel/` or `.nuxt/` (both are in `.gitignore`)
- [ ] Manually tested the specific change you made

---

## Notes

- The `supabase/functions/` directory contains Deno edge functions and is **excluded** from both TypeScript checking and ESLint.
- The `robots` config in `nuxt.config.ts` uses the `rules` wrapper — see [Nitro docs](https://nitro.build/raw/deploy/providers/vercel.md) for supported keys.
- The Vercel function runtime is pinned to `nodejs22.x` in `nuxt.config.ts` — never change this unless Vercel adds new runtimes.
