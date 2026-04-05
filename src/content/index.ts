import type { CaseStudy, ExperienceContent, Project, SiteContent } from '../lib/types';
import caseStudiesJson from './case-studies.json';
import experienceJson from './experience.json';
import projectsJson from './projects.json';
import siteJson from './site.json';

export const siteContent = siteJson as SiteContent;
export const projects = projectsJson as Project[];
export const caseStudies = caseStudiesJson as CaseStudy[];
export const experienceContent = experienceJson as ExperienceContent;

export const featuredProjects = projects.filter((project) => project.featured);

export function getProjectBySlug(projectSlug: string): Project | undefined {
  return projects.find((project) => project.slug === projectSlug);
}

export function getCaseStudiesForProject(projectSlug: string): CaseStudy[] {
  return caseStudies.filter((caseStudy) => caseStudy.relatedProjectSlug === projectSlug);
}
