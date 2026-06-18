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
      
      <div class="cover-image-wrapper" v-if="project.coverImage">
        <img :src="project.coverImage" :alt="project.coverImageAlt" class="cover-image" width="1200" height="630" fetchpriority="high" />
      </div>
      
      <section class="prose-section">
        <h2 class="section-title">Problem</h2>
        <p class="prose-text">{{ project.problem }}</p>
      </section>
      
      <section class="prose-section" v-if="project.constraints && project.constraints.length">
        <h2 class="section-title">Constraints</h2>
        <ul class="dash-list">
          <li v-for="constraint in project.constraints" :key="constraint"><span class="dash">&mdash;</span> {{ constraint }}</li>
        </ul>
      </section>
      
      <section class="prose-section">
        <h2 class="section-title">My Role</h2>
        <p class="prose-text">{{ project.myRole }}</p>
      </section>
      
      <ProjectStack :stack="project.stack" v-if="project.stack && project.stack.length > 0" />
      
      <section class="prose-section">
        <h2 class="section-title">Solution</h2>
        <p class="prose-text">{{ project.solution }}</p>
      </section>
      
      <div class="callout-block" v-if="project.callout">
        <p class="callout-text">{{ project.callout }}</p>
      </div>
      
      <ProjectScreenshots :screenshots="project.screenshots" v-if="project.screenshots && project.screenshots.length > 0" />
      
      <section class="prose-section" v-if="project.tradeoffs && project.tradeoffs.length">
        <h2 class="section-title">Tradeoffs</h2>
        <ul class="dash-list">
          <li v-for="tradeoff in project.tradeoffs" :key="tradeoff"><span class="dash">&mdash;</span> {{ tradeoff }}</li>
        </ul>
      </section>
      
      <ProjectResults :results="project.results" v-if="project.results && project.results.length > 0" />
      
      <section class="prose-section" v-if="project.nextSteps && project.nextSteps.length">
        <h2 class="section-title">Next Steps</h2>
        <p class="prose-text" v-for="step in project.nextSteps" :key="step">{{ step }}</p>
      </section>
      
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

useHead({
  title: `${project.title} · kavatana`,
  meta: [
    { name: 'description', content: project.tagline },
    { property: 'og:title', content: `${project.title} · kavatana` },
    { property: 'og:description', content: project.tagline },
    { property: 'og:image', content: project.coverImage },
    { property: 'og:url', content: `https://kavatana.me/projects/${slug}` },
    { property: 'og:type', content: 'article' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: `${project.title} · kavatana` },
    { name: 'twitter:description', content: project.tagline },
    { name: 'twitter:image', content: project.coverImage }
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
.cover-image-wrapper {
  margin: var(--space-xl) 0 var(--space-2xl);
  border-radius: var(--radius);
  overflow: hidden;
  border: 1px solid var(--color-border);
}

.cover-image {
  width: 100%;
  height: auto;
  display: block;
}

.prose-section {
  padding: var(--space-xl) 0;
}

.section-title {
  font-size: var(--text-2xl);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-md) 0;
}

.prose-text {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0;
}

.dash-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.dash-list li {
  color: var(--color-text-secondary);
  font-size: var(--text-lg);
  display: flex;
  gap: var(--space-xs);
}

.dash {
  color: var(--color-accent);
}

.callout-block {
  background-color: var(--color-surface-2);
  border-left: 3px solid var(--color-accent);
  padding: var(--space-lg);
  margin: var(--space-xl) 0;
  border-radius: 0 var(--radius) var(--radius) 0;
}

.callout-text {
  color: var(--color-text-primary);
  font-size: var(--text-lg);
  font-style: italic;
  margin: 0;
}

.back-link-wrapper {
  padding: 0 0 var(--space-3xl) 0;
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
