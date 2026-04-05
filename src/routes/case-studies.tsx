import { createRoute, Navigate } from '@tanstack/react-router';
import { rootRoute } from './root';

function CaseStudiesRedirectPage() {
  return <Navigate to="/portfolio" replace />;
}

export const caseStudiesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/case-studies',
  component: CaseStudiesRedirectPage,
});
