# Photography & Content Brief

Sourcing plan resolved via user decision: **free stock photography** (Unsplash/Pexels). Treatment/grading rules are in [visual-design-bible.md](visual-design-bible.md); data fields for each photo are in [content-model.md](content-model.md).

## Shot List Categories

| Category (`gallery.json` `category`) | Description | Approx. count needed |
|---|---|---|
| `exterior` / hero | Restaurant storefront, entrance, signage-adjacent street scenes (used for Home hero and Contact page ambiance) | 2–3 |
| `food` | Dish close-ups matching menu categories — at minimum one per featured menu item | 8–12 |
| `interior` | Dining room, bar area, table settings, lighting/ambiance shots | 6–8 |
| `team` | Staff/chef in kitchen or dining room (stock photos of people cooking/serving, not claimed as actual staff) | 3–4 |

Total gallery target: **20–25 images**, enough to populate a full `/gallery` grid plus Home/Menu image needs without heavy repetition.

## Image Specs

| Attribute | Spec |
|---|---|
| Source resolution | Minimum 2000px on the longest edge (stock originals are typically far larger — always downscale, never upscale) |
| Delivery format | WebP (with AVIF generated automatically by Astro's image pipeline per [architecture.md](architecture.md)); original JPG/PNG kept only as the source asset, not shipped to production |
| Aspect ratios | Hero: 16:9 (desktop), 4:5 (mobile crop) · Menu thumbnails: 1:1 · Gallery grid: 4:5 (primary), 1:1 (secondary) — per [visual-design-bible.md](visual-design-bible.md) |
| Max shipped file size | Target < 200KB per image after optimization at typical display size (hero images may run larger, target < 350KB) |
| Optimization | Handled automatically by `astro:assets` at build time — responsive `srcset` generated per breakpoint, no manual resizing pipeline needed |

## Captioning / Alt-Text Approach

- **Alt text is required for every image** — `alt` is a non-optional field in the `gallery.json` schema (see [content-model.md](content-model.md)) and the Astro content schema should fail the build if missing.
- Alt text describes the *content and mood* of the image concretely, not generically — e.g. `"Warm-lit dining room with copper pendant lights and reclaimed wood tables"`, not `"restaurant photo"`.
- Menu item images reuse the item's `name`/`description` context but still get their own specific alt text (e.g. `"Seared scallops with brown butter corn puree, plated on dark stoneware"`).
- Captions (`caption` field) are optional and only shown in the gallery lightbox — used for short, human-facing labels ("Our main dining room"), distinct from the more descriptive `alt` text used by screen readers.

## Sourcing Plan

| Source | Use |
|---|---|
| **Unsplash** | Primary source — food, interior, exterior shots. License: free for commercial and non-commercial use, no attribution legally required. |
| **Pexels** | Secondary source, same license terms as Unsplash, used to fill gaps if Unsplash search doesn't yield a consistent warm-toned match for a given category. |

### Selection Criteria

1. Must match the warm color-temperature consistency rule in [visual-design-bible.md](visual-design-bible.md) — reject cool/blue-toned shots even if otherwise strong.
2. Prefer images with negative space or natural crop room, so they can be cropped to the required aspect ratios without losing the subject.
3. Avoid images with visible real restaurant signage, logos, or recognizable real-world branding (to keep the fictional-restaurant framing clean).
4. Avoid images with visible faces used in a way that implies a real identifiable person is "the chef" or "the owner" of a specific named business — acceptable for generic "team at work" context shots only.

## Licensing Note for Portfolio Use

- Both Unsplash License and Pexels License permit free use for commercial and personal projects, including modification (the color-grading treatment applied per [visual-design-bible.md](visual-design-bible.md)), without attribution required.
- Even though attribution isn't legally required, the `credit` field in `gallery.json` should still be populated (photographer + source) as good practice and to keep a clean record of where each asset came from, in case a real future client needs to swap in their own licensed photography.
- Since this is a portfolio/demo site (not attached to a real paying business), stock usage is unambiguously within both licenses' terms either way.

## Open Questions / Assumptions

- `[ASSUMPTION]` No commissioned/original photography — this is a demo project with no real restaurant to photograph, so stock is the only viable option (vs. AI-generated, which was decided against for portfolio credibility).
- `[ASSUMPTION]` Menu item photos are "best visual match" stock photos rather than photos of the exact invented dish — descriptions in [content-model.md](content-model.md) should be written to plausibly match whatever strong stock photo is found, rather than searching for stock to match an already-fixed description.
- Open question: Should gallery images be watermarked or otherwise marked as a portfolio demo to avoid any appearance that they're original photography of a real restaurant? Recommended: no watermark on the images themselves (would hurt visual quality), but keep the footer "portfolio demo" disclaimer from [project-brief.md](project-brief.md).
