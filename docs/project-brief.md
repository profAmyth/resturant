# Project Brief

## What This Is

A static, front-end-only restaurant/menu website built as a **portfolio showcase piece** for a freelance web development Fiverr gig. The site is built for a fictional restaurant, **The Copper Fork**, invented specifically for this project. No real business, chef, or location is represented.

This is not a client deliverable for an actual restaurant — it is a demonstration artifact designed to be shown in a Fiverr gig gallery, portfolio site, or sent directly to prospective clients as a "here's what I can build for you" example.

## The Fictional Restaurant

| Field | Value |
|---|---|
| Name | The Copper Fork |
| Tagline | Modern American, Locally Sourced |
| Cuisine | Modern American bistro (seasonal, shareable plates, craft cocktails) |
| Price point | $$–$$$ (moderate to upscale) |
| Location (fictional) | 482 Elm Street, Riverside, OH 45202 |
| Status | `[ASSUMPTION]` Entirely fictional — name, address, and phone number are invented for demo purposes and must be clearly non-conflicting with any real business. |

Full data fields for this identity live in [content-model.md](content-model.md).

## Goal of the Piece

Demonstrate, to a prospective Fiverr client (typically a small restaurant/hospitality business owner), that the developer can deliver:

1. A visually polished, modern restaurant website that feels premium, not templated.
2. Clean information architecture that makes menu, hours, location, and reservations trivially easy to find.
3. Mobile-first responsive design (most restaurant site traffic is mobile).
4. Fast load times and good Lighthouse/accessibility scores — signals of technical competence, not just visual design.
5. A content structure a non-technical owner could plausibly update themselves (see [content-editing-ux.md](content-editing-ux.md)).

The site should read as "this could be sold to a real restaurant tomorrow with a find-and-replace of the brand details."

## Scope Boundaries

### In Scope

- Static marketing/brochure site: Home, Menu, Gallery, Reservations, Contact/Location, About.
- Fully responsive layout (mobile, tablet, desktop).
- Menu data driven from a structured content file (JSON/content collection), not hardcoded per-page HTML.
- Photo gallery using licensed free stock photography.
- A simulated reservation flow (styled widget pattern, no real bookings taken).
- Embedded map pointing at the fictional address.
- Basic accessibility (alt text, semantic HTML, keyboard navigation, contrast).
- Deployment to a live, shareable URL (see [build-deploy.md](build-deploy.md)).

### Out of Scope

- Real payment processing, online ordering, or checkout.
- Real reservation bookings (no backend, no live availability, no real restaurant to book).
- User accounts, login, or any personalized experience.
- A CMS admin UI (a future-recommendation only — see [content-editing-ux.md](content-editing-ux.md)).
- Multi-language / i18n support.
- Blog or news section.
- Real business registration, legal pages beyond placeholder privacy/terms links.

## Target Audience / Client Persona

**Primary persona: "Maria, the independent restaurant owner"**

- Owns or manages a single independent restaurant or small 2–3 location group.
- Not technical; may currently have an outdated site, a Wix/Squarespace site, or only a Facebook/Instagram presence.
- Wants a site that looks credible next to competitors, works well on phones (where most of her customers browse), and makes it obvious how to find hours, see the menu, and book a table.
- Budget-conscious — hiring on Fiverr rather than an agency — but still wants something that looks like it wasn't cheap.
- Will judge quality primarily by: does it look good on my phone, can I find the menu in one tap, does it feel "real."

**Secondary persona: "Dev/agency reviewing the portfolio"**

- Another freelancer, agency, or Fiverr client browsing a gig gallery.
- Evaluates code quality, structure, and whether the site is a genuine build vs. a barely-modified template.
- This audience is why [architecture.md](architecture.md), [build-deploy.md](build-deploy.md), and [acceptance-tests.md](acceptance-tests.md) matter — the underlying engineering has to hold up to scrutiny, not just the visuals.

## Success Criteria

| Criteria | Target |
|---|---|
| Visual quality | Looks like a premium, custom-designed site, not a generic template |
| Mobile experience | Fully usable one-handed on a phone; nav, menu, and reservation CTA all reachable without pinch-zoom |
| Performance | Lighthouse Performance score ≥ 90 on mobile (see [build-deploy.md](build-deploy.md) for full budget) |
| Accessibility | Lighthouse Accessibility score ≥ 95; passes checklist in [acceptance-tests.md](acceptance-tests.md) |
| Content architecture | Menu/gallery/hours are all driven from structured data files, not hand-coded HTML per item |
| Portfolio credibility | Site could be re-skinned (new name, colors, menu) for a real client in under a day |
| Deployability | Live on a public URL with HTTPS, deployable from a clean clone in under 10 minutes (see [build-deploy.md](build-deploy.md)) |

## Open Questions / Assumptions

- `[ASSUMPTION]` Restaurant identity (name, cuisine, address) confirmed via user selection: Modern American bistro concept, name "The Copper Fork." Address, phone, and email are invented placeholders and must not resolve to a real business.
- `[ASSUMPTION]` The site will present as a single-location restaurant, not a multi-location chain.
- `[ASSUMPTION]` No real client has been engaged; this is a self-initiated portfolio piece, so there is no external stakeholder sign-off step in the workflow.
- Open question: Should the final site include a subtle "Portfolio Demo" footer disclaimer (fictional business, built by [developer] for demonstration) to avoid any confusion if it's ever indexed publicly? Recommended: yes — flagged for confirmation before launch copy is finalized.
