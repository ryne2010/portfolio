import { createRoute, Navigate } from '@tanstack/react-router';
import { rootRoute } from './root';

function ProjectsRedirectPage() {
  return <Navigate to="/portfolio" replace />;
}

export const projectsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/projects',
  component: ProjectsRedirectPage,
});
