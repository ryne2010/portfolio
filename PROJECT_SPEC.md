# Portfolio Repo Spec

## Goal

Build a static-first portfolio repository that functions as the main public front door for job applications while keeping hosting cost close to zero. The site should advertise Ryne's engineering profile, communicate systems thinking, and link out to a single hosted GCP demo when that demo is ready.

## Scope for this iteration

- React + Vite + TanStack Router app suitable for GitHub Pages
- Typed, machine-readable portfolio content stored in `src/content/*.json`
- One reusable site shell with routes for home, about, experience, projects, case studies, and contact
- A content-validation script that protects slug uniqueness and cross-file references
- CI plus GitHub Pages deployment workflow
- Runbooks and ADRs aligned with harness-engineering constraints

## Explicit non-goals

- No backend for the main portfolio site
- No always-on database
- No CMS
- No contact form backend
- No fabrication of employment history or project claims

## Acceptance criteria

1. The site builds to static assets and can be deployed with GitHub Pages.
2. Direct navigation to nested routes works on GitHub Pages via SPA fallback handling.
3. Portfolio content is legible, easy to replace, and stored in a small number of machine-readable files.
4. The repository explains its own architecture, release path, and content contracts.
5. The portfolio makes room for exactly one live GCP demo without forcing every project to be deployed.
