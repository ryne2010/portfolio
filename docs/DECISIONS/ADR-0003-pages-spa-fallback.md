# ADR-0003: Copy `index.html` to `404.html` for GitHub Pages SPA routing

## Status

Accepted

## Context

GitHub Pages serves static assets and does not provide server-side rewrite rules for SPA route refreshes.

## Decision

After every production build, copy the generated `dist/index.html` to `dist/404.html`.

## Consequences

- Direct navigation to nested client-side routes works on GitHub Pages.
- The fallback remains deterministic and easy to audit.
- This behavior must be preserved whenever the build output changes.
