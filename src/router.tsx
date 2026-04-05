import { createRouter, RouterProvider } from '@tanstack/react-router';
import { toRouterBasePath } from './lib/pages-base-path';
import { aboutRoute } from './routes/about';
import { caseStudiesRoute } from './routes/case-studies';
import { contactRoute } from './routes/contact';
import { experienceRoute } from './routes/experience';
import { homeRoute } from './routes/home';
import { portfolioRoute } from './routes/portfolio';
import { portfolioDetailRoute } from './routes/portfolio-detail';
import { projectDetailRoute } from './routes/project-detail';
import { projectsRoute } from './routes/projects';
import { rootRoute } from './routes/root';

const routeTree = rootRoute.addChildren([
  homeRoute,
  aboutRoute,
  portfolioRoute,
  portfolioDetailRoute,
  experienceRoute,
  projectsRoute,
  caseStudiesRoute,
  projectDetailRoute,
  contactRoute,
]);

export const router = createRouter({
  routeTree,
  basepath: toRouterBasePath(import.meta.env.BASE_URL),
  defaultPreload: 'intent',
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export function AppRouter() {
  return <RouterProvider router={router} />;
}
