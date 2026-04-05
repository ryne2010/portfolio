import type { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}

export function SectionHeading({ eyebrow, title, description, actions }: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl space-y-4">
        {eyebrow ? (
          <div className="flex items-center gap-3">
            <p className="portfolio-kicker">{eyebrow}</p>
            <div className="portfolio-rule h-px w-16" />
          </div>
        ) : null}
        <div className="space-y-3">
          <h2 className="portfolio-title portfolio-ink text-3xl sm:text-4xl">{title}</h2>
          {description ? (
            <p className="max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">{description}</p>
          ) : null}
        </div>
      </div>
      {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
    </div>
  );
}
