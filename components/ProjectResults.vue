<template>
  <section class="project-results" v-if="results && results.length">
    <h2 class="section-title">What It Demonstrates</h2>
    <ul class="results-list">
      <li v-for="(item, idx) in results" :key="idx" class="result-item">
        <span class="marker"></span>
        <span class="text">{{ item }}</span>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  results: string[]
}>()
</script>

<style scoped>
.project-results {
  padding: var(--space-xl) 0;
}

.section-title {
  font-size: var(--text-2xl);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-md) 0;
}

.results-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.result-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-sm);
}

.marker {
  width: 8px;
  height: 8px;
  background-color: var(--color-accent);
  margin-top: 8px;
  flex-shrink: 0;
}

.text {
  color: var(--color-text-primary);
  font-size: var(--text-lg);
  line-height: 1.5;
}
</style>
