<template>
  <section class="backend-track" aria-labelledby="backend-track-title">
    <div class="track-head">
      <span class="track-status">{{ track.status }}</span>
      <h2 id="backend-track-title" class="track-title">{{ track.title }}</h2>
      <p class="track-intro">{{ track.intro }}</p>
    </div>

    <ul class="track-list">
      <li v-for="item in track.tracks" :key="item.id" class="track-item">
        <span class="track-area">{{ item.area }}</span>
        <span class="track-detail">{{ item.detail }}</span>
      </li>
    </ul>

    <p class="track-proof">{{ track.proof }}</p>
  </section>
</template>

<script setup lang="ts">
import { useBackendTrack } from '~/composables/useBackendTrack'
const track = useBackendTrack()
</script>

<style scoped>
.backend-track {
  margin: var(--space-2xl) 0 var(--space-xl);
  padding: var(--space-xl);
  background-color: var(--glass-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius);
  box-shadow: var(--glass-shadow);
}

@media (max-width: 767px) {
  .backend-track {
    padding: var(--space-lg) var(--space-md);
  }
}

.track-head {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  max-width: 70ch;
}

.track-status {
  align-self: flex-start;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-accent);
  background-color: hsla(28, 80%, 52%, 0.12);
  border: 1px solid var(--color-border);
}

.track-title {
  font-size: var(--text-2xl);
  font-weight: 800;
  color: var(--color-text-primary);
  margin: 0;
  letter-spacing: -0.02em;
}

@media (min-width: 768px) {
  .track-title {
    font-size: var(--text-3xl);
  }
}

.track-intro {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0;
}

@media (min-width: 768px) {
  .track-intro {
    font-size: var(--text-lg);
  }
}

.track-list {
  list-style: none;
  margin: var(--space-lg) 0 0;
  padding: 0;
  display: grid;
  gap: var(--space-xs);
}

.track-item {
  display: grid;
  gap: 2px var(--space-lg);
  padding: var(--space-sm) 0;
  border-top: 1px solid var(--color-border);
}

@media (min-width: 768px) {
  .track-item {
    grid-template-columns: minmax(180px, 240px) 1fr;
    align-items: baseline;
  }
}

.track-area {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-primary);
}

.track-detail {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  font-family: var(--font-mono);
  line-height: 1.5;
}

.track-proof {
  margin: var(--space-lg) 0 0;
  padding-top: var(--space-md);
  border-top: 1px solid var(--color-border);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  line-height: 1.6;
  max-width: 75ch;
}
</style>
