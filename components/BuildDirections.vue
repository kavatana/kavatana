<template>
  <section class="build-directions">
    <h2 class="directions-title">What I'm building toward</h2>
    <p class="directions-subtitle">The work is organized around Cambodia-first products, student ownership, and AI-native engineering discipline.</p>
    <div class="chips-container">
      <div v-for="direction in directions" :key="direction.id" class="direction-chip">
        {{ direction.label }}
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useBuildDirections } from '~/composables/useBuildDirections'
const directions = useBuildDirections()
</script>

<style scoped>
.build-directions {
  padding: var(--space-2xl) 0;
}

.directions-title {
  font-size: var(--text-2xl);
  font-weight: 500;
  color: var(--color-text-primary);
  margin: 0 0 var(--space-xs) 0;
}

.directions-subtitle {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  margin: 0 0 var(--space-lg) 0;
}

.chips-container {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
}

.direction-chip {
  background-color: var(--color-surface-1);
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-sm);
  font-size: var(--text-sm);
}
</style>
