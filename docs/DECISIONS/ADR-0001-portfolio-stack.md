# ADR-0001: Use Vite + React + TanStack Router for the portfolio front door

## Status

Accepted

## Context

The site needs to be static-host friendly, fast to iterate on, and easy for agents to reason about. The repo should stay explicit and reviewable.

## Decision

Use:

- Vite for static builds
- React for component composition
- TanStack Router with code-based route modules
- Tailwind CSS for utility-first styling
- GitHub Pages for static hosting

## Consequences

- The site remains cheap to host.
- Route definitions are explicit and easy to review.
- We avoid generated route trees in the first iteration.
- If route count or complexity grows, file-based TanStack Router can be adopted later.
