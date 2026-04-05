import { createRoute } from '@tanstack/react-router';
import { Callout } from '../components/callout';
import { SectionHeading } from '../components/section-heading';
import { siteContent } from '../content';
import { usePageTitle } from '../lib/page-title';
import { rootRoute } from './root';

function AboutPage() {
  usePageTitle('About');

  return (
    <div className="space-y-10">
      <SectionHeading
        eyebrow="About"
        title={siteContent.about.title}
        description={siteContent.availability}
      />

      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <article className="portfolio-panel portfolio-panel-soft space-y-8 p-6 lg:p-8">
          <div className="space-y-5">
            <p className="portfolio-kicker">Letter</p>
            {siteContent.about.intro.map((paragraph) => (
              <p key={paragraph} className="text-base leading-8 text-slate-700">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="space-y-5 border-t border-[color:var(--portfolio-border)] pt-6">
            <p className="portfolio-kicker">Background</p>
            {siteContent.about.personal.map((paragraph) => (
              <p key={paragraph} className="text-base leading-8 text-slate-700">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="space-y-3 border-t border-[color:var(--portfolio-border)] pt-6">
            <p className="portfolio-kicker">Closing</p>
            <p className="text-base leading-8 text-slate-700">{siteContent.about.closing}</p>
          </div>
        </article>

        <div className="space-y-6">
          <figure className="portfolio-panel portfolio-panel-soft overflow-hidden p-3">
            <img
              src={siteContent.visuals.farmPhoto.src}
              alt={siteContent.visuals.farmPhoto.alt}
              className="aspect-[4/5] w-full rounded-[1.5rem] object-cover"
            />
            <figcaption className="px-3 pb-2 pt-4">
              <p className="portfolio-kicker">{siteContent.visuals.farmPhoto.title}</p>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                {siteContent.visuals.farmPhoto.caption}
              </p>
            </figcaption>
          </figure>

          <Callout title="Qualifications">
            <ul className="ml-5 list-disc space-y-3">
              {siteContent.about.qualifications.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Callout>

          <div className="portfolio-panel portfolio-panel-cool p-6">
            <p className="portfolio-kicker portfolio-cool-text">Recent software engineering</p>
            <div className="mt-4 space-y-4">
              {siteContent.about.currentFocus.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-7 text-slate-700">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="ESCO work"
          title="Civil engineering project work and industry experience shaped how I lead delivery"
          description="These photos reflect the field execution, project responsibility, and industry-facing work that still influence how I approach software systems."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {siteContent.visuals.escoProjects.map((projectImage) => (
            <figure
              key={projectImage.src}
              className="portfolio-panel portfolio-panel-warm overflow-hidden p-3"
            >
              <img
                src={projectImage.src}
                alt={projectImage.alt}
                className="aspect-[4/3] w-full rounded-[1.5rem] object-cover"
              />
              <figcaption className="px-3 pb-2 pt-4">
                <p className="portfolio-kicker">{projectImage.title}</p>
                <p className="mt-2 text-sm leading-7 text-slate-700">{projectImage.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        {siteContent.signalsOfFit.map((signal) => (
          <div key={signal} className="portfolio-panel portfolio-panel-warm p-6">
            <p className="portfolio-kicker">Relevant experience</p>
            <p className="portfolio-ink mt-3 text-lg leading-8">{signal}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
});
