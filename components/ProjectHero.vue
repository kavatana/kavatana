<template>
  <section class="project-hero">
    <h1 class="project-title">{{ project.title }}</h1>
    <p class="project-tagline">{{ project.tagline }}</p>
    
    <div class="meta-row">
      <div class="meta-chips">
        <span class="meta-chip">{{ project.year }}{{ project.endYear ? '–' + project.endYear : '' }}</span>
        <span class="meta-chip">{{ project.role }}</span>
        <span class="status-badge" v-if="project.status === 'in-progress'">In Progress</span>
      </div>
      
      <div class="action-links">
        <a v-if="project.liveUrl" :href="project.liveUrl" target="_blank" rel="noopener noreferrer" class="btn-live">
          Visit Product &nearr;
        </a>
        <a v-if="project.githubUrl" :href="project.githubUrl" target="_blank" rel="noopener noreferrer" class="btn-repo" aria-label="GitHub Repository">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.45-1.16-1.1-1.47-1.1-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Project } from '~/types/content'
defineProps<{
  project: Project
}>()
</script>

<style scoped>
.project-hero {
  padding: var(--space-3xl) 0 var(--space-xl);
}

.project-title {
  font-size: var(--text-display);
  font-weight: 900;
  color: var(--color-text-primary);
  margin: 0 0 var(--space-sm) 0;
}

.project-tagline {
  font-size: var(--text-xl);
  color: var(--color-text-secondary);
  margin: 0 0 var(--space-xl) 0;
  max-width: 800px;
}

.meta-row {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

@media (min-width: 768px) {
  .meta-row {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.meta-chips {
  display: flex;
  gap: var(--space-sm);
  flex-wrap: wrap;
  align-items: center;
}

.meta-chip {
  background-color: var(--color-surface-1);
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-sm);
  font-size: var(--text-sm);
}

.status-badge {
  border: 1px solid var(--color-accent);
  color: var(--color-text-primary);
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-sm);
  font-size: var(--text-xs);
  text-transform: uppercase;
}

.action-links {
  display: flex;
  gap: var(--space-md);
  align-items: center;
}

.btn-live {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: var(--target-min-size);
  background-color: transparent;
  border: 1px solid var(--color-accent);
  color: var(--color-accent);
  padding: var(--space-xs) var(--space-md);
  border-radius: var(--radius-sm);
  text-decoration: none;
  font-weight: 500;
  font-size: var(--text-sm);
  transition: all var(--transition-fast);
}

.btn-live:hover {
  background-color: var(--color-accent);
  color: var(--color-bg);
}

.btn-repo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: var(--target-min-size);
  min-height: var(--target-min-size);
  color: var(--color-text-secondary);
  transition: color var(--transition-fast);
}

.btn-repo:hover {
  color: var(--color-text-primary);
}
</style>
