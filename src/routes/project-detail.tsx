import { createRoute, Navigate } from '@tanstack/react-router';
import { rootRoute } from './root';

function ProjectDetailRedirectPage() {
  const { projectSlug } = projectDetailRoute.useParams();

  return <Navigate to="/portfolio/$entrySlug" params={{ entrySlug: projectSlug }} replace />;
}

export const projectDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/projects/$projectSlug',
  component: ProjectDetailRedirectPage,
});
