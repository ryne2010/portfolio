import type { ReactNode } from 'react';

interface CalloutProps {
  title: string;
  children: ReactNode;
}

export function Callout({ title, children }: CalloutProps) {
  return (
    <div className="portfolio-panel portfolio-panel-cool portfolio-cool-text p-6 text-sm">
      <p className="portfolio-kicker portfolio-cool-text">{title}</p>
      <div className="mt-4 space-y-3 text-sm leading-7">{children}</div>
    </div>
  );
}
