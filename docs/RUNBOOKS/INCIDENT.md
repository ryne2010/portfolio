# Incident Runbook

## Main portfolio site unavailable

1. Check the latest GitHub Actions run.
2. Confirm the Pages environment deployed the newest artifact.
3. If the build is broken, revert to the last known good commit.
4. Keep the hosted demo URL untouched unless the incident is specific to that demo.

## Hosted demo unavailable

The portfolio site should still function.

- Temporarily change the project entry to remove or relabel the live demo link.
- Add or update screenshots and case-study notes so the project remains reviewable.
- Restore the demo only after cost, correctness, and stability are acceptable.
