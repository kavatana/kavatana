<template>
  <div class="capability-card">
    <h3 class="capability-title">{{ capability.title }}</h3>
    <p class="capability-desc">{{ capability.description }}</p>
    <ul class="capability-items">
      <li v-for="item in capability.items" :key="item">{{ item }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { CapabilityGroup } from '~/types/content'
defineProps<{
  capability: CapabilityGroup
}>()
</script>

<style scoped>
.capability-card {
  background-color: var(--color-surface-1);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: var(--space-lg);
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.capability-title {
  color: var(--color-text-primary);
  font-size: var(--text-xl);
  font-weight: 600;
  margin: 0;
}

.capability-desc {
  color: var(--color-text-secondary);
  font-size: var(--text-base);
  margin: 0 0 var(--space-sm) 0;
}

.capability-items {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.capability-items li {
  color: var(--color-text-muted);
  font-size: var(--text-sm);
}
</style>
