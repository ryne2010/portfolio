# DOMAIN.md

## What are we building?

A public portfolio site for job applications.

### Problem

Ryne needs a single, low-cost public front door that explains who he is, what kinds of systems he builds, and where hiring teams should look next.

### Users

- recruiters screening quickly
- hiring managers evaluating systems thinking
- senior engineers reviewing project depth
- Ryne himself when updating content or swapping the hosted demo

### Non-goals

- multi-tenant app behavior
- dynamic CMS workflows
- runtime personalization
- a backend contact form
- hosting every project live

## Domain invariants

- The main portfolio site is static and deployable on GitHub Pages.
- Public-facing content lives in machine-readable files under `src/content/`.
- Placeholder content must remain obviously placeholder until replaced.
- The site may advertise one hosted GCP demo, but the portfolio itself must not depend on that service to load.
- Every project slug and case-study slug is unique and stable.

## Core workflows

1. Edit JSON content files to update bio, links, portfolio projects, case studies, and experience tracks.
2. Run the harness to validate content contracts and application code.
3. Push to `main` to build and deploy the static site to GitHub Pages.
4. Replace the single live demo URL when the selected GCP demo changes.

## Vocabulary

- **Portfolio front door:** the static GitHub Pages site.
- **Hosted demo:** the one externally deployed GCP service linked from the site.
- **Content contract:** the schema-like expectations enforced across the JSON content files.
- **Template content:** starter copy that exists to show structure and must be replaced before publishing.

## Data model overview

- `site.json` defines hero copy, contact links, focus areas, and calls-to-action.
- `projects.json` defines project cards and project-backed portfolio detail pages.
- `case-studies.json` defines deeper architecture narratives that are folded into their related project detail pages.
- `experience.json` defines capability tracks and workflow-oriented experience framing, including stable detail-page slugs and optional project aliases for combined detail pages.

## Edge cases and failure modes

- direct navigation to nested routes on GitHub Pages can fail without SPA fallback handling
- placeholder links can leak into production if not surfaced clearly
- a custom domain on a nested repo can break asset paths if `SITE_BASE_PATH` is wrong
- overloading the portfolio with live infrastructure increases cost and fragility
