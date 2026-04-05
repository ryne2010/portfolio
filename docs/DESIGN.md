# DESIGN.md

## Architecture overview

This repository uses a static SPA architecture:

- Vite builds the app into static assets.
- TanStack Router handles client-side navigation.
- Tailwind provides utility-first styling.
- GitHub Pages serves the static build.
- One external GCP demo can be linked from project content.

## Layering model

```text
content JSON
    ↓
selectors / helpers (`src/lib`)
    ↓
route modules (`src/routes`)
    ↓
reusable components (`src/components`)
    ↓
app shell / router / Vite build
```

### Allowed dependencies

- `src/content/*` → no app logic imports
- `src/lib/*` → may import content and types only
- `src/components/*` → may import `src/lib/*` and shared types, but not raw JSON files
- `src/routes/*` → may import components, lib helpers, and content selectors
- `scripts/*` → may inspect content files and build artifacts, but must stay runtime-independent from the app bundle

## Boundaries and ownership

### `src/content/`

Purpose: machine-readable public content.

Must not depend on presentation logic.

### `src/lib/`

Purpose: selection, link normalization, and placeholder detection.

Must not import route modules.

### `src/components/`

Purpose: reusable presentational building blocks.

Must not encode project-specific domain rules that belong in `src/lib/`.

### `src/routes/`

Purpose: explicit page composition and route behavior.

Must not duplicate content-contract logic.

### `scripts/`

Purpose: deployment and content validation utilities.

Must stay simple, deterministic, and runnable in CI.

## Error handling policy

- The router root defines a friendly not-found surface.
- Missing or placeholder content should degrade visibly, not silently.
- External links must be rendered as unavailable when they still contain placeholders.

## Performance notes

- Prefer local content over remote fetches.
- Keep the main site bundle small and static-host friendly.
- Treat the hosted GCP demo as optional, not critical path.

## Change policy

When changing route structure, content schema, Pages deployment behavior, or demo-hosting assumptions:

1. Update the relevant ADR.
2. Update `docs/CONTRACTS.md`.
3. Update `scripts/validate-content.mjs`.
4. Add or update tests.
