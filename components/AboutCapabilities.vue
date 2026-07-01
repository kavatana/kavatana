<template>
  <div class="about-capabilities">
    <h2 class="card-heading">What I bring</h2>
    <ul class="capabilities-list">
      <li v-for="item in focusItems" :key="item"><span class="dash">&mdash;</span> {{ item }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useAbout } from '~/composables/useAbout'

const about = useAbout()
const focusItems = about.currentFocus || []
</script>

<style scoped>
.about-capabilities {
  background-color: var(--color-surface-1);
  border: 1px solid var(--color-border);
  padding: var(--space-xl);
  margin: var(--space-xl) 0;
}

.card-heading {
  font-size: var(--text-xl);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-md) 0;
}

.capabilities-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-sm);
}

@media (min-width: 768px) {
  .capabilities-list {
    grid-template-columns: 1fr 1fr;
  }
}

.capabilities-list li {
  color: var(--color-text-primary);
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.dash {
  color: var(--color-accent);
}
</style>
