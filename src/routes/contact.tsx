import { createRoute } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { Callout } from '../components/callout';
import { SectionHeading } from '../components/section-heading';
import { siteContent } from '../content';
import { usePageTitle } from '../lib/page-title';
import { isUsableExternalHref } from '../lib/placeholder';
import { rootRoute } from './root';

function contactCard(label: string, href: string, helper: string, displayValue?: ReactNode) {
  const configured = isUsableExternalHref(href);

  return (
    <div className="portfolio-panel portfolio-panel-soft p-6">
      <p className="portfolio-kicker">{label}</p>
      {configured ? (
        <a
          href={href}
          target={href.startsWith('mailto:') ? undefined : '_blank'}
          rel={href.startsWith('mailto:') ? undefined : 'noreferrer'}
          className="portfolio-link mt-4 inline-flex text-lg font-semibold"
        >
          {displayValue ?? href.replace('mailto:', '')}
        </a>
      ) : (
        <p className="portfolio-accent mt-4 text-lg font-semibold">Link unavailable</p>
      )}
      <p className="mt-3 text-sm leading-7 text-slate-600">{helper}</p>
    </div>
  );
}

function ContactPage() {
  usePageTitle('Contact');

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Contact"
        title="Contact information"
        description="Email, GitHub, LinkedIn, and my current resume."
      />

      <div className="grid gap-6 lg:grid-cols-4">
        {contactCard(
          'Email',
          siteContent.links.email,
          'Best default for direct outreach and interview coordination.',
          'ryne201011@gmail.com',
        )}
        {contactCard(
          'GitHub',
          siteContent.links.github,
          'Link to repositories, demos, and implementation detail.',
          'github.com/ryne2010',
        )}
        {contactCard(
          'LinkedIn',
          siteContent.links.linkedin,
          'Useful for recruiter workflows and public professional context.',
          'linkedin.com/in/ryne-schroder',
        )}
        {contactCard(
          'Resume',
          siteContent.links.resume,
          'Open the current data architect resume as a PDF.',
          'Open resume (PDF)',
        )}
      </div>

      <Callout title="Best-fit conversations">
        <p>
          Senior and staff roles in data architecture, data platforms, GCP infrastructure, or
          grounded AI systems are the most direct fit for the work shown here.
        </p>
        <p>
          I am especially interested in teams that care about governance, operational maturity, and
          cloud delivery as much as they care about feature velocity.
        </p>
      </Callout>
    </div>
  );
}

export const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: ContactPage,
});
