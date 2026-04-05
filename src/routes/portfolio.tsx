import { createRoute, Link } from '@tanstack/react-router';
import { ProjectCard } from '../components/project-card';
import { SectionHeading } from '../components/section-heading';
import { experienceContent, projects, siteContent } from '../content';
import { usePageTitle } from '../lib/page-title';
import { portfolioExperienceEntries } from '../lib/portfolio';
import { rootRoute } from './root';

function PortfolioPage() {
  usePageTitle('Portfolio');

  return (
    <div className="space-y-10">
      <SectionHeading
        eyebrow="Portfolio"
        title="Management, delivery ownership, and system design across one body of work"
        description="Leadership scope, implementation detail, and architecture narratives across ESCO, Vendrix, EdgeWatch, and later data and AI work."
      />

      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="portfolio-panel portfolio-panel-soft space-y-5 p-6">
          {experienceContent.intro.map((paragraph) => (
            <p key={paragraph} className="text-base leading-8 text-slate-700">
              {paragraph}
            </p>
          ))}
          <div className="flex flex-wrap gap-2 pt-2">
            {siteContent.focusAreas.map((focusArea) => (
              <span key={focusArea} className="portfolio-chip px-3 py-1 text-sm text-slate-700">
                {focusArea}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {siteContent.highlights.map((highlight) => (
              <div key={highlight.label} className="portfolio-panel portfolio-panel-warm p-5">
                <p className="portfolio-kicker">{highlight.label}</p>
                <p className="portfolio-ink mt-3 text-2xl font-semibold tracking-tight">
                  {highlight.value}
                </p>
              </div>
            ))}
          </div>

          <div className="portfolio-panel portfolio-panel-cool p-6">
            <p className="portfolio-kicker portfolio-cool-text">Execution pattern</p>
            <div className="mt-4 space-y-4">
              {experienceContent.deliveryLoop.map((step, index) => (
                <div key={step.title} className="portfolio-inset p-4">
                  <p className="portfolio-cool-text text-sm font-semibold">
                    {index + 1}. {step.title}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Experience"
          title="Leadership and operating scope"
          description="Direct management, release ownership, field operations, governed data delivery, and grounded AI systems."
        />

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {portfolioExperienceEntries.map((entry) => (
            <article key={entry.slug} className="portfolio-panel portfolio-panel-warm p-6">
              <p className="portfolio-kicker">{entry.meta}</p>
              <h3 className="portfolio-ink mt-3 text-2xl font-semibold">{entry.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{entry.summary}</p>
              <Link
                to="/portfolio/$entrySlug"
                params={{ entrySlug: entry.hrefSlug }}
                className="portfolio-link mt-5 inline-flex text-sm font-semibold"
              >
                Open detail →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Projects"
          title="Platform, product, and systems delivery"
          description="Project-level detail across Vendrix, EdgeWatch, governed data platforms, and grounded AI work."
        />

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}

export const portfolioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/portfolio',
  component: PortfolioPage,
});
