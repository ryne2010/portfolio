# ADR-0002: Keep the main site static and expose one live GCP demo

## Status

Accepted

## Context

Always-on portfolio infrastructure increases cost and operational burden. The main goal of the portfolio is to communicate credibility, not to keep every project live forever.

## Decision

The main portfolio site stays static. One carefully chosen containerized demo may be hosted separately on GCP and linked from the portfolio.

## Consequences

- The portfolio front door stays cheap and reliable.
- Live cloud skill is still demonstrated.
- Most projects can be represented through case studies, screenshots, and repo links.
