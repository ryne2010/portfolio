# WORKFLOW.md

## Standard loop

1. Clarify whether the change is content, presentation, routing, or deployment.
2. Check the relevant contract file before editing.
3. Implement the smallest coherent slice.
4. Validate with the harness.
5. Summarize the change and any publishing implications.

## Autonomy gradient

- **Low risk:** content edits inside existing schema fields
- **Medium risk:** component and route changes that preserve contracts
- **High risk:** Pages deployment behavior, content schema changes, or anything that adds runtime infrastructure

## Definition of done

A change is done when:

- the intended page or content change is present
- content and route contracts remain valid
- the harness commands are updated if behavior changed
- docs and ADRs are updated where necessary

## Artifacts to update when relevant

- `src/content/*.json`
- `scripts/validate-content.mjs`
- `docs/CONTRACTS.md`
- `docs/RUNBOOKS/*`
- `docs/DECISIONS/*`
