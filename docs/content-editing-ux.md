# Content Editing UX

Describes how a non-technical restaurant owner would update content after launch, given the static-site architecture in [architecture.md](architecture.md) and data shape in [content-model.md](content-model.md).

## Current State (v1, Static)

There is no admin UI in v1. Content lives in three JSON files under `src/content/` (`restaurant.json`, `menu.json`, `gallery.json`). Updating the live site requires:

1. Editing the relevant JSON file.
2. Committing the change (if using Git-based hosting) or re-uploading the file.
3. Triggering a rebuild/redeploy (automatic on Netlify if connected to a Git repo — see [build-deploy.md](build-deploy.md)).

This is not an owner-friendly workflow on its own — it assumes comfort with JSON syntax and either Git or a hosting dashboard. The sections below describe how to make this tolerable for a non-technical owner in the interim, and what the realistic long-term recommendation is.

## "Easy Update" Path for a Non-Technical Owner (v1 workaround)

Since a full CMS is out of scope for the portfolio build ([project-brief.md](project-brief.md)), the pragmatic middle ground is:

1. **A single, clearly-commented JSON file per content type**, not embedded across multiple templates — this is already true by construction of the content model, and is the main thing that makes future editing tractable at all.
2. **Netlify's built-in Git-based deploy preview**: if the owner has even minimal comfort with GitHub's web UI, they can edit `menu.json` directly in the GitHub file editor (a text box in the browser, no local dev environment needed) and commit — Netlify auto-builds and deploys on commit. This avoids requiring a local Node/Astro setup for simple content edits.
3. **A documented "how to add a menu item" recipe** (below) so the owner — or more realistically, the developer doing a quick paid update — can make common edits without re-reading the whole schema.

### Recipe: Add a Menu Item

1. Open `src/content/menu.json`.
2. Copy an existing item object as a template.
3. Change `id` to a new unique slug, update `name`, `description`, `price`, `category` (must be one of the fixed category values — see [content-model.md](content-model.md)), and `dietaryTags` if applicable.
4. Add the item's image to `public/images/menu/` and reference it in the `image` field, or omit `image` to use the category placeholder.
5. Save, commit, wait for the automatic Netlify rebuild (~1–2 minutes).

### Recipe: Update Hours

1. Open `src/content/restaurant.json`.
2. Edit the relevant entry in the `hours` array (`open`/`close` in 24-hour `"HH:MM"` format, or `closed: true`).
3. Save and commit — hours update everywhere they're displayed (Home, Contact, Footer) since they're all pulled from this one field.

### Recipe: Update/Add Gallery Photos

1. Add the new image file to `public/images/gallery/`.
2. Add a corresponding object to `src/content/gallery.json` with a unique `id`, the `src` path, required `alt` text, and a `category`.
3. Save and commit.

## Why Not a Full CMS in v1

A headless CMS (see recommendation below) adds hosting/service cost, an extra account for the owner to manage, and integration work that isn't justified for a portfolio piece meant to demonstrate front-end build quality first. The JSON-file approach keeps [architecture.md](architecture.md) simple and dependency-free while still being a realistic, honest starting point that a real client could grow out of.

## Future Recommendation (Post-Launch, Real-Client Path)

If this were handed off to an actual paying restaurant client who needs to self-serve content updates without touching code or Git, the recommended upgrade path is:

| Option | Fit |
|---|---|
| **Decap CMS** (formerly Netlify CMS) | Git-based headless CMS with a simple browser admin UI (`/admin`) that edits the same underlying JSON/Markdown files — closest upgrade to the current architecture, no database, still deploys via Netlify. Best first recommendation. |
| **Sanity / Contentful** (headless CMS) | Better editor UX (proper media library, structured fields, drafts/preview), but requires migrating content out of local JSON into a hosted CMS and wiring Astro to fetch from its API at build time. Worth it if the client needs multiple non-technical editors or more frequent updates. |
| **Full admin dashboard (custom)** | Only justified if the client needs workflows beyond simple content editing (e.g., real reservation management) — overkill for a menu/hours/photos use case alone. |

Recommended default if asked: **Decap CMS**, because it requires no architecture change — it edits the exact same JSON files already defined in [content-model.md](content-model.md), just through a form-based UI instead of raw JSON, and deploys through the same Netlify pipeline in [build-deploy.md](build-deploy.md).

## Open Questions / Assumptions

- `[ASSUMPTION]` No CMS is implemented in this project — this document is a plan/recommendation, not a build task, per [project-brief.md](project-brief.md) scope boundaries.
- `[ASSUMPTION]` The owner persona (from [project-brief.md](project-brief.md)) is assumed to be comfortable enough to follow a written recipe with GitHub's web editor, or more realistically pays the original developer for periodic content updates in v1.
- Open question: If the client explicitly wants zero ongoing dependency on the developer, is Decap CMS worth adding even in the initial build (rather than as a documented future step)? Recommended: keep out of v1 — adding it now would dilute the "pure front-end build quality" portfolio signal that's the actual goal of this piece.
