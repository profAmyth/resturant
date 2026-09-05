# UX Flow

Maps user intents to pages and calls-to-action defined in [information-architecture.md](information-architecture.md). Visual treatment of CTAs and buttons is in [visual-design-bible.md](visual-design-bible.md).

## Primary User Journey

```
Landing (Home)
   │
   ├─→ "What's on the menu?"        → /menu        → back to Home or → /reservations
   │
   ├─→ "What's this place like?"    → /gallery      → → /reservations or /menu
   │
   ├─→ "Where / when are they open?"→ /contact      → → /reservations
   │
   └─→ "I want to book a table."    → /reservations → simulated widget → confirmation state
```

Every secondary page (`/menu`, `/gallery`, `/about`, `/contact`) funnels back toward `/reservations` via a repeated CTA band, since reservations is the single conversion goal of the site (per [project-brief.md](project-brief.md) success criteria).

## Intent → Page → CTA Mapping

| User Intent | Entry Point | Page(s) Visited | Primary CTA |
|---|---|---|---|
| "Is this place any good / what's the vibe?" | Home hero, social link, search | `/`, `/gallery`, `/about` | "View Menu" / "Reserve a Table" |
| "What do they serve, and is there something for me (dietary)?" | Nav "Menu" | `/menu` | Dietary badges answer in-place; CTA band → `/reservations` |
| "Can I trust this place / see photos?" | Nav "Gallery", Home teaser | `/gallery` | CTA band → `/reservations` or `/menu` |
| "When are they open, where are they, how do I call?" | Nav "Contact", footer | `/contact` | "Get Directions", `tel:` link, → `/reservations` |
| "I want to book now." | Nav/header "Reserve a Table" button (always visible) | `/reservations` | Reservation widget interaction |
| "Who runs this place / what's their story?" | Nav "About" | `/about` | Secondary CTA → `/menu` or `/reservations` |

## Detailed Flow: Landing → Reservation (Happy Path)

1. **Landing (`/`)** — User arrives via direct link, search, or social. Hero communicates name, tagline, and food imagery within the first viewport (no scrolling required to identify what kind of restaurant this is).
2. **Browse Menu (`/menu`)** — User taps "View Menu" from hero or nav. Scans by category; dietary badges let users with restrictions self-filter visually without needing a dedicated filter UI in v1.
3. **View Gallery (`/gallery`)** — Optional detour if the user wants visual confirmation of ambiance before committing. Not required to reach reservations — the flow supports skipping straight from Menu to Reservations.
4. **Check Hours/Location (`/contact`)** — User confirms the restaurant is open on their intended day/time and is geographically reachable. Map and hours are on the same page to avoid a second lookup.
5. **Reserve (`/reservations`)** — User taps "Reserve a Table" (available from every page's nav/header). Simulated widget captures date/party size UI (no real backend — see [persistence-and-integrations.md](persistence-and-integrations.md)), or user falls back to the phone number if they prefer to call.

## Alternate / Secondary Flows

- **Direct-to-call path**: User only wants the phone number — accessible from `/contact` and the footer on every page, without requiring a detour through the reservation flow.
- **Menu-first, no reservation**: User is just checking prices/options before deciding whether to go at all (e.g., checking for vegan options) — Menu page must stand alone without requiring reservation intent.
- **About-first (trust-building)**: A more skeptical user starts at `/about` to assess legitimacy/story before browsing the menu — About page must itself link forward to Menu, not dead-end.

## Mobile-Specific Flow Notes

- **Nav**: Collapses to hamburger at `md` breakpoint (per [architecture.md](architecture.md)), but "Reserve a Table" stays outside the hamburger — either a persistent header button or a sticky bottom bar — so the top conversion action never requires two taps to reach.
- **Menu page**: Category sub-nav becomes a horizontally-scrollable tab strip (not a dropdown) so users can jump between categories with a thumb swipe rather than a select menu.
- **Gallery**: Grid drops to a single column on mobile; lightbox supports swipe-left/right between images, not just tap-to-close.
- **Contact page**: Map embed height is capped on mobile to avoid pushing hours/address below the fold; "Get Directions" button is placed above the map, not only below it, so it's reachable without scrolling past the map.
- **Reservation widget**: On mobile, the simulated widget opens as a full-screen modal/sheet rather than a small inline modal, matching real booking-widget UX patterns (OpenTable/Resy mobile behavior).
- **Tap targets**: All primary CTAs and nav items meet a minimum 44x44px tap target, per accessibility checklist in [acceptance-tests.md](acceptance-tests.md).

## Open Questions / Assumptions

- `[ASSUMPTION]` Reservations is the single primary conversion goal; all secondary pages are designed to funnel toward it rather than treating each page as an equally-weighted destination.
- `[ASSUMPTION]` No dietary-filter control (e.g., "show only vegan") is implemented in v1 — badges are sufficient for a menu of this size; revisit if the menu grows significantly.
- Open question: Should the sticky mobile reservation CTA be a full-width bottom bar (higher visibility, costs vertical space) or a floating action button (less intrusive, less visible)? Recommended: full-width bottom bar, consistent with common restaurant site patterns.
