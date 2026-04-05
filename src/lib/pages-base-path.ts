export interface PagesBasePathEnv {
  GITHUB_REPOSITORY?: string;
  SITE_BASE_PATH?: string;
}

export function normalizeBasePath(input: string | undefined | null): string {
  const trimmed = input?.trim();
  if (!trimmed || trimmed === '/' || trimmed === './' || trimmed === '.') {
    return '/';
  }

  const withLeadingSlash = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  return withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`;
}

export function toRouterBasePath(baseUrl: string): string {
  const normalized = normalizeBasePath(baseUrl);
  return normalized === '/' ? normalized : normalized.slice(0, -1);
}

export function withBasePath(pathname: string, basePath: string): string {
  if (!pathname.startsWith('/') || pathname.startsWith('//')) {
    return pathname;
  }

  const normalizedBasePath = normalizeBasePath(basePath);
  if (normalizedBasePath === '/') {
    return pathname;
  }

  return `${normalizedBasePath}${pathname.slice(1)}`;
}

export function resolveContentPath(pathname: string): string {
  return withBasePath(pathname, import.meta.env.BASE_URL);
}

export function resolvePagesBasePath(env: PagesBasePathEnv): string {
  const explicitBasePath = env.SITE_BASE_PATH?.trim();
  if (explicitBasePath) {
    return normalizeBasePath(explicitBasePath);
  }

  const repositoryName = env.GITHUB_REPOSITORY?.split('/')[1];
  if (!repositoryName || repositoryName.endsWith('.github.io')) {
    return '/';
  }

  return normalizeBasePath(repositoryName);
}
