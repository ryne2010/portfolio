# ADR-0004: Consolidate experience, projects, and case studies into a single portfolio route

## Status

Accepted

## Context

The public site had separate top-level routes for experience, projects, and case studies. That split made the navigation feel more like a template than a single curated portfolio, and it forced related material to live on separate pages even when it described the same body of work.

The site still needs to remain static-first, explicit, and easy to validate in CI.

## Decision

Use:

- `/portfolio` as the single index route for portfolio material
- `/portfolio/$entrySlug` as the shared detail route for experience tracks and project pages
- stable experience-track slugs in `src/content/experience.json`
- optional `relatedProjectSlug` aliases on experience tracks when the experience framing should be folded into a project page
- case-study narratives rendered inside their related project detail pages
- case-study slugs treated as compatibility aliases that redirect to their related project detail URL
- cross-collection slug validation so project, case-study, and experience detail URLs cannot collide
- legacy redirects from `/experience`, `/projects`, `/projects/$projectSlug`, and `/case-studies`

## Consequences

- The primary navigation is simpler and reads more like a curated portfolio.
- Related material can be grouped under one route family without adding dynamic behavior or duplicating project detail pages.
- Experience tracks now participate in the same URL contract as projects, and selected tracks can act as compatibility aliases to project pages when their content is merged.
- Validation must protect uniqueness across multiple content files, not just within each file.
