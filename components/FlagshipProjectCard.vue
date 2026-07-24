<template>
  <article class="flagship-card" v-if="project">
    <div class="card-meta">
      <span class="status-badge" :class="`status-${project.status}`">{{ project.statusLabel || project.status }}</span>
      <span class="meta-year">{{ project.year }}{{ project.endYear ? '–' + project.endYear : '' }}</span>
      <span class="meta-role" v-if="project.role">{{ project.role }}</span>
    </div>

    <h2 class="project-title">
      <NuxtLink :to="'/projects/' + project.id" class="card-link">{{ project.title }}</NuxtLink>
    </h2>

    <p class="card-summary">{{ project.cardSummary || project.tagline }}</p>

    <div class="card-block proof" v-if="project.proofPoints && project.proofPoints.length">
      <span class="block-label">Proof</span>
      <ul class="proof-list">
        <li v-for="point in project.proofPoints.slice(0, 3)" :key="point">
          <span class="proof-mark" aria-hidden="true"></span>{{ point }}
        </li>
      </ul>
    </div>

    <div class="card-block deployment" v-if="project.deploymentLine">
      <span class="block-label">Deployment</span>
      <span class="deploy-text">
        <span
          v-if="project.deployment?.status"
          class="deploy-dot"
          :class="`deploy-${project.deployment.status}`"
          aria-hidden="true"
        ></span>{{ project.deploymentLine }}
      </span>
    </div>

    <div class="card-action">
      <div class="stack-chips" v-if="project.stack?.length">
        <span v-for="tech in project.stack.slice(0, 5)" :key="tech" class="stack-chip">{{ tech }}</span>
        <span v-if="project.stack.length > 5" class="stack-chip stack-chip-more">+{{ project.stack.length - 5 }}</span>
      </div>
      <span class="read-more">View case study &rarr;</span>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Project } from '~/types/content'

defineProps<{
  project: Project
}>()
</script>

<style scoped>
.flagship-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  background-color: var(--glass-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius);
  box-shadow: var(--glass-shadow);
  padding: var(--space-lg) var(--space-xl);
  transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
  color: inherit;
}

.flagship-card:hover {
  border-color: var(--color-accent);
  box-shadow: var(--glass-shadow-hover);
  transform: translateY(-3px);
}

@media (max-width: 767px) {
  .flagship-card {
    padding: var(--space-lg) var(--space-md);
  }
}

/* Whole card is clickable via an overlay on the title link */
.card-link {
  display: inline-flex;
  align-items: center;
  min-height: var(--target-min-size);
  text-decoration: none;
  color: inherit;
}

.card-link::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
  border-radius: var(--radius);
}

.card-meta {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  flex-wrap: wrap;
}

.status-badge {
  padding: 4px 10px;
  border-radius: 999px;
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

.status-badge.status-local-only,
.status-badge.status-archived,
.status-badge.status-concept {
  color: var(--color-text-secondary);
  background-color: var(--color-surface-2);
  border-color: var(--color-border);
}

.meta-year {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  font-family: var(--font-mono);
}

.meta-role {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  padding-left: var(--space-sm);
  border-left: 1px solid var(--color-border);
  line-height: 1.3;
}

.project-title {
  font-size: var(--text-2xl);
  color: var(--color-text-primary);
  font-weight: 800;
  margin: 0;
  letter-spacing: -0.02em;
}

@media (min-width: 768px) {
  .project-title {
    font-size: var(--text-3xl);
  }
}

.card-summary {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  margin: 0;
  line-height: 1.6;
  max-width: 70ch;
}

@media (min-width: 768px) {
  .card-summary {
    font-size: var(--text-lg);
  }
}

.card-block {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.block-label {
  font-size: var(--text-xs);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-text-muted);
}

.proof-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.proof-list li {
  position: relative;
  display: flex;
  align-items: baseline;
  gap: var(--space-sm);
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: 1.5;
}

.proof-mark {
  flex: 0 0 auto;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--color-accent);
  transform: translateY(-2px);
}

.deploy-text {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: 1.5;
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

.card-action {
  position: relative;
  z-index: 2;
  margin-top: var(--space-xs);
  padding-top: var(--space-md);
  border-top: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-md);
  flex-wrap: wrap;
}

.stack-chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
}

.stack-chip {
  background-color: var(--color-surface-1);
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  padding: 3px 9px;
  border-radius: var(--radius-sm);
  font-size: var(--text-xs);
  font-family: var(--font-mono);
}

.stack-chip-more {
  color: var(--color-text-muted);
}

.read-more {
  display: inline-flex;
  align-items: center;
  color: var(--color-accent);
  font-weight: 600;
  font-size: var(--text-sm);
  white-space: nowrap;
  transition: transform 0.2s ease, color 0.2s ease;
}

.flagship-card:hover .read-more {
  transform: translateX(4px);
  color: var(--color-accent-hover);
}
</style>
