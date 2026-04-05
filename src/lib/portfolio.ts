import {
  caseStudies,
  experienceContent,
  getCaseStudiesForProject,
  getProjectBySlug,
  projects,
} from '../content';
import type { CaseStudy, ExperienceTrack, Project } from './types';

export type PortfolioEntryKind = 'experience' | 'project';

export interface PortfolioEntrySummary {
  kind: PortfolioEntryKind;
  slug: string;
  hrefSlug: string;
  title: string;
  summary: string;
  meta: string;
}

export type PortfolioEntryDetail =
  | {
      kind: 'experience';
      track: ExperienceTrack;
    }
  | {
      kind: 'project';
      project: Project;
      experienceTracks: ExperienceTrack[];
      caseStudies: CaseStudy[];
    };

export const portfolioExperienceEntries: PortfolioEntrySummary[] = experienceContent.tracks.map(
  (track) => ({
    kind: 'experience',
    slug: track.slug,
    hrefSlug: track.relatedProjectSlug ?? track.slug,
    title: track.title,
    summary: track.summary,
    meta: 'Experience',
  }),
);

export const portfolioProjectEntries: PortfolioEntrySummary[] = projects.map((project) => ({
  kind: 'project',
  slug: project.slug,
  hrefSlug: project.slug,
  title: project.title,
  summary: project.summary,
  meta: project.year,
}));

export function getExperienceTrackBySlug(trackSlug: string): ExperienceTrack | undefined {
  return experienceContent.tracks.find((track) => track.slug === trackSlug);
}

export function getExperienceTracksForProject(projectSlug: string): ExperienceTrack[] {
  return experienceContent.tracks.filter((track) => track.relatedProjectSlug === projectSlug);
}

export function getProjectSlugForCaseStudySlug(caseStudySlug: string): string | undefined {
  return caseStudies.find((caseStudy) => caseStudy.slug === caseStudySlug)?.relatedProjectSlug;
}

export function getProjectSlugForExperienceTrackSlug(trackSlug: string): string | undefined {
  return getExperienceTrackBySlug(trackSlug)?.relatedProjectSlug;
}

export function getCanonicalPortfolioEntrySlug(entrySlug: string): string {
  return (
    getProjectSlugForCaseStudySlug(entrySlug) ??
    getProjectSlugForExperienceTrackSlug(entrySlug) ??
    entrySlug
  );
}

export function getPortfolioEntryDetailBySlug(entrySlug: string): PortfolioEntryDetail | undefined {
  const canonicalEntrySlug = getCanonicalPortfolioEntrySlug(entrySlug);

  if (canonicalEntrySlug !== entrySlug) {
    return getPortfolioEntryDetailBySlug(canonicalEntrySlug);
  }

  const track = getExperienceTrackBySlug(entrySlug);
  if (track && !track.relatedProjectSlug) {
    return { kind: 'experience', track };
  }

  const project = getProjectBySlug(entrySlug);
  if (project) {
    return {
      kind: 'project',
      project,
      experienceTracks: getExperienceTracksForProject(project.slug),
      caseStudies: getCaseStudiesForProject(project.slug),
    };
  }

  return undefined;
}
