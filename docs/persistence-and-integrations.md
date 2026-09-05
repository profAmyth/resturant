# Persistence & Integrations

## Where Data Lives

No database, no backend server, no headless CMS in v1 — all content is static JSON files committed to the repository, per [architecture.md](architecture.md) and [content-model.md](content-model.md).

| Content | Storage |
|---|---|
| Restaurant info, hours, social links | `src/content/restaurant.json` |
| Menu items | `src/content/menu.json` |
| Gallery photos + metadata | `src/content/gallery.json` |
| Images | `public/images/**` (static files, served as-is, optimized at build time) |

This is a deliberate architectural choice, not a limitation to work around: a portfolio piece benefits from zero moving parts (no server to go down, no database to provision, no API keys to leak), and it keeps [build-deploy.md](build-deploy.md) trivially simple. See [content-editing-ux.md](content-editing-ux.md) for the future-CMS upgrade path if this became a real client project.

## Reservation Flow

Decision: **simulated external widget**, not a real booking system and not a plain form.

### Mechanism

1. `restaurant.json` includes a `reservation.widgetLabel` (e.g. `"Powered by TableReady"`) and `reservation.widgetUrl` — modeling a fictional third-party reservation provider, standing in for a real integration like OpenTable, Resy, or Tock.
2. The `/reservations` page renders a `ReservationWidget` component styled to look like an embedded real booking widget (date picker, party size selector, time slots) — visually convincing, but **submitting it does not create a real reservation**. On submit, it shows a styled confirmation state ("Thanks! In a live deployment, this would be submitted to [Provider]'s booking system.") rather than silently pretending to succeed.
3. A fallback phone number (`restaurant.phone`) and the hours during which phone reservations are accepted are shown alongside the widget, matching how many real restaurant sites hedge between a booking widget and a phone fallback.

### Why Not a Real Form Submission or Real Widget Embed

- A real `<form>` posting somewhere (e.g. Formspree) would collect and store real user data (name, email, phone, date) for a fictional restaurant with no one to act on it — an honesty/data-handling problem for a public demo site, and out of scope per [project-brief.md](project-brief.md).
- A real OpenTable/Resy embed requires a real restaurant account with that provider — not available for a fictional business.
- The simulated-widget pattern still demonstrates the actual engineering skill being showcased (building a polished, realistic-feeling booking UI/UX) without either of the above problems.

### If This Became a Real Client Site

Swap `ReservationWidget` for a real embed (OpenTable/Resy provide an `<iframe>` or JS snippet keyed to the restaurant's real account) or a real form wired to a service like Formspree/Netlify Forms with the client's real notification email. No change to the surrounding page structure would be needed — only the component's internals.

## Map Embedding

Decision: **Google Maps iframe embed** (not a static image + link).

### Mechanism

1. `restaurant.json` stores `address.mapEmbedUrl` — a standard Google Maps embed URL built from the fictional address (`https://www.google.com/maps?q=<address>&output=embed`), which requires no API key for basic embedding.
2. The `/contact` page renders this inside a `MapEmbed` component (a simple `<iframe>` with `loading="lazy"` and a fixed aspect-ratio wrapper to prevent layout shift).
3. `address.directionsUrl` (a `https://www.google.com/maps/dir/?api=1&destination=<address>` link) powers the separate "Get Directions" button, which opens Google Maps directly (app on mobile, web on desktop) rather than relying on the embed itself for navigation.

### Why Not a Static Image

A static map image would need to be manually re-exported any time the address changed and provides no zoom/pan/directions interactivity — the iframe embed costs nothing extra in complexity (no API key, no billing account needed for the basic `/maps?q=` embed form) while being materially more useful and realistic.

### Caveat

`[ASSUMPTION]` Because the address is fictional (482 Elm Street, Riverside, OH 45202), the embed will resolve to whatever Google Maps matches most closely (likely an approximate or non-existent exact match) — acceptable for a portfolio demo, but flagged so it's not mistaken for a real, verified location.

## Form Handling / Backend Needs

There is no real backend requirement in this project:

- No reservation form data is actually transmitted or stored (see Reservation Flow above).
- No newsletter signup, contact form, or other data-collecting form is in scope per [project-brief.md](project-brief.md).
- If a real "Contact Us" message form were added in the future, the recommended approach (given the fully static architecture) would be **Netlify Forms** (zero-backend form handling built into the hosting platform already chosen in [build-deploy.md](build-deploy.md)) rather than standing up a custom API.

## Open Questions / Assumptions

- `[ASSUMPTION]` The reservation widget is explicitly simulated/non-functional by design — flagged clearly in this doc so it isn't mistaken for an incomplete integration when reviewed.
- `[ASSUMPTION]` No API keys, environment variables, or secrets are required anywhere in this project — the Google Maps embed URL format used here does not require one. If a future revision uses the full Maps JavaScript API (e.g. custom map styling), an API key and associated environment variable handling would need to be added — see [build-deploy.md](build-deploy.md) for how that would be managed.
- Open question: Should the simulated reservation confirmation be purely visual (a message), or should it also fire a `mailto:` link as a "in real life, this would notify the restaurant" demonstration? Recommended: visual-only confirmation — a `mailto:` on submit would be misleading UX (looks like it does something backend-real when it doesn't).
