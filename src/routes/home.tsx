import { createRoute, Link } from '@tanstack/react-router';
import { ProjectCard } from '../components/project-card';
import { SectionHeading } from '../components/section-heading';
import { featuredProjects, getProjectBySlug, siteContent } from '../content';
import { usePageTitle } from '../lib/page-title';
import { isUsableExternalHref } from '../lib/placeholder';
import { rootRoute } from './root';

function isInternalPath(href: string): boolean {
  return href.startsWith('/');
}

function HomePage() {
  usePageTitle('Portfolio');
  const vendrixProject = getProjectBySlug('vendrix-platform-engineering');
  const vendrixReferenceUrl = vendrixProject?.referenceUrl ?? '';

  return (
    <div className="space-y-20">
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <div className="space-y-8">
          <div className="space-y-6">
            <p className="portfolio-kicker">Work focus</p>
            <h1 className="portfolio-display portfolio-ink max-w-5xl text-5xl sm:text-6xl lg:text-[4.7rem]">
              Engineering management at ESCO, product and platform ownership at Vendrix, and data,
              operations, and AI systems built after both.
            </h1>
            <div className="max-w-3xl space-y-4 text-base leading-8 text-slate-700">
              {siteContent.summary.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {isInternalPath(siteContent.cta.primaryHref) ? (
              <Link
                to={siteContent.cta.primaryHref}
                className="portfolio-button-primary px-5 py-3 text-sm"
              >
                {siteContent.cta.primaryLabel}
              </Link>
            ) : isUsableExternalHref(siteContent.cta.primaryHref) ? (
              <a
                href={siteContent.cta.primaryHref}
                target="_blank"
                rel="noreferrer"
                className="portfolio-button-primary px-5 py-3 text-sm"
              >
                {siteContent.cta.primaryLabel}
              </a>
            ) : null}
            {isInternalPath(siteContent.cta.secondaryHref) ? (
              <Link
                to={siteContent.cta.secondaryHref}
                className="portfolio-button-secondary px-5 py-3 text-sm"
              >
                {siteContent.cta.secondaryLabel}
              </Link>
            ) : isUsableExternalHref(siteContent.cta.secondaryHref) ? (
              <a
                href={siteContent.cta.secondaryHref}
                target="_blank"
                rel="noreferrer"
                className="portfolio-button-secondary px-5 py-3 text-sm"
              >
                {siteContent.cta.secondaryLabel}
              </a>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-2">
            {siteContent.focusAreas.map((focusArea) => (
              <span
                key={focusArea}
                className="portfolio-chip px-4 py-2 text-sm font-medium text-slate-700"
              >
                {focusArea}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <figure className="portfolio-panel portfolio-panel-soft overflow-hidden p-3">
            <img
              src={siteContent.visuals.headshot.src}
              alt={siteContent.visuals.headshot.alt}
              className="aspect-[4/5] w-full rounded-[1.5rem] object-cover"
            />
            <figcaption className="px-3 pb-2 pt-4">
              <p className="portfolio-kicker">{siteContent.visuals.headshot.title}</p>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                {siteContent.visuals.headshot.caption}
              </p>
            </figcaption>
          </figure>

          <div className="portfolio-panel portfolio-panel-warm p-6">
            <p className="portfolio-kicker">Availability</p>
            <p className="portfolio-ink mt-4 text-xl font-semibold leading-8">
              {siteContent.availability}
            </p>
            <p className="mt-2 text-sm leading-7 text-slate-600">{siteContent.location}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {siteContent.highlights.map((highlight) => (
              <div key={highlight.label} className="portfolio-panel portfolio-panel-soft p-5">
                <p className="portfolio-kicker text-slate-500">{highlight.label}</p>
                <p className="portfolio-ink mt-3 text-2xl font-semibold tracking-tight">
                  {highlight.value}
                </p>
              </div>
            ))}
          </div>

          <div className="portfolio-panel portfolio-panel-cool overflow-hidden p-3">
            <figure className="space-y-2">
              <img
                src={siteContent.visuals.vendrixNotice.src}
                alt={siteContent.visuals.vendrixNotice.alt}
                className="aspect-[16/9] w-full rounded-[1.5rem] object-cover"
              />
              <figcaption className="px-1 text-xs leading-5 text-slate-600">
                {siteContent.visuals.vendrixNotice.title}
              </figcaption>
            </figure>
            <div className="space-y-3 px-3 pb-2 pt-4">
              <p className="portfolio-kicker portfolio-cool-text">Vendrix</p>
              <p className="text-sm leading-7 text-slate-700">
                {siteContent.visuals.vendrixNotice.caption}
              </p>
              <p className="text-sm leading-7 text-slate-700">
                I was a founding platform engineer at Vendrix from June 2021 through April 2023,
                owning cloud platform migrations, deployability, security controls, and
                observability while also contributing to product delivery.
              </p>
            </div>
            {isUsableExternalHref(vendrixReferenceUrl) ? (
              <a
                href={vendrixReferenceUrl}
                target="_blank"
                rel="noreferrer"
                className="portfolio-link inline-flex px-3 pb-3 text-sm font-semibold"
              >
                Read the announcement
              </a>
            ) : null}
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Selected work"
          title="Vendrix product ownership, EdgeWatch operations, and later data and AI systems"
          description="The work spans engineering management, product and platform delivery, field operations systems, governed data platforms, and grounded AI knowledge tools."
        />
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-6">
          {featuredProjects.map((project, index) => (
            <div
              key={project.slug}
              className={index === 0 ? 'lg:col-span-2 xl:col-span-4' : 'xl:col-span-2'}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </section>

      <section className="portfolio-panel portfolio-panel-soft p-6">
        <SectionHeading
          eyebrow="What I owned"
          title="The work centers on delivery ownership, management scope, and systems that stay explainable under pressure."
          description="Across ESCO, Vendrix, EdgeWatch, and later data and AI work, the emphasis stays on people, release scope, runtime choices, observability, and recovery."
        />
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {siteContent.signalsOfFit.map((signal) => (
            <div key={signal} className="portfolio-inset p-4">
              <p className="text-sm leading-7 text-slate-700">{signal}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});
