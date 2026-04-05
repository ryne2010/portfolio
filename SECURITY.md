# Security

## Secrets

- Do not commit API keys, credentials, or private service URLs.
- The main portfolio site must not require runtime secrets.
- Hosted demo credentials, if any, must live in GCP secret management or GitHub Actions secrets, not this repo.

## Public claims

This is a public portfolio. Accuracy is part of the security model.

- Do not invent employers, customers, performance metrics, or launch dates.
- Clearly label placeholder content until it is replaced.
- Prefer screenshots, architectural notes, and sample data over sensitive production details.

## Dependency hygiene

- Update dependencies deliberately.
- Regenerate lockfiles in a controlled environment.
- Keep Pages deploy logic simple and reviewable.

## Reporting

If you suspect a security issue with the deployment workflow or demo-link handling, stop and review the relevant ADR and runbook before shipping changes.
