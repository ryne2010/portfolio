import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const contentDirectory = path.resolve(currentDirectory, '../src/content');
const publishMode = process.argv.includes('--publish');
const placeholderTokens = ['replace-me', 'your-handle', 'example.com'];

async function readJson(filename) {
  const content = await readFile(path.join(contentDirectory, filename), 'utf8');
  return JSON.parse(content);
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function duplicateValues(values) {
  const counts = new Map();
  for (const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  return [...counts.entries()].filter(([, count]) => count > 1).map(([value]) => value);
}

function isPlaceholderValue(value) {
  if (typeof value !== 'string') {
    return true;
  }

  const normalized = value.trim().toLowerCase();
  if (normalized.length === 0) {
    return true;
  }

  return placeholderTokens.some((token) => normalized.includes(token));
}

function assertPublishReadyLink(value, message) {
  assert(!isPlaceholderValue(value), message);
}

function assertOptionalPublishReadyLink(value, message) {
  if (typeof value !== 'string' || value.trim().length === 0) {
    return;
  }

  assertPublishReadyLink(value, message);
}

function assertNoPlaceholderString(value, message) {
  assert(
    typeof value === 'string' &&
      !placeholderTokens.some((token) => value.toLowerCase().includes(token)),
    message,
  );
}

function assertVisualAsset(asset, messagePrefix) {
  assert(
    asset && typeof asset.src === 'string' && asset.src.length > 0,
    `${messagePrefix}: src is required`,
  );
  assert(
    asset && typeof asset.alt === 'string' && asset.alt.length > 0,
    `${messagePrefix}: alt is required`,
  );
  assert(
    asset && typeof asset.title === 'string' && asset.title.length > 0,
    `${messagePrefix}: title is required`,
  );
  assert(
    asset && typeof asset.caption === 'string' && asset.caption.length > 0,
    `${messagePrefix}: caption is required`,
  );
}

async function main() {
  const site = await readJson('site.json');
  const projects = await readJson('projects.json');
  const caseStudies = await readJson('case-studies.json');
  const experience = await readJson('experience.json');

  assert(site.name, 'site.json: `name` is required');
  assert(
    Array.isArray(site.summary) && site.summary.length > 0,
    'site.json: `summary` must be a non-empty array',
  );
  assert(
    Array.isArray(site.focusAreas) && site.focusAreas.length > 0,
    'site.json: `focusAreas` must be a non-empty array',
  );
  assert(
    site.about && typeof site.about.title === 'string' && site.about.title.length > 0,
    'site.json: `about.title` is required',
  );
  assert(
    Array.isArray(site.about?.intro) && site.about.intro.length > 0,
    'site.json: `about.intro` must be a non-empty array',
  );
  assert(
    Array.isArray(site.about?.personal) && site.about.personal.length > 0,
    'site.json: `about.personal` must be a non-empty array',
  );
  assert(
    Array.isArray(site.about?.qualifications) && site.about.qualifications.length > 0,
    'site.json: `about.qualifications` must be a non-empty array',
  );
  assert(
    Array.isArray(site.about?.currentFocus) && site.about.currentFocus.length > 0,
    'site.json: `about.currentFocus` must be a non-empty array',
  );
  assert(
    typeof site.about?.closing === 'string' && site.about.closing.length > 0,
    'site.json: `about.closing` is required',
  );
  assert(site.visuals, 'site.json: `visuals` is required');
  assertVisualAsset(site.visuals.headshot, 'site.json: `visuals.headshot`');
  assertVisualAsset(site.visuals.farmPhoto, 'site.json: `visuals.farmPhoto`');
  assertVisualAsset(site.visuals.vendrixNotice, 'site.json: `visuals.vendrixNotice`');
  assert(
    Array.isArray(site.visuals.escoProjects) && site.visuals.escoProjects.length >= 3,
    'site.json: `visuals.escoProjects` must include at least three images',
  );
  for (const [index, asset] of site.visuals.escoProjects.entries()) {
    assertVisualAsset(asset, `site.json: \`visuals.escoProjects[${index}]\``);
  }

  const projectSlugs = projects.map((project) => project.slug);
  const duplicateProjectSlugs = duplicateValues(projectSlugs);
  assert(
    duplicateProjectSlugs.length === 0,
    `projects.json: duplicate project slugs: ${duplicateProjectSlugs.join(', ')}`,
  );

  const caseStudySlugs = caseStudies.map((caseStudy) => caseStudy.slug);
  const duplicateCaseStudySlugs = duplicateValues(caseStudySlugs);
  assert(
    duplicateCaseStudySlugs.length === 0,
    `case-studies.json: duplicate case-study slugs: ${duplicateCaseStudySlugs.join(', ')}`,
  );

  const experienceTrackSlugs = experience.tracks.map((track) => track.slug);
  const duplicateExperienceTrackSlugs = duplicateValues(experienceTrackSlugs);
  assert(
    duplicateExperienceTrackSlugs.length === 0,
    `experience.json: duplicate track slugs: ${duplicateExperienceTrackSlugs.join(', ')}`,
  );

  const duplicatePortfolioEntrySlugs = duplicateValues([
    ...projectSlugs,
    ...caseStudySlugs,
    ...experienceTrackSlugs,
  ]);
  assert(
    duplicatePortfolioEntrySlugs.length === 0,
    `portfolio entry slugs must be unique across projects, case studies, and experience tracks: ${duplicatePortfolioEntrySlugs.join(', ')}`,
  );

  const featuredProjects = projects.filter((project) => project.featured);
  assert(featuredProjects.length >= 1, 'projects.json: at least one featured project is required');

  for (const project of projects) {
    assert(
      typeof project.title === 'string' && project.title.length > 0,
      `projects.json: project ${project.slug} is missing a title`,
    );
    assert(
      Array.isArray(project.tags) && project.tags.length > 0,
      `projects.json: project ${project.slug} must include tags`,
    );
    assert(
      Array.isArray(project.stack) && project.stack.length > 0,
      `projects.json: project ${project.slug} must include stack entries`,
    );
    assert(
      Array.isArray(project.outcomes) && project.outcomes.length > 0,
      `projects.json: project ${project.slug} must include outcomes`,
    );
    if (project.visual) {
      assertVisualAsset(project.visual, `projects.json: project ${project.slug} visual`);
    }
  }

  const projectSlugSet = new Set(projectSlugs);
  for (const caseStudy of caseStudies) {
    assert(
      typeof caseStudy.relatedProjectSlug === 'string' && caseStudy.relatedProjectSlug.length > 0,
      `case-studies.json: ${caseStudy.slug} must include relatedProjectSlug`,
    );
    assert(
      projectSlugSet.has(caseStudy.relatedProjectSlug),
      `case-studies.json: ${caseStudy.slug} references missing project slug ${caseStudy.relatedProjectSlug}`,
    );

    assert(
      Array.isArray(caseStudy.sections) && caseStudy.sections.length > 0,
      `case-studies.json: ${caseStudy.slug} must include sections`,
    );
  }

  assert(
    Array.isArray(experience.tracks) && experience.tracks.length > 0,
    'experience.json: `tracks` must be a non-empty array',
  );
  assert(
    Array.isArray(experience.deliveryLoop) && experience.deliveryLoop.length > 0,
    'experience.json: `deliveryLoop` must be a non-empty array',
  );

  for (const track of experience.tracks) {
    assert(
      typeof track.slug === 'string' && track.slug.length > 0,
      `experience.json: track ${track.title ?? '<unknown>'} is missing a slug`,
    );
    assert(
      typeof track.title === 'string' && track.title.length > 0,
      `experience.json: track ${track.slug} is missing a title`,
    );
    assert(
      Array.isArray(track.bullets) && track.bullets.length > 0,
      `experience.json: track ${track.slug} must include bullets`,
    );
    if (typeof track.relatedProjectSlug === 'string' && track.relatedProjectSlug.length > 0) {
      assert(
        projectSlugSet.has(track.relatedProjectSlug),
        `experience.json: track ${track.slug} references missing project slug ${track.relatedProjectSlug}`,
      );
    }
  }

  if (publishMode) {
    assertPublishReadyLink(
      site.links.email,
      'site.json: replace `links.email` before polished publishing',
    );
    assertPublishReadyLink(
      site.links.github,
      'site.json: replace `links.github` before polished publishing',
    );
    assertPublishReadyLink(
      site.links.linkedin,
      'site.json: replace `links.linkedin` before polished publishing',
    );
    if (site.links.resume) {
      assertPublishReadyLink(
        site.links.resume,
        'site.json: replace `links.resume` before polished publishing',
      );
    }
    assert(
      typeof site.setupNotice !== 'string' || site.setupNotice.trim().length === 0,
      'site.json: clear `setupNotice` before polished publishing',
    );

    for (const project of projects) {
      assert(
        project.stage !== 'template',
        `projects.json: project ${project.slug} is still marked as a template stage`,
      );
      assert(
        project.kind !== 'template',
        `projects.json: project ${project.slug} is still using the template project kind`,
      );
      assertNoPlaceholderString(
        project.summary,
        `projects.json: project ${project.slug} still contains placeholder summary text`,
      );
      assertOptionalPublishReadyLink(
        project.repositoryUrl,
        `projects.json: project ${project.slug} includes a placeholder repository URL`,
      );
      assertOptionalPublishReadyLink(
        project.referenceUrl,
        `projects.json: project ${project.slug} includes a placeholder reference URL`,
      );
      if (project.kind === 'live-demo') {
        assertPublishReadyLink(
          project.demoUrl,
          `projects.json: live-demo project ${project.slug} must use a real demo URL before polished publishing`,
        );
      } else {
        assertOptionalPublishReadyLink(
          project.demoUrl,
          `projects.json: project ${project.slug} includes a placeholder demo URL`,
        );
      }
    }
  }

  console.log(
    publishMode
      ? 'Content validation passed for polished publishing.'
      : 'Content validation passed.',
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
