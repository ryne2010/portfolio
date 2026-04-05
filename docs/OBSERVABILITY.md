# OBSERVABILITY.md

## Static site observability

The main portfolio site is static, so build-time observability matters more than runtime telemetry.

### Required signals

- CI job output for lint, typecheck, test, and build
- GitHub Pages deployment status
- explicit generation of the `404.html` SPA fallback artifact
- content validation failures that name the broken slug or field

## Hosted demo observability

The hosted GCP demo is outside the portfolio runtime boundary, but the portfolio should encourage operational maturity:

- structured logs
- request correlation ids where practical
- a simple health/status surface
- bounded cost through scale-to-zero friendly defaults

## Analytics policy

Analytics are off by default in this repo. Add them only through an explicit ADR.
