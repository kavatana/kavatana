<template>
  <div class="flagship-card" v-if="project">
    <div class="card-top">
      <div class="card-meta">
        <span class="status-badge" :class="`status-${project.status}`">{{ project.statusLabel || project.status }}</span>
        <span class="meta-year">{{ project.year }}</span>
        <span class="meta-role">{{ project.role }}</span>
      </div>
      <h2 class="project-title">{{ project.title }}</h2>
      <p class="project-tagline">{{ project.tagline }}</p>
      <p class="project-context" v-if="project.context">{{ project.context }}</p>
    </div>

    <div class="card-body">
      <div class="card-left">
        <!-- Problem -->
        <div class="detail-block">
          <h3 class="detail-heading">The problem I explored</h3>
          <p class="detail-text">{{ project.problem }}</p>
        </div>

        <!-- What I built -->
        <div class="detail-block" v-if="project.whatIBuilt?.length">
          <h3 class="detail-heading">What I built</h3>
          <ul class="detail-list">
            <li v-for="item in project.whatIBuilt" :key="item">{{ item }}</li>
          </ul>
        </div>

        <!-- Stack -->
        <div class="detail-block" v-if="project.stack?.length">
          <h3 class="detail-heading">Stack</h3>
          <div class="stack-chips">
            <span v-for="tech in project.stack" :key="tech" class="stack-chip">{{ tech }}</span>
          </div>
        </div>

        <!-- Repo note -->
        <div class="repo-note" v-if="project.repoNote">
          <span class="repo-icon" aria-hidden="true">🔒</span>
          {{ project.repoNote }}
        </div>

        <NuxtLink :to="'/projects/' + project.id" class="case-study-link">
          Full case study &rarr;
        </NuxtLink>
      </div>

      <div class="card-right">
        <!-- Real screenshots if available, else mock UI -->
        <div v-if="hasScreenshots && project.screenshots" class="screenshot-preview">
          <img
            :src="project?.screenshots?.[0]?.src"
            :alt="project?.screenshots?.[0]?.alt"
            class="screenshot-img"
            loading="lazy"
          />
        </div>
        <div v-else class="mock-ui" aria-hidden="true">
          <div class="mock-nav">
            <div class="mock-logo"></div>
            <div class="mock-nav-items">
              <div class="mock-nav-item"></div>
              <div class="mock-nav-item"></div>
            </div>
          </div>
          <div class="mock-search"></div>
          <div class="mock-grid">
            <div class="mock-listing-card" v-for="i in 3" :key="i">
              <div class="mock-image"></div>
              <div class="mock-line mock-title"></div>
              <div class="mock-line mock-price"></div>
            </div>
          </div>
        </div>

        <!-- What I learned -->
        <div class="learned-block" v-if="project.whatILearned?.length">
          <h3 class="learned-heading">What I learned</h3>
          <ul class="learned-list">
            <li v-for="item in project.whatILearned" :key="item">{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProject } from '~/composables/useProject'
const project = useProject('bayonhub')
const hasScreenshots = project?.screenshots && project.screenshots.length > 0
</script>

<style scoped>
.flagship-card {
  background-color: hsla(0, 0%, 10%, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 hsla(30, 20%, 94%, 0.05);
  overflow: hidden;
  margin: var(--space-xl) 0;
  transition: all var(--transition-base);
}
.flagship-card:hover {
  border-color: hsla(28, 80%, 52%, 0.3);
  box-shadow: 0 16px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 hsla(30, 20%, 94%, 0.08);
}

.card-top {
  padding: var(--space-xl);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
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
  background-color: hsl(43, 96%, 65%, 0.15);
}

.status-badge.status-live {
  color: var(--color-success);
  background-color: hsl(142, 71%, 45%, 0.1);
}

.status-badge.status-local-only {
  color: var(--color-text-secondary);
  background-color: var(--color-surface-2);
  border-color: var(--color-border);
}

.meta-year,
.meta-role {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  font-family: var(--font-mono);
}

.meta-role::before {
  content: '·';
  margin-right: var(--space-xs);
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
}

.project-context {
  font-size: var(--text-sm);
  color: var(--color-accent);
  margin: 0;
  padding: var(--space-sm);
  background-color: hsl(217, 91%, 64%, 0.08);
  border-left: 2px solid var(--color-accent);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  line-height: 1.5;
}

/* Body */
.card-body {
  display: flex;
  flex-direction: column;
}

@media (min-width: 1024px) {
  .card-body {
    flex-direction: row;
  }
}

.card-left {
  flex: 0 0 40%;
  padding: var(--space-xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.card-right {
  flex: 0 0 60%;
  background-color: hsla(0, 0%, 8%, 0.4);
  border-left: 1px solid var(--color-border);
  padding: var(--space-xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

@media (max-width: 1023px) {
  .card-right {
    border-left: none;
    border-top: 1px solid var(--color-border);
  }
}

/* Detail blocks */
.detail-block {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.detail-heading {
  font-size: var(--text-xs);
  font-family: var(--font-mono);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0;
}

.detail-text {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0;
}

.detail-list {
  margin: 0;
  padding-left: var(--space-md);
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.detail-list li {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: 1.5;
}

/* Stack */
.stack-chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
}

.stack-chip {
  background-color: var(--color-surface-1);
  border: 1px solid var(--color-border);
  color: var(--color-text-primary);
  padding: 3px 8px;
  border-radius: var(--radius-sm);
  font-size: var(--text-xs);
  font-family: var(--font-mono);
}

/* Repo note */
.repo-note {
  display: flex;
  align-items: flex-start;
  gap: var(--space-xs);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  line-height: 1.5;
  margin-top: var(--space-sm);
}

.repo-icon {
  flex-shrink: 0;
}

.case-study-link {
  margin-top: auto;
  color: var(--color-accent);
  text-decoration: none;
  font-weight: 600;
  font-size: var(--text-sm);
  transition: color var(--transition-fast);
  display: inline-block;
  align-self: flex-start;
}

.case-study-link:hover {
  color: var(--color-accent-hover);
}

/* Screenshots */
.screenshot-preview {
  border-radius: var(--radius-sm);
  overflow: hidden;
  border: 1px solid var(--color-border);
}

.screenshot-img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}

/* What I learned */
.learned-block {
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: var(--space-md);
}

.learned-heading {
  font-size: var(--text-xs);
  font-family: var(--font-mono);
  color: var(--color-accent);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0 0 var(--space-sm) 0;
}

.learned-list {
  margin: 0;
  padding-left: var(--space-md);
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.learned-list li {
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
  line-height: 1.5;
}

/* Mock UI */
.mock-ui {
  width: 100%;
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.mock-nav {
  display: flex;
  justify-content: space-between;
  padding: var(--space-sm);
  border-bottom: 1px solid var(--color-border);
  background-color: var(--color-surface-2);
}

.mock-logo {
  width: 24px;
  height: 12px;
  background-color: var(--color-text-secondary);
  border-radius: var(--radius-sm);
}

.mock-nav-items { display: flex; gap: var(--space-xs); }

.mock-nav-item {
  width: 16px;
  height: 12px;
  background-color: var(--color-border);
  border-radius: var(--radius-sm);
}

.mock-search {
  margin: 0 var(--space-sm);
  height: 24px;
  background-color: var(--color-surface-1);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
}

.mock-grid {
  display: flex;
  gap: var(--space-sm);
  padding: 0 var(--space-sm) var(--space-sm);
}

.mock-listing-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.mock-image {
  height: 60px;
  background-color: var(--color-surface-2);
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
}

.mock-title { height: 8px; width: 80%; background-color: var(--color-text-secondary); border-radius: var(--radius-sm); }
.mock-price { height: 8px; width: 50%; background-color: var(--color-accent); border-radius: var(--radius-sm); }
.mock-line { height: 8px; border-radius: var(--radius-sm); }
</style>
