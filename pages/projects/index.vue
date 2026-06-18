<template>
  <AppContainer>
    <div class="page-header animate-fade-up">
      <h1 class="page-title">Projects</h1>
      <p class="page-subtitle">What I've built, what I'm working on, and how I think about building.</p>
    </div>
    <div class="projects-list">
      <FlagshipProjectCard 
        v-for="(project, index) in projects" 
        :key="project.id" 
        :project="project"
        class="animate-fade-up"
        :style="{ animationDelay: `${(index + 1) * 100}ms` }"
      />
    </div>
    
    <div class="divider-section animate-fade-up" :style="{ animationDelay: `${(projects.length + 1) * 100}ms` }">
      <div class="divider-line"></div>
      <p class="divider-label">More projects ship here as they're built.</p>
    </div>
    
    <BuildDirections class="animate-fade-up delay-300" />
    
    <CtaBlock 
      class="animate-fade-up delay-400"
      question="Want to build something together?"
      link-label="Let's talk &rarr;"
      link-href="/contact"
    />
  </AppContainer>
</template>

<script setup lang="ts">
import { useProjects } from '~/composables/useProjects'
const projects = useProjects()

useHead({
  title: 'Projects · kavatana',
  meta: [
    { name: 'description', content: 'Selected projects and case studies.' },
    { property: 'og:title', content: 'Projects · kavatana' },
    { property: 'og:description', content: 'Selected projects and case studies.' },
    { property: 'og:url', content: 'https://kavatana.me/projects' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Projects · kavatana' },
    { name: 'twitter:description', content: 'Selected projects and case studies.' }
  ],
  link: [
    { rel: 'canonical', href: 'https://kavatana.me/projects' }
  ]
})
</script>

<style scoped>
.page-header {
  padding: var(--space-2xl) 0 var(--space-xl);
}

.page-title {
  font-size: var(--text-display);
  color: var(--color-text-primary);
  font-weight: 900;
  margin: 0 0 var(--space-sm) 0;
}

.page-subtitle {
  font-size: var(--text-xl);
  color: var(--color-text-secondary);
  margin: 0;
}

.divider-section {
  margin: var(--space-3xl) 0 var(--space-xl);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
}

.divider-line {
  width: 100%;
  height: 1px;
  background-color: var(--color-border);
}

.divider-label {
  color: var(--color-text-muted);
  font-size: var(--text-sm);
  margin: 0;
}
</style>
