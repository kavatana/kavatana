<template>
  <AppContainer>
    <div v-if="project.id === 'bayonhub'">
      <div class="back-link-wrapper bayonhub-back">
        <NuxtLink to="/projects" class="back-link">&larr; Back to Projects</NuxtLink>
      </div>
      <BayonHubCaseStudy :project="project" />
    </div>

    <div v-else>
      <ProjectHero :project="project" />

      <section class="prose-section proves-section" v-if="project.whatThisProves || project.callout">
        <h2 class="section-title">What this proves</h2>
        <p class="prose-lead">{{ project.whatThisProves || project.callout }}</p>
      </section>

      <section class="prose-section">
        <h2 class="section-title">Problem</h2>
        <p class="prose-text">{{ project.problem }}</p>
      </section>

      <section class="prose-section" v-if="project.myRole">
        <h2 class="section-title">My role</h2>
        <p class="prose-text">{{ project.myRole }}</p>
      </section>

      <section class="prose-section" v-if="project.whatIBuilt && project.whatIBuilt.length">
        <h2 class="section-title">What I built</h2>
        <ul class="dash-list">
          <li v-for="item in project.whatIBuilt" :key="item"><span class="dash">&mdash;</span> {{ item }}</li>
        </ul>
      </section>

      <section class="prose-section" v-if="project.architectureNote || project.solution">
        <h2 class="section-title">Architecture</h2>
        <p class="prose-text" v-if="project.architectureNote">{{ project.architectureNote }}</p>
        <p class="prose-text prose-text-muted" v-if="project.solution">{{ project.solution }}</p>
      </section>

      <section
        class="prose-section"
        v-if="project.deployment || project.deploymentLine || (project.backendProof && project.backendProof.length)"
      >
        <h2 class="section-title">Backend / deployment</h2>

        <div class="deploy-panel">
          <dl class="deploy-grid" v-if="project.deployment">
            <div class="deploy-row" v-if="project.deployment.status">
              <dt class="deploy-key">Status</dt>
              <dd class="deploy-val">
                <span class="deploy-dot" :class="`deploy-${project.deployment.status}`" aria-hidden="true"></span>
                {{ statusLabels[project.deployment.status] || project.deployment.status }}
              </dd>
            </div>
            <div class="deploy-row" v-if="project.deployment.frontend">
              <dt class="deploy-key">Frontend</dt>
              <dd class="deploy-val">{{ project.deployment.frontend }}</dd>
            </div>
            <div class="deploy-row" v-if="project.deployment.backend">
              <dt class="deploy-key">Backend</dt>
              <dd class="deploy-val">{{ project.deployment.backend }}</dd>
            </div>
            <div class="deploy-row" v-if="project.deployment.database">
              <dt class="deploy-key">Database</dt>
              <dd class="deploy-val">{{ project.deployment.database }}</dd>
            </div>
            <div class="deploy-row" v-if="project.deployment.hosting">
              <dt class="deploy-key">Hosting</dt>
              <dd class="deploy-val">{{ project.deployment.hosting }}</dd>
            </div>
          </dl>
          <p class="deploy-line" v-if="project.deploymentLine">{{ project.deploymentLine }}</p>
        </div>

        <div class="backend-proof" v-if="project.backendProof && project.backendProof.length">
          <h3 class="subhead">Backend-adjacent proof</h3>
          <ul class="dash-list">
            <li v-for="item in project.backendProof" :key="item"><span class="dash">&mdash;</span> {{ item }}</li>
          </ul>
        </div>
      </section>

      <ProjectStack :stack="project.stack" v-if="project.stack && project.stack.length > 0" />

      <section class="prose-section" v-if="project.constraints && project.constraints.length">
        <h2 class="section-title">Constraints</h2>
        <ul class="dash-list">
          <li v-for="constraint in project.constraints" :key="constraint"><span class="dash">&mdash;</span> {{ constraint }}</li>
        </ul>
      </section>

      <section class="prose-section" v-if="project.tradeoffs && project.tradeoffs.length">
        <h2 class="section-title">Tradeoffs</h2>
        <ul class="dash-list">
          <li v-for="tradeoff in project.tradeoffs" :key="tradeoff"><span class="dash">&mdash;</span> {{ tradeoff }}</li>
        </ul>
      </section>

      <ProjectResults :results="project.results" v-if="project.results && project.results.length > 0" />

      <section class="prose-section" v-if="project.whatILearned && project.whatILearned.length">
        <h2 class="section-title">What I learned</h2>
        <ul class="dash-list">
          <li v-for="item in project.whatILearned" :key="item"><span class="dash">&mdash;</span> {{ item }}</li>
        </ul>
      </section>

      <section class="prose-section" v-if="project.nextBackendStep">
        <h2 class="section-title">Next backend step</h2>
        <p class="prose-text">{{ project.nextBackendStep }}</p>
      </section>

      <section class="prose-section" v-if="project.nextSteps && project.nextSteps.length">
        <h2 class="section-title">Next steps</h2>
        <ul class="dash-list">
          <li v-for="step in project.nextSteps" :key="step"><span class="dash">&mdash;</span> {{ step }}</li>
        </ul>
      </section>

      <div class="repo-note" v-if="project.repoNote">
        <span class="repo-icon" aria-hidden="true">&#10003;</span>
        <span>{{ project.repoNote }}</span>
      </div>

      <ProjectScreenshots
        :screenshots="project.screenshots"
        title="Visual archive"
        v-if="project.screenshots && project.screenshots.length > 0"
      />

      <CtaBlock
        question="Working on something similar?"
        link-label="Let's talk &rarr;"
        link-href="/contact"
      />

      <div class="back-link-wrapper">
        <NuxtLink to="/projects" class="back-link">&larr; Back to Projects</NuxtLink>
      </div>
    </div>
  </AppContainer>
</template>

<script setup lang="ts">
import { useRoute, createError, useHead } from '#imports'
import { useProject } from '~/composables/useProject'

const route = useRoute()
const slug = route.params.slug as string
const project = useProject(slug) as import('~/types/content').Project

if (!project) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found' })
}

const statusLabels: Record<string, string> = {
  deployed: 'Deployed',
  demo: 'Live demo',
  planned: 'Planned',
  'local-only': 'Local-only'
}

useHead({
  title: `${project.title} · kavatana`,
  meta: [
    { name: 'description', content: project.tagline },
    { property: 'og:title', content: `${project.title} · kavatana` },
    { property: 'og:description', content: project.tagline },
    { property: 'og:image', content: project.coverImage || '/images/og-default.png' },
    { property: 'og:url', content: `https://kavatana.me/projects/${slug}` },
    { property: 'og:type', content: 'article' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: `${project.title} · kavatana` },
    { name: 'twitter:description', content: project.tagline },
    { name: 'twitter:image', content: project.coverImage || '/images/og-default.png' }
  ],
  link: [
    { rel: 'canonical', href: `https://kavatana.me/projects/${slug}` }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": project.title,
        "description": project.tagline,
        "url": project.liveUrl || `https://kavatana.me/projects/${slug}`,
        "applicationCategory": "WebApplication",
        "author": {
          "@type": "Person",
          "name": "kavatana"
        }
      })
    }
  ]
})
</script>

<style scoped>
.prose-section {
  padding: var(--space-xl) 0;
  border-top: 1px solid var(--color-border);
}

.prose-section:first-of-type {
  border-top: none;
}

.section-title {
  font-size: var(--text-2xl);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-md) 0;
}

.prose-text {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin: 0;
  max-width: 75ch;
}

.prose-text + .prose-text {
  margin-top: var(--space-md);
}

.prose-text-muted {
  color: var(--color-text-muted);
}

/* What this proves — prominent lead statement */
.proves-section {
  border-top: none;
}

.prose-lead {
  font-size: var(--text-xl);
  color: var(--color-text-primary);
  line-height: 1.6;
  margin: 0;
  max-width: 70ch;
  padding-left: var(--space-md);
  border-left: 3px solid var(--color-accent);
}

.dash-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  max-width: 78ch;
}

.dash-list li {
  color: var(--color-text-secondary);
  font-size: var(--text-lg);
  line-height: 1.6;
  display: flex;
  gap: var(--space-sm);
}

.dash {
  color: var(--color-accent);
  flex: 0 0 auto;
}

/* Backend / deployment panel */
.deploy-panel {
  background-color: var(--color-surface-1);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: var(--space-lg);
}

.deploy-grid {
  margin: 0;
  display: grid;
  gap: var(--space-sm);
}

.deploy-row {
  display: grid;
  gap: 2px var(--space-lg);
  padding-bottom: var(--space-sm);
  border-bottom: 1px solid var(--color-border);
}

.deploy-row:last-child {
  padding-bottom: 0;
  border-bottom: none;
}

@media (min-width: 640px) {
  .deploy-row {
    grid-template-columns: 120px 1fr;
    align-items: baseline;
  }
}

.deploy-key {
  margin: 0;
  font-size: var(--text-xs);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text-muted);
}

.deploy-val {
  margin: 0;
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: 1.5;
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.deploy-dot {
  flex: 0 0 auto;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--color-text-muted);
}

.deploy-dot.deploy-deployed { background-color: var(--color-success); }
.deploy-dot.deploy-demo { background-color: var(--color-accent); }
.deploy-dot.deploy-planned { background-color: hsl(43, 96%, 55%); }
.deploy-dot.deploy-local-only { background-color: var(--color-text-muted); }

.deploy-line {
  margin: var(--space-md) 0 0;
  padding-top: var(--space-md);
  border-top: 1px dashed var(--color-border);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.backend-proof {
  margin-top: var(--space-lg);
}

.subhead {
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 var(--space-sm) 0;
}

.repo-note {
  display: flex;
  align-items: flex-start;
  gap: var(--space-sm);
  margin: var(--space-xl) 0;
  padding: var(--space-md) var(--space-lg);
  background-color: var(--color-surface-2);
  border-radius: var(--radius);
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  line-height: 1.6;
}

.repo-icon {
  color: var(--color-success);
  font-weight: 700;
  flex: 0 0 auto;
}

.back-link-wrapper {
  padding: var(--space-xl) 0 var(--space-3xl) 0;
  display: flex;
  justify-content: center;
}

.back-link {
  color: var(--color-text-muted);
  text-decoration: none;
  font-size: var(--text-base);
  transition: color var(--transition-fast);
}

.back-link:hover {
  color: var(--color-text-primary);
}

.bayonhub-back {
  padding: var(--space-xl) 0 0 0;
  justify-content: flex-start;
}
</style>
