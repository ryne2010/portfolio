import type { ErrorComponentProps } from '@tanstack/react-router';
import { createRootRoute } from '@tanstack/react-router';
import { AppShell } from '../components/app-shell';

function RootErrorComponent({ error, reset }: ErrorComponentProps) {
  const message = error instanceof Error ? error.message : 'Unexpected route error';

  return (
    <div className="portfolio-panel portfolio-panel-danger mx-auto max-w-3xl p-8 text-[color:var(--portfolio-danger)]">
      <p className="portfolio-kicker">Route error</p>
      <h1 className="mt-3 text-3xl font-semibold text-[color:var(--portfolio-danger)]">
        Something went wrong
      </h1>
      <p className="mt-3 text-sm leading-7 text-[color:var(--portfolio-danger)] opacity-90">
        {message}
      </p>
      <button
        type="button"
        onClick={reset}
        className="portfolio-button-secondary mt-6 px-4 py-2 text-sm"
      >
        Retry
      </button>
    </div>
  );
}

function NotFoundComponent() {
  return (
    <div className="portfolio-panel portfolio-panel-soft mx-auto max-w-3xl p-8 text-slate-800">
      <p className="portfolio-kicker">Not found</p>
      <h1 className="portfolio-ink mt-3 text-3xl font-semibold">This page does not exist</h1>
      <p className="mt-3 text-sm leading-7 text-slate-600">
        The route may have changed, or GitHub Pages may still be serving an older artifact.
      </p>
    </div>
  );
}

export const rootRoute = createRootRoute({
  component: AppShell,
  errorComponent: RootErrorComponent,
  notFoundComponent: NotFoundComponent,
});
