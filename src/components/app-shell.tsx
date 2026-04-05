import { Link, linkOptions, Outlet } from '@tanstack/react-router';
import { siteContent } from '../content';
import { hasPlaceholderLinks, isUsableExternalHref } from '../lib/placeholder';

const navigation = linkOptions([
  { to: '/', label: 'Home', activeOptions: { exact: true } },
  { to: '/about', label: 'About' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/contact', label: 'Contact' },
]);

const profileNeedsSetup = hasPlaceholderLinks(siteContent.links);

export function AppShell() {
  return (
    <div className="relative min-h-screen overflow-hidden text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
        <header className="portfolio-panel portfolio-panel-soft sticky top-0 z-20 mt-4 px-4 py-4 backdrop-blur xl:px-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-1">
              <p className="portfolio-kicker">
                {siteContent.location} / Data Architecture / Cloud Platforms / Applied AI
              </p>
              <Link
                to="/"
                activeOptions={{ exact: true }}
                className="portfolio-title portfolio-ink text-2xl"
              >
                {siteContent.name}
              </Link>
              <p className="max-w-3xl text-sm leading-6 text-slate-600">{siteContent.headline}</p>
            </div>
            <nav className="flex flex-wrap gap-2 text-sm text-slate-700">
              {navigation.map((item) => (
                <Link
                  key={item.to}
                  {...item}
                  activeProps={{
                    className: 'portfolio-nav-link-active',
                    'aria-current': 'page',
                  }}
                  className="portfolio-nav-link px-3 py-2"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          {profileNeedsSetup ? (
            <div className="portfolio-panel portfolio-panel-danger mt-4 px-4 py-3 text-sm text-[color:var(--portfolio-danger)]">
              {siteContent.setupNotice}
            </div>
          ) : null}
        </header>

        <main className="flex-1 py-8">
          <Outlet />
        </main>

        <footer className="border-t border-[color:var(--portfolio-border)] py-8 text-sm text-slate-600">
          <div className="flex flex-wrap justify-end gap-4">
            {isUsableExternalHref(siteContent.links.github) ? (
              <a
                href={siteContent.links.github}
                target="_blank"
                rel="noreferrer"
                className="portfolio-link"
              >
                GitHub
              </a>
            ) : (
              <span>GitHub unavailable</span>
            )}
            {isUsableExternalHref(siteContent.links.linkedin) ? (
              <a
                href={siteContent.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="portfolio-link"
              >
                LinkedIn
              </a>
            ) : (
              <span>LinkedIn unavailable</span>
            )}
            {isUsableExternalHref(siteContent.links.email) ? (
              <a href={siteContent.links.email} className="portfolio-link">
                Email
              </a>
            ) : (
              <span>Email unavailable</span>
            )}
          </div>
        </footer>
      </div>
    </div>
  );
}
