# Architecture

## Tech Stack

| Layer | Choice | Reasoning |
|---|---|---|
| Framework | **Astro** | Ships zero JS by default (islands architecture) — ideal for a content-heavy, mostly-static brochure site where performance is a stated success criterion ([project-brief.md](project-brief.md)). Native content collections give type-safe, schema-validated JSON content out of the box, which maps directly onto [content-model.md](content-model.md). Also currently a strong signal of up-to-date front-end skill for a Fiverr portfolio audience. |
| Styling | **Tailwind CSS** | Fast to implement a consistent design system (spacing, color, type scale) directly from [visual-design-bible.md](visual-design-bible.md) tokens; avoids hand-rolled CSS drift across 6 pages. |
| Interactivity | Vanilla JS / minimal Astro islands | Only the mobile nav toggle, gallery lightbox, and reservation modal need client-side JS. None require a full component framework (React/Vue) — implemented as small `<script>`-driven Astro islands or lightweight web components to keep JS payload minimal. |
| Content | Local JSON via Astro Content Collections | See [content-model.md](content-model.md) — schema-validated at build time with Zod (Astro's built-in content schema validator), so a malformed menu entry fails the build instead of shipping a broken page. |
| Images | Astro's built-in `<Image />` / `astro:assets` | Automatic responsive image generation (resizing, format conversion to WebP/AVIF, lazy loading) without a separate image pipeline. |
| Hosting | Netlify | See [build-deploy.md](build-deploy.md) for full reasoning. |

### Why not plain HTML/CSS/JS

Would require manually duplicating header/footer/nav across 6 pages and hand-writing menu HTML per item, working against the "content-driven" requirement in [content-model.md](content-model.md). Astro removes this friction (layouts, includes, content collections) while still outputting plain static HTML/CSS/JS at build time — so the deployed site has the same runtime simplicity, with none of the authoring-time duplication cost.

### Why not React/Next.js

This site has no client-side state, no routing beyond static pages, and no interactivity dense enough to justify a full component framework and its hydration cost. Choosing React here would mean shipping a JS runtime to render content that never changes after load — directly working against the performance budget in [build-deploy.md](build-deploy.md). Astro can still embed a React component later for a single interactive island if a future revision needs one, without a rewrite.

## Folder / File Structure

```
/
├── docs/                          # this planning documentation
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── images/
│       ├── menu/                  # menu item photos
│       ├── gallery/                # gallery photos
│       └── brand/                  # logo, hero images, og-image
├── src/
│   ├── content/
│   │   ├── config.ts               # Zod schemas for restaurant/menu/gallery
│   │   ├── restaurant.json
│   │   ├── menu.json
│   │   └── gallery.json
│   ├── layouts/
│   │   └── BaseLayout.astro        # <head>, header, footer, nav shell
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── MenuItemCard.astro
│   │   ├── DietaryBadge.astro
│   │   ├── GalleryGrid.astro
│   │   ├── Lightbox.astro
│   │   ├── ReservationWidget.astro
│   │   ├── MapEmbed.astro
│   │   ├── HoursTable.astro
│   │   └── CtaBand.astro
│   ├── pages/
│   │   ├── index.astro             # Home
│   │   ├── menu.astro
│   │   ├── gallery.astro
│   │   ├── reservations.astro
│   │   ├── contact.astro
│   │   ├── about.astro
│   │   └── 404.astro
│   └── styles/
│       └── global.css              # Tailwind entry + design tokens
├── astro.config.mjs
├── tailwind.config.cjs
├── package.json
└── README.md
```

Maps directly onto the page list in [information-architecture.md](information-architecture.md) — one file per page under `src/pages/`, shared chrome in `BaseLayout.astro`.

## Dependencies

| Package | Purpose |
|---|---|
| `astro` | Core framework |
| `@astrojs/tailwind` | Tailwind integration |
| `tailwindcss` | Styling |
| `astro:content` (built-in) | Content collections, no separate package |
| `astro:assets` (built-in) | Image optimization, no separate package |

No backend framework, no database driver, no state management library — deliberately minimal, per [persistence-and-integrations.md](persistence-and-integrations.md).

## How Menu Data Feeds the UI

1. `src/content/menu.json` is validated against a Zod schema in `src/content/config.ts` at build time (fields per [content-model.md](content-model.md)).
2. `pages/menu.astro` imports the collection via `getCollection('menu')`, groups items by `category` in the enum order defined in the content model, and renders one `MenuItemCard` per item.
3. `MenuItemCard` renders name, description, formatted price (`$${price}`), and a `DietaryBadge` per tag in `dietaryTags`.
4. Home page's "Featured Dishes" section filters the same collection by `featured: true` — no separate data source, single source of truth.
5. Editing a price or adding a dish means editing `menu.json` and rebuilding — no template changes required (see [content-editing-ux.md](content-editing-ux.md)).

## Responsive Breakpoints Strategy

Mobile-first: base styles target mobile, then progressively enhanced with Tailwind's default breakpoints.

| Breakpoint | Width | Primary changes |
|---|---|---|
| Base (mobile) | < 640px | Single-column layout, hamburger nav, stacked menu cards, sticky bottom reservation CTA |
| `sm` | ≥ 640px | Minor spacing/type scale increases |
| `md` | ≥ 768px | Nav switches from hamburger to full horizontal nav; gallery grid goes 2-column |
| `lg` | ≥ 1024px | Menu grid goes 2-column; gallery grid goes 3-column; hero uses larger crop |
| `xl` | ≥ 1280px | Max content width constrained (e.g. `max-w-7xl`), extra breathing room, no further layout changes |

Full visual/spacing rationale in [visual-design-bible.md](visual-design-bible.md); mobile interaction behavior in [ux-flow.md](ux-flow.md).

## Third-Party Integrations

| Integration | Mechanism | Detail doc |
|---|---|---|
| Map | Google Maps iframe embed (no API key required for basic embed) | [persistence-and-integrations.md](persistence-and-integrations.md) |
| Reservations | Simulated external widget (styled modal/button, fictional provider) | [persistence-and-integrations.md](persistence-and-integrations.md) |
| Fonts | Google Fonts, self-hosted via `@fontsource` to avoid render-blocking external requests | [visual-design-bible.md](visual-design-bible.md) |
| Analytics | None in v1 | See Open Questions |

## Open Questions / Assumptions

- `[ASSUMPTION]` No analytics (e.g. Plausible/GA) included in v1 — not needed for a portfolio demo and avoids unnecessary third-party scripts affecting the performance budget.
- `[ASSUMPTION]` Fonts are self-hosted (via `@fontsource` packages) rather than loaded from `fonts.googleapis.com` at runtime, to avoid an extra render-blocking origin and keep the Lighthouse score high.
- `[ASSUMPTION]` Client-side JS is limited to small vanilla-JS islands (nav toggle, lightbox, reservation modal) rather than a component framework — revisit only if a future page needs materially more interactivity.
- Open question: Is a search-engine-indexable `sitemap.xml` / `robots.txt` needed? Recommended: yes, trivial with `@astrojs/sitemap`, include for completeness since this is meant to look production-ready.
