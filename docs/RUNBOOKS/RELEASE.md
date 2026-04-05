# Release Runbook

## First-time setup

1. Create the GitHub repository.
2. Enable GitHub Pages and set the source to **GitHub Actions**.
3. Push `main`.
4. Confirm the `Deploy portfolio to GitHub Pages` workflow completes.

## Custom domain setup

- If the repository name ends with `.github.io`, no special base-path override is needed.
- If the repository uses a custom domain from a non-`.github.io` repo, set the repository variable `SITE_BASE_PATH=/` before deploying.
- Add the final domain in GitHub Pages settings.
- If you want a `CNAME` file, place it under `public/` once the domain is final.

## Pre-publish checklist

- Replace placeholder contact links in `src/content/site.json`.
- Remove any placeholder-looking project links in `src/content/projects.json`.
- Leave confidential case-study `repositoryUrl` and `demoUrl` values blank instead of inventing public URLs.
- Remove any template notes you do not want publicly visible.
- Replace any project entries still marked with template stage/kind.
- Run the harness locally.
- Run `corepack pnpm release:check` before a polished public publish.
- Keep `pnpm-lock.yaml` committed so CI and Pages use frozen installs.

## Deploy

```bash
python scripts/harness.py lint
python scripts/harness.py typecheck
python scripts/harness.py test
python scripts/harness.py build
corepack pnpm release:check
git push origin main
```

## Verify

- home page loads
- nested route refresh works (`/portfolio/<slug>`)
- project-subpath deploys generate URLs under the expected `/<repo>/` prefix
- demo links open correctly when a project intentionally exposes one
- contact links no longer show placeholders
