import { useEffect } from 'react';
import { siteContent } from '../content';

export function usePageTitle(pageTitle: string): void {
  useEffect(() => {
    document.title = `${pageTitle} | ${siteContent.name}`;
  }, [pageTitle]);
}
