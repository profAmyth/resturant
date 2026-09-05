# Acceptance Tests / QA Checklist

Covers all pages defined in [information-architecture.md](information-architecture.md). Performance targets reference the budget in [build-deploy.md](build-deploy.md). Run this checklist against the production build (`npm run build && npm run preview`), not just local dev.

## Page Rendering

| # | Check | Pass Criteria |
|---|---|---|
| 1 | Home (`/`) renders | Hero, featured dishes, gallery teaser, hours strip, CTA band, footer all present |
| 2 | Menu (`/menu`) renders | All categories present in correct order (per [content-model.md](content-model.md)), every item shows name/description/price |
| 3 | Gallery (`/gallery`) renders | All images load, grid displays without layout shift |
| 4 | Reservations (`/reservations`) renders | Widget UI present, phone fallback visible |
| 5 | Contact (`/contact`) renders | Address, phone, email, hours table, map embed all present |
| 6 | About (`/about`) renders | Brand story and chef/owner note render with photo |
| 7 | 404 page | Non-existent route (e.g. `/does-not-exist`) shows a styled 404, not a raw error or blank page |

## Navigation

| # | Check | Pass Criteria |
|---|---|---|
| 8 | Desktop nav | All 6 page links + "Reserve a Table" button visible and functional in header |
| 9 | Mobile nav | Hamburger opens/closes; all links functional; "Reserve a Table" reachable without opening hamburger (per [ux-flow.md](ux-flow.md)) |
| 10 | Footer nav | All page links, hours summary, address, social icons, legal links functional |
| 11 | Active state | Current page is visually indicated in nav (desktop and mobile) |
| 12 | Logo/wordmark | Clicking restaurant name in header returns to `/` from every page |

## Menu Data

| # | Check | Pass Criteria |
|---|---|---|
| 13 | All categories present | Starters, Salads, Mains, Handhelds, Sides, Desserts, Drinks all render with ≥1 item each |
| 14 | Dietary badges | Every item with `dietaryTags` shows the correct badge(s), matching the legend in [content-model.md](content-model.md) |
| 15 | Pricing format | All prices render as `$XX` consistently, no raw numbers or missing `$` |
| 16 | `available: false` items | Hidden from the rendered menu without breaking layout/grouping |
| 17 | Featured items | Home page "Featured Dishes" shows exactly the items flagged `featured: true` in `menu.json` |

## Gallery

| # | Check | Pass Criteria |
|---|---|---|
| 18 | Image loading | All gallery images load without broken-image icons |
| 19 | Responsive grid | 1 column mobile → 2 tablet → 3 desktop, per [architecture.md](architecture.md) breakpoints |
| 20 | Lightbox | Clicking/tapping an image opens an enlarged view; closes via X, backdrop click, and Escape key |
| 21 | Mobile swipe | Lightbox supports swipe left/right between images on touch devices |
| 22 | Lazy loading | Below-the-fold gallery images use `loading="lazy"` (verify via DevTools Network panel) |

## Reservations

| # | Check | Pass Criteria |
|---|---|---|
| 23 | Widget opens | Reservation widget/modal opens correctly from every entry point (nav button, page CTA, mobile sticky bar) |
| 24 | Widget interaction | Date/party-size/time controls are operable via mouse, touch, and keyboard |
| 25 | Confirmation state | Submitting shows the simulated confirmation message (per [persistence-and-integrations.md](persistence-and-integrations.md)) — not a silent no-op, not a real submission |
| 26 | Phone fallback | Phone number is a working `tel:` link on mobile |

## Map & Location

| # | Check | Pass Criteria |
|---|---|---|
| 27 | Map loads | Embed renders without error, shows a location matching the configured address |
| 28 | Get Directions | Link opens Google Maps (app on mobile, new tab on desktop) with the correct destination |
| 29 | No layout shift | Map embed has a reserved aspect-ratio container — no CLS when it loads |

## Accessibility

| # | Check | Pass Criteria |
|---|---|---|
| 30 | Alt text | Every `<img>` has non-empty, descriptive alt text (per [content-model.md](content-model.md) / [photography-content-brief.md](photography-content-brief.md)) |
| 31 | Color contrast | All text/background pairs meet WCAG AA (4.5:1 body, 3:1 large text) — verify with a contrast checker against [visual-design-bible.md](visual-design-bible.md) palette |
| 32 | Keyboard navigation | Every interactive element (nav, buttons, lightbox, reservation widget, form controls) is reachable and operable via Tab/Enter/Escape alone |
| 33 | Focus indicators | Visible focus ring on all focusable elements, no `outline: none` without a replacement |
| 34 | Semantic HTML | Proper heading hierarchy (single H1 per page, no skipped levels), `<nav>`, `<main>`, `<footer>` landmarks present |
| 35 | Screen reader smoke test | Run VoiceOver/NVDA over Home and Menu pages at minimum; nav and menu items announce sensibly |

## Cross-Browser Check

| # | Browser | Pass Criteria |
|---|---|---|
| 36 | Chrome (desktop + Android) | All pages render and function correctly |
| 37 | Safari (desktop + iOS) | All pages render and function correctly; test `tel:`/map links specifically on iOS |
| 38 | Firefox (desktop) | All pages render and function correctly |
| 39 | Edge (desktop) | All pages render and function correctly |

## Performance (Lighthouse)

| # | Check | Pass Criteria (per [build-deploy.md](build-deploy.md)) |
|---|---|---|
| 40 | Performance score | ≥ 90 (mobile), run on production build |
| 41 | Accessibility score | ≥ 95 |
| 42 | Best Practices score | ≥ 95 |
| 43 | SEO score | ≥ 95 |
| 44 | LCP | < 2.5s simulated 4G |
| 45 | Page weight | < 1.5MB per page including images |

## Broken-Link Check

| # | Check | Pass Criteria |
|---|---|---|
| 46 | Internal links | Run a link checker (e.g. `npx linkinator dist --recurse`) against the production build — zero broken internal links |
| 47 | External links | Map/directions link, social links open successfully (manual spot-check, since external targets aren't part of the build) |
| 48 | Anchor links | `/menu#category` anchors scroll to the correct section on every category |

## Open Questions / Assumptions

- `[ASSUMPTION]` Manual QA pass (this checklist run by hand before each deploy) is sufficient at this project's scale — no automated E2E test suite (e.g. Playwright) is included in v1, per the minimal-tooling philosophy in [architecture.md](architecture.md).
- `[ASSUMPTION]` Screen reader testing (#35) is a smoke test on two key pages, not full coverage of all six pages — proportionate to a portfolio project rather than a production client site with a formal accessibility audit requirement.
- Open question: Should this checklist be converted into an automated Playwright smoke-test suite in a future iteration to demonstrate testing skill as well? Recommended: worth adding as a v2 enhancement if the portfolio piece needs to also showcase QA/testing competency, but not required for the initial build.
