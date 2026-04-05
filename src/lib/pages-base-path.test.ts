import { describe, expect, it } from 'vitest';
import {
  normalizeBasePath,
  resolvePagesBasePath,
  toRouterBasePath,
  withBasePath,
} from './pages-base-path';

describe('pages base path helpers', () => {
  it('defaults to the root path', () => {
    expect(normalizeBasePath(undefined)).toBe('/');
    expect(normalizeBasePath('/')).toBe('/');
    expect(normalizeBasePath('./')).toBe('/');
  });

  it('normalizes explicit base paths for Vite', () => {
    expect(normalizeBasePath('portfolio')).toBe('/portfolio/');
    expect(normalizeBasePath('/portfolio')).toBe('/portfolio/');
    expect(normalizeBasePath('/portfolio/')).toBe('/portfolio/');
  });

  it('derives the root path for user or org pages repos', () => {
    expect(resolvePagesBasePath({ GITHUB_REPOSITORY: 'ryne/ryne.github.io' })).toBe('/');
  });

  it('derives a repo subpath for project pages repos', () => {
    expect(resolvePagesBasePath({ GITHUB_REPOSITORY: 'ryne/portfolio' })).toBe('/portfolio/');
  });

  it('prefers an explicit site base path', () => {
    expect(
      resolvePagesBasePath({
        GITHUB_REPOSITORY: 'ryne/portfolio',
        SITE_BASE_PATH: '/resume-site',
      }),
    ).toBe('/resume-site/');
  });

  it('normalizes router base paths without a trailing slash', () => {
    expect(toRouterBasePath('/')).toBe('/');
    expect(toRouterBasePath('/portfolio/')).toBe('/portfolio');
  });

  it('prefixes local asset paths with the Pages base path', () => {
    expect(withBasePath('/ryne-schroder-headshot.jpg', '/portfolio/')).toBe(
      '/portfolio/ryne-schroder-headshot.jpg',
    );
    expect(withBasePath('/ryne-schroder-headshot.jpg', '/')).toBe('/ryne-schroder-headshot.jpg');
  });

  it('leaves external and protocol-based links unchanged', () => {
    expect(withBasePath('https://example.com', '/portfolio/')).toBe('https://example.com');
    expect(withBasePath('mailto:test@example.com', '/portfolio/')).toBe('mailto:test@example.com');
  });
});
