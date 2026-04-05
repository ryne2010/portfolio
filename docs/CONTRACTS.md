# CONTRACTS.md

## Public interfaces

### Route paths

The portfolio exposes these top-level routes:

- `/`
- `/about`
- `/portfolio`
- `/portfolio/$entrySlug`
- `/contact`

## Functional invariants

- Project slugs are unique.
- Case-study slugs are unique.
- Experience-track slugs are unique.
- Slugs used for `/portfolio/$entrySlug` are unique across projects, case studies, and experience tracks.
- Case-study slugs redirect to their related project detail URL.
- Experience-track slugs with `relatedProjectSlug` redirect to their related project detail URL.
- Every featured project exists.
- Every case study references an existing project.
- The main site does not make runtime network requests to render core portfolio content.
- Placeholder external links remain visibly identifiable through the UI.

## Compatibility policy

- Adding new optional content fields is backwards compatible if validation is updated.
- Renaming or removing route paths is a breaking public change and requires an ADR.
- Renaming a project slug is a breaking content change and should be treated like a URL migration.

## Data contracts

### `site.json`

Required concepts:

- identity and headline
- summary paragraphs
- about-page narrative
- visual assets and captions
- focus areas
- contact links
- CTA labels and hrefs

### `projects.json`

Required concepts:

- stable slug
- title, kind, summary, and stage
- tags and stack arrays
- architecture summary
- outcomes

Optional supported fields:

- `referenceUrl` for external source material such as press coverage or public context links
- `visual` for project-specific imagery shown on the portfolio detail page

### `case-studies.json`

Required concepts:

- stable slug
- `relatedProjectSlug`
- title and summary
- array of titled sections

### `experience.json`

Required concepts:

- stable track slug
- capability tracks
- delivery loop steps
- signals of fit / ideal role framing

Optional supported fields:

- `relatedProjectSlug` for experience tracks that should be rendered inside a related project detail page

## Testing contract

Minimum expectations for changes:

- add or update a unit test for non-trivial content or route helper logic
- run the JSON content validator when changing content structure
- preserve GitHub Pages build behavior when changing deployment scripts

## Observability contract

- Build failures should be diagnosable from CI logs.
- Pages fallback generation should be explicit in the build output.
- The static site should never require production secrets to render.
