# Repo-Specific Custom Instructions

This repository is optimized for agent-first execution. Keep the following in mind when working here:

## Primary intent

Ship a clean, static portfolio that communicates engineering quality and links out to exactly one hosted GCP demo.

## Working rules

- Prefer explicit route modules over generated routing artifacts for now.
- Keep content edits inside `src/content/*.json` unless the change truly affects rendering logic.
- Treat placeholder values as first-class signals: surface them clearly instead of hiding them.
- Preserve the GitHub Pages constraints documented in `docs/RUNBOOKS/RELEASE.md`.
- When adding new content fields, update `docs/CONTRACTS.md` and `scripts/validate-content.mjs`.

## Quality bar

- Small diffs
- Clear contracts
- Static-host friendly output
- Strong defaults with obvious customization points
- Validation that can run without manual guesswork
