# Build & Deploy

## Build Tooling

| Tool | Purpose |
|---|---|
| Node.js (LTS, 20.x+) | Runtime for Astro's build process |
| npm | Package management (Astro's default; no strong reason to swap to pnpm/yarn for a project this size) |
| Astro CLI (`astro dev` / `astro build`) | Local dev server + static production build, per [architecture.md](architecture.md) |
| Tailwind CSS | Compiled at build time via `@astrojs/tailwind` integration, no separate build step |

## Local Dev Setup

```bash
git clone <repo-url>
cd copper-fork-site
npm install
npm run dev        # starts local dev server, default http://localhost:4321
```

```bash
npm run build       # outputs static site to /dist
npm run preview      # serves the /dist build locally to sanity-check the production output
```

No environment variables or `.env` file are required for local dev — there are no API keys in this project (see [persistence-and-integrations.md](persistence-and-integrations.md)).

## Hosting Target

**Netlify**, chosen for:

- Zero-config static hosting for Astro (auto-detected build command/output directory).
- Free tier is sufficient for a portfolio demo (no real traffic volume expected).
- Git-integrated continuous deploy — every push to `main` triggers an automatic rebuild, which is also what makes the [content-editing-ux.md](content-editing-ux.md) "edit JSON in GitHub, auto-deploys" workflow possible without extra tooling.
- Built-in Netlify Forms and redirect/headers config (`_redirects`, `netlify.toml`) are available for free if a future revision needs them, without adding a new provider.

`[ASSUMPTION]` Vercel or GitHub Pages would also work equally well for a static Astro site; Netlify is chosen primarily for its zero-friction Git-based deploy workflow and Forms feature being immediately available if ever needed, per [persistence-and-integrations.md](persistence-and-integrations.md).

## Deployment Steps

1. Push repository to GitHub (or GitLab/Bitbucket).
2. In Netlify: "Add new site" → "Import an existing project" → connect the Git repo.
3. Build settings (auto-detected by Netlify's Astro preset, confirm manually):
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy — Netlify assigns a default `*.netlify.app` subdomain immediately.
5. (Optional) Attach a custom domain — see below.
6. Every subsequent `git push` to `main` triggers an automatic rebuild and redeploy.

## Environment / Config Needs

None required. No API keys, no secrets, no environment-specific config files — a direct consequence of the fully static, zero-backend architecture in [persistence-and-integrations.md](persistence-and-integrations.md).

## Domain & SSL

- Default deploy is available immediately at a free `*.netlify.app` subdomain — sufficient for portfolio/Fiverr-gig linking purposes.
- `[ASSUMPTION]` No custom domain is purchased for this portfolio piece (e.g. no real `thecopperfork.com` registration) — the fictional restaurant doesn't need a real domain, and a `.netlify.app` URL is a normal, expected thing to link from a Fiverr gig description.
- If a custom domain were added later (e.g. for demonstrating the workflow to a client): Netlify provides automatic, free SSL via Let's Encrypt on any custom domain attached through its dashboard — no manual certificate management needed.

## Performance Budget

| Metric | Target | Notes |
|---|---|---|
| Lighthouse Performance (mobile) | ≥ 90 | Primary success criterion from [project-brief.md](project-brief.md) |
| Lighthouse Accessibility | ≥ 95 | Cross-checked against [acceptance-tests.md](acceptance-tests.md) |
| Lighthouse Best Practices | ≥ 95 | |
| Lighthouse SEO | ≥ 95 | Requires meta descriptions, semantic headings, sitemap |
| Largest Contentful Paint (LCP) | < 2.5s on simulated 4G | Hero image must be preloaded/prioritized, not lazy-loaded |
| Total page weight (per page) | < 1.5MB including images | Enforced primarily via image optimization in [architecture.md](architecture.md) / [photography-content-brief.md](photography-content-brief.md) |
| JS shipped | < 30KB (uncompressed) per page | Astro's zero-JS-by-default model plus a few small vanilla islands (nav, lightbox, reservation modal) |
| Image format | WebP/AVIF via `astro:assets`, responsive `srcset` | No unoptimized JPG/PNG shipped to production |

## Open Questions / Assumptions

- `[ASSUMPTION]` No CI pipeline (e.g. GitHub Actions) beyond Netlify's own build-on-push — not needed at this project's scale; Netlify's deploy previews on pull requests are sufficient for reviewing changes before merging to `main`.
- `[ASSUMPTION]` No staging environment separate from Netlify's automatic deploy-preview-per-PR feature — that already serves the staging/preview need for a project this size.
- Open question: Should a Lighthouse CI check be added as a required PR check to prevent performance regressions over time? Recommended: nice-to-have, not required for v1 — manual Lighthouse runs before each deploy are sufficient at this scale, per [acceptance-tests.md](acceptance-tests.md).
