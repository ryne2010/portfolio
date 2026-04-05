import { createRoute, Navigate } from '@tanstack/react-router';
import { rootRoute } from './root';

function ExperienceRedirectPage() {
  return <Navigate to="/portfolio" replace />;
}

export const experienceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/experience',
  component: ExperienceRedirectPage,
});
