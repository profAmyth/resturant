# Information Architecture

Cross-reference: restaurant identity and content fields defined in [content-model.md](content-model.md). User journeys through this structure are detailed in [ux-flow.md](ux-flow.md).

## Sitemap

```
/
├── /                     Home
├── /menu                 Menu
├── /gallery              Gallery
├── /reservations         Reservations
├── /contact              Contact / Location
└── /about                About
```

Flat, single-level structure — six pages total, no nested routes. This matches the scope of a small restaurant brochure site and keeps every page one click from the nav on desktop and mobile.

## Page List & Purpose

| Page | Route | Purpose |
|---|---|---|
| Home | `/` | First impression, brand hook, quick paths to menu/reservations/hours |
| Menu | `/menu` | Full menu browsable by category, with dietary tags and prices |
| Gallery | `/gallery` | Visual proof of food/ambiance quality, builds appetite appeal |
| Reservations | `/reservations` | Primary conversion action — book a table |
| Contact / Location | `/contact` | Hours, address, map, phone, social links |
| About | `/about` | Brand story, chef/owner note, differentiation |

## Navigation Structure

### Primary Navigation (all pages, sticky header)

Order matches expected user priority (menu and reservations are the two highest-intent actions):

1. Home (logo/wordmark, links to `/`)
2. Menu
3. Gallery
4. About
5. Contact
6. **Reserve a Table** — styled as a distinct button, not a plain nav link (see [visual-design-bible.md](visual-design-bible.md) for button treatment)

### Footer Navigation (all pages)

- Full page list (duplicate of primary nav, for SEO and users who scroll to the bottom)
- Hours (short summary)
- Address (short summary, links to `/contact`)
- Social icons (Instagram, Facebook)
- Legal: Privacy Policy, Terms (placeholder pages or anchors — see Open Questions)
- Small "Portfolio demo" credit line

### Mobile Navigation

- Collapses to a hamburger menu at the `md` breakpoint (see [architecture.md](architecture.md) for breakpoint values).
- "Reserve a Table" button remains visible outside the hamburger — either persistent in the header or as a sticky bottom bar — so the top conversion action is never hidden behind a menu tap. Mobile-specific behavior detailed in [ux-flow.md](ux-flow.md).

## URL Structure

- All lowercase, single-word or hyphenated slugs, no trailing slashes enforced by the framework default.
- No query parameters required for MVP (menu category filtering, if implemented, uses client-side state or in-page anchors — e.g. `/menu#mains` — not query strings).
- No dynamic/parameterized routes (e.g. no `/menu/:item` detail pages) — menu items are not deep-linkable individually in v1.

| URL | Notes |
|---|---|
| `/` | Home |
| `/menu` | Menu, with in-page anchors per category: `/menu#starters`, `/menu#mains`, etc. |
| `/gallery` | Gallery |
| `/reservations` | Reservations |
| `/contact` | Contact / Location |
| `/about` | About |
| `/404` | Custom not-found page (see [build-deploy.md](build-deploy.md)) |

## Page Content Outlines

### Home (`/`)

- Hero section: full-bleed hero photo, restaurant name, tagline, two CTAs ("View Menu", "Reserve a Table")
- "About" teaser: 2–3 sentence brand story excerpt, link to `/about`
- Featured menu highlights: 3–4 signature dishes pulled from menu data
- Gallery teaser: 4–6 image grid, link to `/gallery`
- Hours & location strip: condensed hours + address + "Get Directions" link
- Reservation CTA band (repeated near footer)
- Footer

### Menu (`/menu`)

- Page header with intro line ("Seasonal. Local. Shareable.")
- Category navigation (sticky sub-nav or tabs): Starters, Salads, Mains, Handhelds, Sides, Desserts, Drinks
- Menu items grouped by category, each showing name, description, price, dietary tags
- Dietary tag legend (V, VG, GF, DF, NF — defined in [content-model.md](content-model.md))
- Note on pricing/availability ("Menu and prices subject to change")
- Reservation CTA band
- Footer

### Gallery (`/gallery`)

- Page header ("A Taste of The Copper Fork")
- Filterable or sectioned grid: Food, Interior, Exterior, Team/Events (categories per [content-model.md](content-model.md))
- Lightbox/enlarge behavior on click/tap
- Reservation CTA band
- Footer

### Reservations (`/reservations`)

- Page header with brief instructions
- Simulated reservation widget block (see [persistence-and-integrations.md](persistence-and-integrations.md) for exact mechanism)
- Fallback: phone number for reservations, hours during which phone reservations are taken
- Large-party/private events note with contact link
- Footer

### Contact / Location (`/contact`)

- Address, phone, email
- Full hours table (all 7 days)
- Embedded map (see [persistence-and-integrations.md](persistence-and-integrations.md))
- "Get Directions" link (opens Google/Apple Maps)
- Social links
- Footer

### About (`/about`)

- Brand story (2–4 paragraphs, fictional but concrete: founding concept, sourcing philosophy)
- Chef/owner note with photo
- Values/differentiators (e.g., local sourcing, seasonal menu rotation)
- Secondary CTA to Menu or Reservations
- Footer

## Open Questions / Assumptions

- `[ASSUMPTION]` No individual menu-item detail pages or blog/news section — flat 6-page structure is sufficient for portfolio scope, per [project-brief.md](project-brief.md).
- `[ASSUMPTION]` Menu category anchors (`/menu#mains`) are used instead of true sub-routes to avoid unnecessary routing complexity for a single-page menu.
- Open question: Should Privacy Policy / Terms be real placeholder pages or just non-functional footer links? Recommended: simple single placeholder page or anchor-only links, since this is a demo site with no real data collection beyond a contact form (see [persistence-and-integrations.md](persistence-and-integrations.md)).
- Open question: Should "Reserve a Table" also appear as a floating/sticky mobile CTA independent of nav? Recommended: yes, detailed in [ux-flow.md](ux-flow.md).
