import { createRoute, Link, Navigate } from '@tanstack/react-router';
import { Callout } from '../components/callout';
import { SectionHeading } from '../components/section-heading';
import { experienceContent } from '../content';
import { usePageTitle } from '../lib/page-title';
import { isUsableExternalHref } from '../lib/placeholder';
import { getCanonicalPortfolioEntrySlug, getPortfolioEntryDetailBySlug } from '../lib/portfolio';
import type { CaseStudy, ExperienceTrack, SiteVisualAsset } from '../lib/types';
import { rootRoute } from './root';

function ExperienceDetailPage({
  title,
  summary,
  bullets,
}: {
  title: string;
  summary: string;
  bullets: string[];
}) {
  return (
    <>
      <SectionHeading eyebrow="Experience detail" title={title} description={summary} />

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="portfolio-panel portfolio-panel-soft p-6">
          <p className="portfolio-kicker">Scope</p>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
            {bullets.map((bullet) => (
              <li key={bullet} className="portfolio-inset px-4 py-3">
                {bullet}
              </li>
            ))}
          </ul>
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
      </section>
    </>
  );
}

function ProjectDetailPage({
  title,
  summary,
  demoUrl,
  repositoryUrl,
  referenceUrl,
  visual,
  problem,
  approach,
  architecture,
  outcomes,
  notes,
  stack,
  tags,
  experienceTracks,
  caseStudies,
}: {
  title: string;
  summary: string;
  demoUrl: string;
  repositoryUrl: string;
  referenceUrl: string;
  visual?: SiteVisualAsset;
  problem: string;
  approach: string[];
  architecture: {
    runtime: string;
    deployment: string;
    data: string;
    observability: string;
  };
  outcomes: string[];
  notes: string[];
  stack: string[];
  tags: string[];
  experienceTracks: ExperienceTrack[];
  caseStudies: CaseStudy[];
}) {
  return (
    <>
      <SectionHeading
        eyebrow="Project detail"
        title={title}
        description={summary}
        actions={
          <>
            {isUsableExternalHref(demoUrl) ? (
              <a
                href={demoUrl}
                target="_blank"
                rel="noreferrer"
                className="portfolio-button-primary px-4 py-2 text-sm"
              >
                Open demo
              </a>
            ) : null}
            {isUsableExternalHref(repositoryUrl) ? (
              <a
                href={repositoryUrl}
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
          </>
        }
      />

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="portfolio-panel portfolio-panel-soft space-y-6 p-6">
          <div>
            <p className="portfolio-kicker">Problem</p>
            <p className="mt-3 text-base leading-8 text-slate-700">{problem}</p>
          </div>
          <div>
            <p className="portfolio-kicker">Approach</p>
            <ul className="mt-3 space-y-3 text-sm leading-7 text-slate-700">
              {approach.map((item) => (
                <li key={item} className="portfolio-inset px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          {visual ? (
            <figure className="portfolio-panel portfolio-panel-warm overflow-hidden p-3">
              <img
                src={visual.src}
                alt={visual.alt}
                className="w-full rounded-[1.5rem] object-cover"
              />
              <figcaption className="space-y-2 px-3 pb-2 pt-4">
                <p className="portfolio-kicker">{visual.title}</p>
                <p className="text-sm leading-7 text-slate-600">{visual.caption}</p>
              </figcaption>
            </figure>
          ) : null}

          <Callout title="Architecture snapshot">
            <p>
              <strong>Runtime:</strong> {architecture.runtime}
            </p>
            <p>
              <strong>Deployment:</strong> {architecture.deployment}
            </p>
            <p>
              <strong>Data:</strong> {architecture.data}
            </p>
            <p>
              <strong>Observability:</strong> {architecture.observability}
            </p>
          </Callout>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="portfolio-panel portfolio-panel-soft p-6">
          <p className="portfolio-kicker">Outcome framing</p>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
            {outcomes.map((outcome) => (
              <li key={outcome} className="portfolio-inset px-4 py-3">
                {outcome}
              </li>
            ))}
          </ul>
        </div>
        <div className="portfolio-panel portfolio-panel-warm p-6">
          <p className="portfolio-kicker">Operational notes</p>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
            {notes.map((note) => (
              <li key={note} className="portfolio-inset px-4 py-3">
                {note}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {experienceTracks.length > 0 ? (
        <section className="space-y-6">
          <SectionHeading
            eyebrow="Leadership and operating scope"
            title="How the work was owned and delivered"
            description="Management, operating model, and implementation scope tied directly to the project."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            {experienceTracks.map((track) => (
              <article key={track.slug} className="portfolio-panel portfolio-panel-cool p-6">
                <p className="portfolio-kicker portfolio-cool-text">{track.title}</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">{track.summary}</p>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
                  {track.bullets.map((bullet) => (
                    <li key={bullet} className="portfolio-inset px-4 py-3">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {caseStudies.length > 0 ? (
        <section className="space-y-6">
          <SectionHeading
            eyebrow="Detailed narrative"
            title="Architecture, delivery, and operating context"
            description="Longer project detail on constraints, implementation choices, and outcomes."
          />
          {caseStudies.map((caseStudy) => (
            <article key={caseStudy.slug} className="portfolio-panel portfolio-panel-warm p-6">
              <p className="portfolio-kicker">{caseStudy.title}</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">{caseStudy.summary}</p>
              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                {caseStudy.sections.map((section) => (
                  <div key={section.title} className="portfolio-inset p-4">
                    <p className="portfolio-ink text-lg font-semibold">{section.title}</p>
                    <div className="mt-3 space-y-3 text-sm leading-7 text-slate-600">
                      {section.body.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>
      ) : null}

      <section className="portfolio-panel portfolio-panel-soft p-6">
        <p className="portfolio-kicker">Stack and tags</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {[...stack, ...tags].map((item) => (
            <span key={item} className="portfolio-chip px-3 py-1 text-sm text-slate-700">
              {item}
            </span>
          ))}
        </div>
      </section>
    </>
  );
}

function PortfolioDetailPage() {
  const { entrySlug } = portfolioDetailRoute.useParams();
  const canonicalEntrySlug = getCanonicalPortfolioEntrySlug(entrySlug);
  const entry = getPortfolioEntryDetailBySlug(canonicalEntrySlug);
  const pageTitle = !entry
    ? 'Portfolio detail not found'
    : entry.kind === 'experience'
      ? entry.track.title
      : entry.project.title;

  usePageTitle(pageTitle);

  if (canonicalEntrySlug !== entrySlug) {
    return (
      <Navigate to="/portfolio/$entrySlug" params={{ entrySlug: canonicalEntrySlug }} replace />
    );
  }

  if (!entry) {
    return (
      <div className="portfolio-panel portfolio-panel-soft mx-auto max-w-4xl p-8">
        <p className="portfolio-kicker">Unknown portfolio entry</p>
        <h1 className="portfolio-ink mt-3 text-3xl font-semibold">Portfolio detail not found</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          The link may be stale, or the entry slug may have changed.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
        <Link to="/portfolio" className="portfolio-button-secondary px-4 py-2">
          Back to portfolio
        </Link>
        <span>{entry.kind === 'experience' ? 'Experience' : entry.project.year}</span>
        <span>•</span>
        <span>{entry.kind === 'experience' ? 'leadership and delivery' : 'project detail'}</span>
      </div>

      {entry.kind === 'experience' ? (
        <ExperienceDetailPage
          title={entry.track.title}
          summary={entry.track.summary}
          bullets={entry.track.bullets}
        />
      ) : null}

      {entry.kind === 'project' ? (
        <ProjectDetailPage
          title={entry.project.title}
          summary={entry.project.summary}
          demoUrl={entry.project.demoUrl}
          repositoryUrl={entry.project.repositoryUrl}
          referenceUrl={entry.project.referenceUrl ?? ''}
          visual={entry.project.visual}
          problem={entry.project.problem}
          approach={entry.project.approach}
          architecture={entry.project.architecture}
          outcomes={entry.project.outcomes}
          notes={entry.project.notes}
          stack={entry.project.stack}
          tags={entry.project.tags}
          experienceTracks={entry.experienceTracks}
          caseStudies={entry.caseStudies}
        />
      ) : null}
    </div>
  );
}

export const portfolioDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/portfolio/$entrySlug',
  component: PortfolioDetailPage,
});
