<template>
  <section class="project-stack">
    <h2 class="section-title">Stack</h2>
    <div class="stack-chips">
      <span v-for="tech in stack" :key="tech" class="stack-chip">{{ tech }}</span>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  stack: string[]
}>()
</script>

<style scoped>
.project-stack {
  padding: var(--space-xl) 0;
}

.section-title {
  font-size: var(--text-2xl);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-md) 0;
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
  font-size: var(--text-sm);
}
</style>
