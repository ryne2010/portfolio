# AGENTS.md

## Start here

1. Read `PROJECT_SPEC.md` and `harness.toml`.
2. Read `docs/DOMAIN.md`, `docs/DESIGN.md`, and `docs/CONTRACTS.md` in that order.
3. Treat `src/content/*.json` as the durable source of truth for public-facing site content.
4. Prefer small, explicit route and component changes over framework magic.
5. Validate with the harness before finalizing any change.

## Non-negotiables

- Keep the main site static-first and Pages-compatible.
- Do not add a backend to the portfolio repo.
- Do not fabricate experience, employers, metrics, or customer names.
- Preserve machine-readable content files and their contracts.
- Keep the single hosted demo link isolated from the main site runtime.

## Boundaries

- `src/content/*` may describe the site, but should not contain presentation logic.
- `src/lib/*` may transform content, but should not import UI modules.
- `src/components/*` may render reusable UI, but should not reach into raw JSON directly.
- `src/routes/*` compose page-level views and route behavior.
- `scripts/*` enforce repo and deployment invariants.

## Escalate to a human when

- the requested change would add non-static runtime behavior to the portfolio site
- public-facing claims look fabricated or unverifiable
- a new route or content field changes the content contract
- GitHub Pages deployment constraints conflict with the desired UX

## Expected final summary

Use `agents/checklists/CHANGE_SUMMARY.md` as the structure:

- what changed
- why it changed
- how it was validated
- risks / rollout notes
- follow-ups
