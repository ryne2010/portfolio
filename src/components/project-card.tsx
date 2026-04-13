import { Link } from '@tanstack/react-router';
import { isUsableExternalHref } from '../lib/placeholder';
import type { Project } from '../lib/types';

interface ProjectCardProps {
  project: Project;
}

function kindLabel(kind: Project['kind']): string {
  switch (kind) {
    case 'live-demo':
      return 'Live demo slot';
    case 'case-study':
      return 'Project';
    case 'template':
      return 'Template slot';
  }
}

export function ProjectCard({ project }: ProjectCardProps) {
  const referenceUrl = project.referenceUrl ?? '';

  return (
    <article className="portfolio-interactive-surface portfolio-interactive-surface-strong portfolio-panel portfolio-panel-soft group flex h-full flex-col p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="portfolio-chip px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]">
          {kindLabel(project.kind)}
        </span>
        <span className="text-xs uppercase tracking-[0.2em] text-slate-500">{project.year}</span>
      </div>

      <div className="mt-6 space-y-4">
        <h3 className="portfolio-title portfolio-ink text-[1.9rem]">{project.title}</h3>
        <p className="portfolio-accent text-sm font-semibold uppercase tracking-[0.14em]">
          {project.tagline}
        </p>
        <p className="text-sm leading-7 text-slate-600">{project.summary}</p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="portfolio-chip portfolio-chip-interactive px-3 py-1 text-xs text-slate-600"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
        <div className="portfolio-inset p-4">
          <p className="portfolio-kicker text-slate-500">Deployment</p>
          <p className="mt-2 leading-6">{project.architecture.deployment}</p>
        </div>
        <div className="portfolio-inset p-4">
          <p className="portfolio-kicker text-slate-500">Observability</p>
          <p className="mt-2 leading-6">{project.architecture.observability}</p>
        </div>
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
        <Link
          to="/portfolio/$entrySlug"
          params={{ entrySlug: project.slug }}
          className="portfolio-button-primary px-4 py-2 text-sm"
        >
          Open detail
        </Link>
        {isUsableExternalHref(project.demoUrl) ? (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noreferrer"
            className="portfolio-button-secondary px-4 py-2 text-sm"
          >
            Live demo
          </a>
        ) : null}
        {isUsableExternalHref(project.repositoryUrl) ? (
          <a
            href={project.repositoryUrl}
            target="_blank"
            rel="noreferrer"
            className="portfolio-button-secondary px-4 py-2 text-sm"
          >
            Repository
          </a>
        ) : null}
        {isUsableExternalHref(referenceUrl) ? (
          <a
            href={referenceUrl}
            target="_blank"
            rel="noreferrer"
            className="portfolio-button-secondary px-4 py-2 text-sm"
          >
            Article
          </a>
        ) : null}
      </div>
    </article>
  );
}
