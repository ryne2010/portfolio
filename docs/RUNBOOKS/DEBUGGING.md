# Debugging Runbook

## Symptoms: nested routes 404 on GitHub Pages

Check:

- the build includes `dist/404.html`
- the Pages deployment used the current artifact
- the router basepath matches the Vite `base` output
- the base path matches the actual deployment topology

## Symptoms: assets load locally but not on Pages

Check:

- `SITE_BASE_PATH` repository variable
- inferred base path from `GITHUB_REPOSITORY`
- `import.meta.env.BASE_URL` in the built bundle
- whether the repo is a user/org Pages repo or a nested project repo
- a local subpath build via `SITE_BASE_PATH=/portfolio/ corepack pnpm build`

## Symptoms: portfolio detail links look broken

Check the relevant entry in `src/content/projects.json`, `src/content/case-studies.json`, or `src/content/experience.json`. Portfolio detail slugs must stay unique across all three content files. Confidential case studies may intentionally omit `repositoryUrl` or `demoUrl`; placeholder-looking URLs should be removed rather than shipped.

## Symptoms: content validation fails

Run:

```bash
node scripts/validate-content.mjs
```

The script reports duplicate slugs, missing references, missing featured projects, and cross-collection slug collisions that would break `/portfolio/<slug>` detail pages.

## Symptoms: scaffold deploy passes, but polished publish should fail

Run:

```bash
corepack pnpm release:check
```

This stricter check fails on placeholder contact links, template-stage projects, placeholder-looking project URLs, and any remaining setup notice.
