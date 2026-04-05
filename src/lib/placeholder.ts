import type { SiteLinks } from './types';

const PLACEHOLDER_TOKENS = ['replace-me', 'your-handle', 'example.com'];

export function isPlaceholderValue(value: string | undefined | null): boolean {
  if (!value) {
    return true;
  }

  const normalized = value.trim().toLowerCase();
  if (normalized.length === 0) {
    return true;
  }

  return PLACEHOLDER_TOKENS.some((token) => normalized.includes(token));
}

export function hasPlaceholderLinks(links: SiteLinks): boolean {
  return Object.values(links).some((value) => isPlaceholderValue(value));
}

export function isUsableExternalHref(href: string): boolean {
  return !isPlaceholderValue(href);
}
