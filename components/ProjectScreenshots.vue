<template>
  <section class="project-screenshots" v-if="screenshots && screenshots.length">
    <h2 class="section-title">Screenshots</h2>
    <div class="screenshots-grid">
      <div v-for="(img, idx) in screenshots" :key="idx" class="screenshot-wrapper">
        <img :src="img.src" :alt="img.alt" width="1200" height="630" loading="lazy" class="screenshot-img" />
        <p v-if="img.caption" class="screenshot-caption">{{ img.caption }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Screenshot } from '~/types/content'
defineProps<{
  screenshots?: Screenshot[]
}>()
</script>

<style scoped>
.project-screenshots {
  padding: var(--space-xl) 0;
}

.section-title {
  font-size: var(--text-2xl);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-md) 0;
}

.screenshots-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-lg);
}

@media (min-width: 768px) {
  .screenshots-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.screenshot-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.screenshot-img {
  width: 100%;
  height: auto;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  background-color: var(--color-surface-2);
}

.screenshot-caption {
  color: var(--color-text-muted);
  font-size: var(--text-sm);
  margin: 0;
  text-align: center;
}
</style>
