<template>
  <section class="capabilities-section">
    <h2 class="section-title">What I build across</h2>
    <div class="capabilities-grid">
      <CapabilityCard 
        v-for="group in capabilities" 
        :key="group.id" 
        :capability="group" 
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useCapabilities } from '~/composables/useCapabilities'
const capabilities = useCapabilities()
</script>

<style scoped>
.capabilities-section {
  padding: var(--space-2xl) 0;
}

.section-title {
  font-size: var(--text-2xl);
  font-weight: 500;
  color: var(--color-text-primary);
  margin-bottom: var(--space-xl);
  margin-top: 0;
}

.capabilities-grid {
  display: grid;
  gap: var(--space-md);
  grid-template-columns: 1fr;
}

@media (min-width: 1024px) {
  .capabilities-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
