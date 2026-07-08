<template>
  <section class="what-im-learning">
    <div class="section-header">
      <span class="section-label">Learning log</span>
      <h2 class="section-title">What I'm learning</h2>
      <p class="section-desc">
        I am still early in school, but the learning loop is practical: build, verify, document, and improve.
      </p>
    </div>
    <div class="learning-grid">
      <div v-for="category in learning" :key="category.id" class="learning-card">
        <h3 class="category-title">{{ category.category }}</h3>
        <ul class="item-list">
          <li v-for="item in category.items" :key="item" class="item">
            <span class="item-dot" aria-hidden="true">—</span>
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useLearning } from '~/composables/useLearning'
const learning = useLearning()
</script>

<style scoped>
.what-im-learning {
  padding: var(--space-2xl) 0;
  border-top: 1px solid var(--color-border);
}

.section-header {
  margin-bottom: var(--space-xl);
  max-width: 600px;
}

.section-label {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-accent);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: var(--space-xs);
}

.section-title {
  font-size: var(--text-2xl);
  color: var(--color-text-primary);
  font-weight: 600;
  margin: 0 0 var(--space-xs) 0;
}

.section-desc {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  margin: 0;
  line-height: 1.6;
}

.learning-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-md);
}

@media (min-width: 640px) {
  .learning-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .learning-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.learning-card {
  background-color: var(--color-surface-1);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: var(--space-md);
}

.category-title {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0 0 var(--space-sm) 0;
  font-family: var(--font-mono);
}

.item-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.item {
  display: flex;
  align-items: baseline;
  gap: var(--space-xs);
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
  line-height: 1.5;
}

.item-dot {
  color: var(--color-accent);
  flex-shrink: 0;
  font-size: var(--text-xs);
}
</style>
