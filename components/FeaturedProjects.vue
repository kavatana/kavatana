<template>
  <section class="selected-work" id="work" aria-labelledby="work-title">
    <div class="work-header">
      <span class="section-label">Selected Work</span>
      <h2 id="work-title" class="section-title">Projects</h2>
      <p class="section-desc">Products I designed and built end to end — each one live and explorable.</p>
    </div>

    <div class="work-grid">
      <article v-for="p in projects" :key="p.id" class="work-card">
        <NuxtLink :to="`/projects/${p.id}`" class="card-link" :aria-label="`View case study: ${p.title}`" />

        <div class="card-thumb" v-if="p.coverImage">
          <img :src="p.coverImage" :alt="p.coverImageAlt || p.title" loading="lazy" width="640" height="360" />
        </div>

        <div class="card-body">
          <div class="card-meta">
            <span class="status-badge" :class="`status-${p.status}`">{{ p.statusLabel || p.status }}</span>
            <span class="card-year">{{ p.year }}</span>
          </div>
          <h3 class="card-title">{{ p.title }}</h3>
          <p class="card-tagline">{{ p.tagline }}</p>
          <div class="card-chips" v-if="p.stack?.length">
            <span v-for="t in p.stack.slice(0, 3)" :key="t" class="chip">{{ t }}</span>
            <span v-if="p.stack.length > 3" class="chip">+{{ p.stack.length - 3 }}</span>
          </div>
          <span class="card-cta">View case study &rarr;</span>
        </div>
      </article>
    </div>

    <NuxtLink to="/projects" class="view-all">View all projects &rarr;</NuxtLink>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Project } from '~/types/content'
import { useProjects } from '~/composables/useProjects'

const projects = computed<Project[]>(() =>
  useProjects()
    .filter((p) => p.featuredOrder !== undefined)
    .sort((a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99))
)
</script>

<style scoped>
.selected-work {
  padding: var(--space-2xl) 0;
  border-top: 1px solid var(--color-border);
}

.work-header {
  margin-bottom: var(--space-xl);
}

.section-label {
  display: block;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: var(--space-xs);
}

.section-title {
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 var(--space-sm);
}

.section-desc {
  color: var(--color-text-secondary);
  margin: 0;
  max-width: 52ch;
}

.work-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-lg);
}

@media (min-width: 768px) {
  .work-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.work-card {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: var(--glass-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  overflow: hidden;
  transition: transform var(--transition-base), border-color var(--transition-base), box-shadow var(--transition-base);
}

.work-card:hover {
  transform: translateY(-4px);
  border-color: var(--color-accent);
  box-shadow: var(--glass-shadow-hover);
}

.card-link {
  position: absolute;
  inset: 0;
  z-index: 2;
}

.card-thumb {
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background-color: var(--glass-bg);
  border-bottom: 1px solid var(--color-border);
}

.card-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  padding: var(--space-lg);
  flex: 1;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.status-badge {
  font-size: var(--text-xs);
  font-family: var(--font-mono);
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
}

.card-year {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.card-title {
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0;
}

.card-tagline {
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  line-height: 1.55;
  margin: 0;
}

.card-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: auto;
  position: relative;
  z-index: 1;
  pointer-events: none;
}

.chip {
  font-size: var(--text-xs);
  font-family: var(--font-mono);
  padding: 0.2rem 0.5rem;
  border-radius: var(--radius-sm);
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
}

.card-cta {
  color: var(--color-accent);
  font-weight: 600;
  font-size: var(--text-sm);
  margin-top: var(--space-xs);
}

.view-all {
  display: inline-block;
  margin-top: var(--space-xl);
  color: var(--color-accent);
  font-weight: 600;
  text-decoration: none;
}

.view-all:hover {
  text-decoration: underline;
}
</style>
