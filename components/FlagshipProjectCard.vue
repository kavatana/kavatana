<template>
  <div class="flagship-card" v-if="project">
    <div class="card-content">
      <div class="card-left">
        <h2 class="project-title">{{ project.title }}</h2>
        <p class="project-tagline">{{ project.tagline }}</p>
        
        <div class="status-chip" v-if="project.status === 'in-progress'">
          In Progress
        </div>
        
        <div class="meta-row">
          <span>{{ project.year }}{{ project.endYear ? '–' + project.endYear : '' }}</span>
          <span>·</span>
          <span>{{ project.role }}</span>
        </div>
        
        <div class="stack-chips">
          <span v-for="tech in project.stack" :key="tech" class="stack-chip">{{ tech }}</span>
        </div>
        
        <NuxtLink :to="'/projects/' + project.id" class="case-study-link" aria-label="View BayonHub case study">
          View full case study &rarr;
        </NuxtLink>
      </div>
      
      <div class="card-right">
        <!-- Mock UI Preview -->
        <div class="mock-ui" aria-hidden="true">
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProject } from '~/composables/useProject'
const project = useProject('bayonhub')
</script>

<style scoped>
.flagship-card {
  background-color: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  box-shadow: -3px 0 0 0 var(--color-accent);
  overflow: hidden;
  margin: var(--space-xl) 0;
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}

.flagship-card:hover {
  transform: translateY(-2px);
  box-shadow: -3px 0 0 0 var(--color-accent-hover), 0 4px 12px rgba(0, 0, 0, 0.2);
}

.card-content {
  display: flex;
  flex-direction: column;
}

@media (min-width: 1024px) {
  .card-content {
    flex-direction: row;
  }
}

.card-left {
  flex: 1;
  padding: var(--space-xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.card-right {
  flex: 1;
  background-color: var(--color-surface-1);
  border-left: 1px solid var(--color-border);
  padding: var(--space-xl);
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 1023px) {
  .card-right {
    border-left: none;
    border-top: 1px solid var(--color-border);
  }
}

.project-title {
  font-size: var(--text-3xl);
  color: var(--color-text-primary);
  font-weight: 800;
  margin: 0;
}

.project-tagline {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  margin: 0;
}

.status-chip {
  align-self: flex-start;
  border: 1px solid var(--color-accent);
  color: var(--color-text-primary);
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-sm);
  font-size: var(--text-xs);
  text-transform: uppercase;
}

.meta-row {
  display: flex;
  gap: var(--space-sm);
  color: var(--color-text-muted);
  font-size: var(--text-sm);
}

.stack-chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
}

.stack-chip {
  background-color: var(--color-surface-1);
  border: 1px solid var(--color-border);
  color: var(--color-text-primary);
  padding: 4px 8px;
  border-radius: var(--radius-sm);
  font-size: var(--text-xs);
}

.case-study-link {
  margin-top: auto;
  color: var(--color-accent);
  text-decoration: none;
  font-weight: 600;
  font-size: var(--text-base);
  transition: color var(--transition-fast);
  display: inline-block;
  padding-top: var(--space-sm);
}

.case-study-link:hover {
  color: var(--color-accent-hover);
}

/* Mock UI Preview */
.mock-ui {
  width: 100%;
  max-width: 400px;
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

.mock-nav-items {
  display: flex;
  gap: var(--space-xs);
}

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

.mock-title {
  height: 8px;
  width: 80%;
  background-color: var(--color-text-secondary);
  border-radius: var(--radius-sm);
}

.mock-price {
  height: 8px;
  width: 50%;
  background-color: var(--color-accent);
  border-radius: var(--radius-sm);
}
</style>
