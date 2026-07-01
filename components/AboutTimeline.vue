<template>
  <section class="about-timeline">
    <h2 class="section-heading">Experience & Timeline</h2>
    <ol class="timeline-list">
      <li v-for="entry in timeline" :key="entry.id" class="timeline-item">
        <div class="timeline-year">
          {{ entry.period || `${entry.startYear}${entry.endYear ? '–' + entry.endYear : ''}` }}
        </div>
        <div class="timeline-content">
          <h3 class="role-title">{{ entry.title }}</h3>
          <p class="role-org" v-if="entry.organization">{{ entry.organization }}</p>
          <p class="role-desc">{{ entry.description }}</p>
        </div>
      </li>
    </ol>
  </section>
</template>

<script setup lang="ts">
import { useTimeline } from '~/composables/useTimeline'
const timeline = useTimeline()
</script>

<style scoped>
.about-timeline {
  padding: var(--space-2xl) 0;
}

.section-heading {
  font-size: var(--text-2xl);
  color: var(--color-text-primary);
  margin-bottom: var(--space-xl);
  margin-top: 0;
}

.timeline-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
}

.timeline-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  padding-bottom: var(--space-xl);
  position: relative;
}

@media (min-width: 768px) {
  .timeline-item {
    flex-direction: row;
    gap: var(--space-xl);
  }
}

.timeline-year {
  color: var(--color-text-muted);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  flex: 0 0 120px;
}

.timeline-content {
  flex: 1;
  padding-left: var(--space-md);
  border-left: 1px solid var(--color-border);
}

@media (min-width: 768px) {
  .timeline-content {
    padding-left: var(--space-xl);
  }
}

.role-title {
  color: var(--color-text-primary);
  font-size: var(--text-lg);
  font-weight: 500;
  margin: 0 0 6px 0;
}

.role-org {
  color: var(--color-accent);
  font-size: var(--text-sm);
  font-weight: 600;
  margin: 0 0 var(--space-xs) 0;
}

.role-desc {
  color: var(--color-text-secondary);
  font-size: var(--text-base);
  margin: 0;
  line-height: 1.5;
}
</style>
