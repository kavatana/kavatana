<template>
  <NuxtLink :to="'/projects/' + project.id" class="flagship-card" v-if="project">
    <div class="card-image-wrap" v-if="project.coverImage">
      <img :src="project.coverImage" :alt="project.coverImageAlt || project.title" class="card-image" loading="lazy" />
    </div>
    
    <div class="card-content">
      <div class="card-meta">
        <span class="status-badge" :class="`status-${project.status}`">{{ project.statusLabel || project.status }}</span>
        <span class="meta-year">{{ project.year }}</span>
      </div>
      
      <h2 class="project-title">{{ project.title }}</h2>
      <p class="project-tagline">{{ project.tagline }}</p>
      
      <div class="stack-chips" v-if="project.stack?.length">
        <span v-for="tech in project.stack.slice(0, 4)" :key="tech" class="stack-chip">{{ tech }}</span>
        <span v-if="project.stack.length > 4" class="stack-chip">+{{ project.stack.length - 4 }}</span>
      </div>
      
      <div class="card-action">
        <span class="read-more">View Case Study &rarr;</span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Project } from '~/types/content'

defineProps<{
  project: Project
}>()
</script>

<style scoped>
.flagship-card {
  display: flex;
  flex-direction: column;
  background-color: var(--glass-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--glass-shadow);
  overflow: hidden;
  margin: var(--space-xl) 0;
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  text-decoration: none;
  color: inherit;
}

.flagship-card:hover {
  border-color: var(--color-accent);
  box-shadow: var(--glass-shadow-hover);
  transform: translateY(-4px);
}

.card-image-wrap {
  width: 100%;
  aspect-ratio: 16 / 9;
  border-bottom: 1px solid var(--glass-border);
  overflow: hidden;
  background: var(--color-surface-1);
}

@media (max-width: 767px) {
  .card-image-wrap {
    aspect-ratio: 16 / 10;
  }
}

:global([data-theme="light"]) .card-image-wrap {
  border-bottom-color: rgba(0, 0, 0, 0.04);
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
}

.flagship-card:hover .card-image {
  transform: scale(1.05);
}

.card-content {
  padding: var(--space-xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  flex: 1;
}

@media (max-width: 767px) {
  .card-content {
    padding: var(--space-lg) var(--space-md);
  }
}

.card-meta {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  flex-wrap: wrap;
}

.status-badge {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  border: 1px solid transparent;
}

.status-badge.status-in-progress {
  color: hsl(43, 96%, 45%);
  background-color: hsla(43, 96%, 65%, 0.15);
}

.status-badge.status-live {
  color: var(--color-success);
  background-color: hsla(142, 71%, 45%, 0.1);
}

.status-badge.status-local-only {
  color: var(--color-text-secondary);
  background-color: var(--color-surface-2);
  border-color: var(--color-border);
}

.meta-year {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  font-family: var(--font-mono);
}

.project-title {
  font-size: var(--text-3xl);
  color: var(--color-text-primary);
  font-weight: 800;
  margin: 0;
  letter-spacing: -0.02em;
}

.project-tagline {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  margin: 0;
  line-height: 1.5;
}

.stack-chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
  margin-top: var(--space-sm);
}

.stack-chip {
  background-color: var(--color-surface-1);
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  font-size: var(--text-xs);
  font-family: var(--font-mono);
}

.card-action {
  margin-top: auto;
  padding-top: var(--space-lg);
}

.read-more {
  display: inline-flex;
  align-items: center;
  color: var(--color-accent);
  font-weight: 600;
  font-size: var(--text-sm);
  transition: all 0.2s ease;
}

.flagship-card:hover .read-more {
  transform: translateX(4px);
  color: var(--color-accent-hover);
}

@media (min-width: 1024px) {
  .flagship-card {
    flex-direction: row;
    align-items: stretch;
  }
  
  .card-image-wrap {
    flex: 0 0 50%;
    border-bottom: none;
    border-right: 1px solid var(--color-border);
    aspect-ratio: auto; /* let it stretch */
  }
  
  .card-content {
    justify-content: center;
  }
}
</style>
