# Ryne Portfolio

Static-first portfolio repo for GitHub Pages with one selectively hosted GCP demo.

This repository is built around harness-engineering constraints:

- the repository is the system of record
- portfolio content lives in machine-readable JSON under `src/content/`
- the main site is static and cheap to host
- live infrastructure is reserved for a single high-signal demo
- validation is explicit and repeatable through `harness.toml`

## Stack

- React + TypeScript + Vite
- TanStack Router (code-based routes for explicit, reviewable diffs)
- Tailwind CSS v4 via the Vite plugin
- Biome for formatting/linting
- Vitest for small, fast unit tests
- GitHub Pages for the static front door

## Quickstart

```bash
corepack enable
corepack pnpm install
corepack pnpm dev
```

If your global `pnpm` version is older than the repo requirement, use `corepack pnpm ...` for local commands so the pinned `packageManager` version is used automatically.

## Validation

```bash
python scripts/harness.py lint
python scripts/harness.py typecheck
python scripts/harness.py test
python scripts/harness.py build
corepack pnpm release:check
```

## High-leverage files to edit first

- `src/content/site.json` — name, bio, about-page copy, visual assets, contact links, availability, hero copy
- `src/content/projects.json` — project cards, project detail content, and optional project-specific visuals
- `src/content/case-studies.json` — deeper engineering writeups folded into related project detail pages
- `src/content/experience.json` — capability tracks, stable track slugs, workflow narrative, and optional project aliases for combined detail pages
- `docs/RUNBOOKS/RELEASE.md` — GitHub Pages + custom domain release path

## Repo map

```text
src/
  components/      reusable UI building blocks
  content/         machine-readable portfolio content
  lib/             selectors, link helpers, and utility transforms
  routes/          explicit TanStack Router route modules
scripts/
  harness.py       validation harness entrypoint
  sync-pages-fallback.mjs
  validate-content.mjs
docs/
  DOMAIN.md
  DESIGN.md
  CONTRACTS.md
  RUNBOOKS/
```

## Deploying to GitHub Pages

- Push to `main`
- Enable GitHub Pages with **GitHub Actions** as the publishing source
- The included deployment workflow builds `dist/` and uploads it as the Pages artifact
- Root-path and project-subpath Pages deploys are both supported
- For nested project repos, the shared Pages base-path resolver infers `/<repo>/` from `GITHUB_REPOSITORY`
- For custom domains on a non-`<user>.github.io` repo, set the repository variable `SITE_BASE_PATH=/`
- To validate a project-subpath build locally, run `SITE_BASE_PATH=/portfolio/ corepack pnpm build`

## Content policy

Portfolio content should stay grounded in real experience, public-safe case studies, and verifiable contact information. When a repository or demo cannot be shared publicly, leave the project link blank instead of inventing one; `corepack pnpm release:check` blocks placeholder-looking links before polished publishing.
