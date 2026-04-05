import { describe, expect, it } from 'vitest';
import {
  getCanonicalPortfolioEntrySlug,
  getPortfolioEntryDetailBySlug,
  getProjectSlugForCaseStudySlug,
} from './portfolio';

describe('getPortfolioEntryDetailBySlug', () => {
  it('resolves experience tracks by slug', () => {
    const detail = getPortfolioEntryDetailBySlug('management-delivery-leadership');

    expect(detail?.kind).toBe('experience');
    expect(detail && detail.kind === 'experience' ? detail.track.title : '').toBe(
      'Management and delivery leadership',
    );
  });

  it('resolves projects by slug', () => {
    const detail = getPortfolioEntryDetailBySlug('vendrix-platform-engineering');

    expect(detail?.kind).toBe('project');
    expect(
      detail && detail.kind === 'project' ? detail.experienceTracks.length : 0,
    ).toBeGreaterThan(0);
    expect(detail && detail.kind === 'project' ? detail.caseStudies.length : 0).toBeGreaterThan(0);
    expect(detail && detail.kind === 'project' ? detail.project.visual?.src : '').toBe(
      '/vendrix-concrete-expo.jpg',
    );
  });

  it('resolves aliased experience tracks to their related project detail', () => {
    const detail = getPortfolioEntryDetailBySlug('vendrix-product-platform-ownership');

    expect(detail?.kind).toBe('project');
    expect(detail && detail.kind === 'project' ? detail.project.slug : '').toBe(
      'vendrix-platform-engineering',
    );
  });

  it('maps case-study slugs to project slugs', () => {
    expect(getProjectSlugForCaseStudySlug('vendrix-platform-maturity')).toBe(
      'vendrix-platform-engineering',
    );
  });

  it('maps aliased experience-track slugs to canonical project slugs', () => {
    expect(getCanonicalPortfolioEntrySlug('grounded-ai-knowledge-systems')).toBe(
      'grounded-knowledge-platform',
    );
  });

  it('returns undefined for unknown slugs', () => {
    expect(getPortfolioEntryDetailBySlug('missing-entry')).toBeUndefined();
  });
});
