export type ProjectKind = 'live-demo' | 'case-study' | 'template';

export interface SiteHighlight {
  label: string;
  value: string;
}

export interface SiteLinks {
  email: string;
  github: string;
  linkedin: string;
  resume: string;
}

export interface SiteCallToAction {
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
}

export interface SiteAboutContent {
  title: string;
  intro: string[];
  personal: string[];
  qualifications: string[];
  currentFocus: string[];
  closing: string;
}

export interface SiteVisualAsset {
  src: string;
  alt: string;
  title: string;
  caption: string;
}

export interface SiteVisuals {
  headshot: SiteVisualAsset;
  farmPhoto: SiteVisualAsset;
  vendrixNotice: SiteVisualAsset;
  escoProjects: SiteVisualAsset[];
}

export interface SiteContent {
  name: string;
  headline: string;
  location: string;
  availability: string;
  summary: string[];
  focusAreas: string[];
  highlights: SiteHighlight[];
  links: SiteLinks;
  cta: SiteCallToAction;
  setupNotice: string;
  signalsOfFit: string[];
  about: SiteAboutContent;
  visuals: SiteVisuals;
}

export interface ProjectArchitecture {
  runtime: string;
  deployment: string;
  data: string;
  observability: string;
}

export interface Project {
  slug: string;
  title: string;
  kind: ProjectKind;
  stage: string;
  featured: boolean;
  year: string;
  tagline: string;
  summary: string;
  problem: string;
  tags: string[];
  stack: string[];
  repositoryUrl: string;
  demoUrl: string;
  referenceUrl?: string;
  visual?: SiteVisualAsset;
  approach: string[];
  architecture: ProjectArchitecture;
  outcomes: string[];
  notes: string[];
}

export interface CaseStudySection {
  title: string;
  body: string[];
}

export interface CaseStudy {
  slug: string;
  title: string;
  summary: string;
  relatedProjectSlug: string;
  sections: CaseStudySection[];
}

export interface ExperienceTrack {
  slug: string;
  relatedProjectSlug?: string;
  title: string;
  summary: string;
  bullets: string[];
}

export interface DeliveryLoopStep {
  title: string;
  description: string;
}

export interface ExperienceContent {
  intro: string[];
  tracks: ExperienceTrack[];
  deliveryLoop: DeliveryLoopStep[];
}
