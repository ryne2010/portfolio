# Contributing

This repo is designed for agent-friendly, constraint-first execution.

## Principles

- Keep the main site static and cheap.
- Put domain knowledge in versioned files, not chat history.
- Separate content, selection logic, and rendering.
- Prefer explicit tradeoffs over implicit framework behavior.

## Local setup

```bash
corepack enable
pnpm install
```

Optional Python tooling for the harness and pre-commit hooks:

```bash
python -m pip install -r requirements-dev.txt
```

## Standard development loop

```bash
python scripts/harness.py lint
python scripts/harness.py typecheck
python scripts/harness.py test
python scripts/harness.py build
```

## When changing contracts

Update these together:

- `src/content/*.json`
- `scripts/validate-content.mjs`
- `docs/CONTRACTS.md`
- relevant tests under `src/lib/*.test.ts`

## Pull requests

A good PR in this repo should explain:

- intent
- constraints
- validation evidence
- publishing or rollout implications
- any follow-up content replacement still required
