# Visual Design Bible

Brand direction for The Copper Fork (concept per [project-brief.md](project-brief.md)). This is the style guide a designer or developer could implement from directly. Photography treatment cross-references [photography-content-brief.md](photography-content-brief.md).

## Brand Concept

Warm, modern, unfussy. The name evokes copper cookware and handcrafted tools — the palette and materials should feel like a well-loved kitchen: warm metals, natural wood, dark charcoal, and cream linen. Avoid: cold corporate blues, neon accents, overly rustic/farmhouse cliches (no mason jars, no chalkboard fonts).

## Color Palette

| Role | Name | Hex | Usage |
|---|---|---|---|
| Primary / Brand | Copper | `#B8622C` | Buttons, links, active states, accent borders |
| Primary Dark | Burnt Copper | `#8C4A1F` | Button hover/active states |
| Base Dark | Charcoal | `#2A2622` | Body text, header/footer background |
| Base Light | Cream | `#F7F2EA` | Page background |
| Surface | Warm White | `#FFFFFF` | Cards, elevated surfaces |
| Accent | Sage | `#6B7A5E` | Secondary accents, dietary badge (vegan/vegetarian), dividers |
| Alert/Highlight | Amber | `#D9A441` | Gluten-free badge, subtle highlight moments only |
| Neutral Gray | Stone | `#8A8378` | Muted text, captions, disabled states |

Contrast requirement: all text/background pairs must meet WCAG AA (4.5:1 body text, 3:1 large text) — verified per [acceptance-tests.md](acceptance-tests.md). Copper (`#B8622C`) on Cream (`#F7F2EA`) passes for large text/UI elements; body copy uses Charcoal on Cream, not Copper on Cream.

## Typography

| Role | Typeface | Fallback stack | Usage |
|---|---|---|---|
| Display / Headings | **Fraunces** (serif, variable) | `Georgia, 'Times New Roman', serif` | H1–H3, restaurant name, hero headline |
| Body / UI | **Inter** | `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` | Body copy, nav, buttons, menu descriptions |

### Type Scale (mobile → desktop)

| Token | Mobile | Desktop | Usage |
|---|---|---|---|
| `text-xs` | 12px | 12px | Captions, credits |
| `text-sm` | 14px | 14px | Meta text, badges |
| `text-base` | 16px | 16px | Body copy |
| `text-lg` | 18px | 20px | Menu item descriptions, subheadings |
| `text-xl` | 22px | 26px | Card titles, H3 |
| `text-2xl` | 28px | 36px | H2, section headers |
| `text-4xl` | 36px | 56px | H1, hero headline |

Line height: 1.5 for body copy, 1.15–1.25 for headings. Letter-spacing: slight positive tracking (0.02em) on all-caps labels (nav items, category tabs, badges).

## Spacing / Grid System

- Base unit: 4px (Tailwind default scale — `4, 8, 12, 16, 24, 32, 48, 64, 96`).
- Content max-width: `1280px` (`max-w-7xl`), centered, with `24px` gutter on mobile, `32px` on tablet, `48px+` on desktop.
- Section vertical rhythm: `64px` top/bottom padding on mobile, `96–128px` on desktop, so sections feel deliberately spaced rather than cramped.
- Grid: CSS Grid for menu cards (1 col mobile → 2 col tablet/desktop) and gallery (1 col mobile → 2 col tablet → 3 col desktop), per breakpoints in [architecture.md](architecture.md).

## Imagery Style & Treatment

Full shot list and sourcing in [photography-content-brief.md](photography-content-brief.md); this section defines the *treatment* applied once images are selected.

| Attribute | Spec |
|---|---|
| Mood | Warm, natural light, slightly moody shadows — not flat/bright commercial food photography |
| Color grading | Subtle warm color grade (slightly boosted oranges/ambers, deepened shadows) applied consistently across all photos for a cohesive look, even when sourced from different stock photographers |
| Crop ratios | Hero images: 16:9 (desktop) / 4:5 (mobile crop); Menu item thumbnails: 1:1 square; Gallery grid: 4:5 portrait preferred, mixed with occasional 1:1 |
| Treatment | Subtle vignette on hero images only; no heavy filters, no black-and-white, no illustration overlays |
| Consistency rule | Every image used must share the same warm color-temperature range — reject stock photos that are cool/blue-toned even if otherwise high quality |

## Buttons

| Variant | Style | Usage |
|---|---|---|
| Primary | Solid Copper fill, Cream text, `8px` border-radius, `16px/24px` padding | "Reserve a Table," primary CTAs |
| Primary (hover) | Burnt Copper fill | |
| Secondary | Charcoal outline, Charcoal text, transparent fill | "View Menu" when paired with a primary button, "Get Directions" |
| Secondary (hover) | Charcoal fill, Cream text | |
| Text link | Copper text, underline on hover only | In-paragraph links, footer nav |

All buttons: minimum 44px tap height on mobile, visible focus ring (2px Copper outline offset 2px) for keyboard navigation — required per [acceptance-tests.md](acceptance-tests.md).

## Cards

| Element | Style |
|---|---|
| Menu item card | White surface on Cream background, `12px` radius, subtle `1px` Stone border (no heavy shadow), `24px` internal padding |
| Gallery card | Image fills card, `8px` radius, hover state: slight scale (1.03) + soft shadow, caption overlay fades in on hover (desktop) / always visible below image (mobile) |
| Info card (hours/location) | Charcoal background, Cream text, used sparingly for high-contrast emphasis blocks (e.g. hours summary on Home) |

## Iconography

- Style: line icons, 1.5px stroke weight, rounded caps — consistent with the soft/warm brand feel (avoid sharp geometric or filled icon sets).
- Recommended source: **Lucide** icon set (open-source, consistent stroke style, easy to theme via `currentColor`).
- Usage: nav (hamburger, close), social (Instagram, Facebook), contact (phone, email, pin/location), dietary spicy indicator (chili icon), gallery (expand/lightbox icon).
- Icon color: inherits Charcoal by default, Copper on hover/active for interactive icons.

## Open Questions / Assumptions

- `[ASSUMPTION]` No custom logo/wordmark design — the header uses styled text ("The Copper Fork" in Fraunces) rather than a designed logo mark, since logo design is outside a web-dev-focused portfolio piece. A simple monogram icon (e.g., a fork/copper-toned circle) may be added if time allows but is not required for MVP.
- `[ASSUMPTION]` Dark mode is out of scope — restaurant brochure sites are conventionally single-theme, and it's not a stated success criterion in [project-brief.md](project-brief.md).
- Open question: Should the color-grading treatment on stock photos be applied via CSS filter (cheap, consistent, non-destructive) or pre-processed in an image editor before upload? Recommended: CSS filter (e.g. a shared `filter: saturate(1.05) sepia(0.06)` utility class) — easier to keep consistent across many images and zero extra tooling.
