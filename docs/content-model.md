# Content Model

Defines the data structures backing the site, intended to live as JSON files consumed by Astro content collections (see [architecture.md](architecture.md)). This is the single source of truth for content shape — [content-editing-ux.md](content-editing-ux.md) describes how a non-technical owner would edit these files, and [persistence-and-integrations.md](persistence-and-integrations.md) describes where they physically live.

## File Layout

```
/src/content/
├── restaurant.json       # single object — site-wide info
├── menu.json             # array of menu items
└── gallery.json          # array of gallery photos
```

## Restaurant Info (`restaurant.json`)

Single object, not an array — one restaurant, one record.

| Field | Type | Example | Notes |
|---|---|---|---|
| `name` | string | `"The Copper Fork"` | |
| `tagline` | string | `"Modern American, Locally Sourced"` | |
| `description` | string (long) | — | Used on About page and meta description |
| `phone` | string | `"(513) 555-0142"` | Formatted for display; `tel:` link derived by stripping non-digits |
| `email` | string | `"hello@thecopperfork.example"` | |
| `address.street` | string | `"482 Elm Street"` | |
| `address.city` | string | `"Riverside"` | |
| `address.state` | string | `"OH"` | |
| `address.zip` | string | `"45202"` | |
| `address.mapEmbedUrl` | string (URL) | — | Google Maps embed src, see [persistence-and-integrations.md](persistence-and-integrations.md) |
| `address.directionsUrl` | string (URL) | — | Google Maps search/directions link |
| `hours` | array of `HoursEntry` | see below | Ordered Sun–Sat or Mon–Sun, consistent order used everywhere |
| `social.instagram` | string (URL) | — | Optional; omit key if not used |
| `social.facebook` | string (URL) | — | Optional |
| `reservation.widgetLabel` | string | `"Powered by TableReady"` | Fictional widget brand name, see below |
| `reservation.widgetUrl` | string (URL) | — | Simulated external booking link |

### `HoursEntry` (nested in `hours` array)

| Field | Type | Example |
|---|---|---|
| `day` | string | `"Monday"` |
| `open` | string \| null | `"17:00"` or `null` if closed |
| `close` | string \| null | `"21:00"` or `null` if closed |
| `closed` | boolean | `true` for Monday |

Assumed hours: Closed Monday; Tue–Thu 5:00pm–9:00pm; Fri–Sat 5:00pm–10:00pm; Sun 4:00pm–9:00pm. `[ASSUMPTION]`

## Menu Items (`menu.json`)

Array of item objects.

| Field | Type | Required | Example | Notes |
|---|---|---|---|---|
| `id` | string (slug) | yes | `"seared-scallops"` | Unique, kebab-case |
| `name` | string | yes | `"Seared Scallops"` | |
| `description` | string | yes | `"Pan-seared diver scallops, brown butter corn puree, chili oil"` | 1 sentence, no trailing period style consistent |
| `price` | number | yes | `19` | USD, no currency symbol stored — formatted at render time |
| `category` | string (enum) | yes | `"starters"` | One of: `starters`, `salads`, `mains`, `handhelds`, `sides`, `desserts`, `drinks` |
| `dietaryTags` | array of string (enum) | no | `["gf"]` | Subset of: `v` (vegetarian), `vg` (vegan), `gf` (gluten-free), `df` (dairy-free), `nf` (nut-free), `spicy` |
| `image` | string (path) | no | `"/images/menu/seared-scallops.jpg"` | Optional — falls back to a category placeholder if absent |
| `featured` | boolean | no | `true` | Used to populate Home page "Featured Dishes" |
| `available` | boolean | no (default `true`) | `true` | Allows hiding a seasonal item without deleting its record |

### Category Enum & Display Order

| Value | Display Label |
|---|---|
| `starters` | Starters |
| `salads` | Salads |
| `mains` | Mains |
| `handhelds` | Handhelds |
| `sides` | Sides |
| `desserts` | Desserts |
| `drinks` | Drinks |

### Dietary Tag Legend

| Code | Meaning | Icon/Badge style |
|---|---|---|
| `v` | Vegetarian | Green outline badge, "V" |
| `vg` | Vegan | Green filled badge, "VG" |
| `gf` | Gluten-Free | Amber outline badge, "GF" |
| `df` | Dairy-Free | Blue outline badge, "DF" |
| `nf` | Nut-Free | Gray outline badge, "NF" |
| `spicy` | Spicy | Chili icon, no text badge |

Full visual treatment in [visual-design-bible.md](visual-design-bible.md).

## Gallery Photos (`gallery.json`)

Array of photo objects. Sourcing and specs detailed in [photography-content-brief.md](photography-content-brief.md).

| Field | Type | Required | Example | Notes |
|---|---|---|---|---|
| `id` | string (slug) | yes | `"dining-room-01"` | Unique |
| `src` | string (path) | yes | `"/images/gallery/dining-room-01.jpg"` | |
| `alt` | string | yes | `"Warm-lit dining room with copper pendant lights and reclaimed wood tables"` | Required, not optional — accessibility requirement, see [acceptance-tests.md](acceptance-tests.md) |
| `category` | string (enum) | yes | `"interior"` | One of: `food`, `interior`, `exterior`, `team` |
| `caption` | string | no | `"Our main dining room"` | Optional short caption shown in lightbox |
| `credit` | string | no | `"Photo: Unsplash / Jane Doe"` | Populated per licensing terms, see [photography-content-brief.md](photography-content-brief.md) |
| `featured` | boolean | no | `true` | Used for Home page gallery teaser |

## Restaurant-Wide Constants (not in JSON — code constants)

These are structural/display rules, not editable content, and live in code rather than data files:

- Category display order (menu and gallery) — fixed arrays in a config/constants file.
- Dietary tag badge styles — defined once in the design system, referenced by tag code.

## Open Questions / Assumptions

- `[ASSUMPTION]` Prices are stored as plain numbers (USD, no tax/service charge logic) — this is a display-only demo, not a POS integration.
- `[ASSUMPTION]` No inventory/86'd-item real-time logic — `available: false` is a manual, static toggle set by editing the JSON file.
- `[ASSUMPTION]` `reservation.widgetLabel`/`widgetUrl` model a fictional third-party booking provider ("TableReady") standing in for a real service like OpenTable/Resy — see [persistence-and-integrations.md](persistence-and-integrations.md) for how this renders.
- Open question: Should menu items support multiple sizes/prices (e.g., half/full portion)? Recommended: out of scope for v1 — single price per item keeps the data model simple; flagged if a future revision needs it.
