<template>
  <section class="startup-portfolio" aria-labelledby="startup-portfolio-title">
    <div class="section-intro">
      <div>
        <p class="section-kicker">Seven startup tracks</p>
        <h2 id="startup-portfolio-title" class="section-title">Private products, public accountability</h2>
      </div>
      <p class="section-summary">
        Case studies show what has evidence today. The full map also includes private prototypes and
        incubating concepts, labeled by their current public status rather than presented as shipped.
      </p>
    </div>

    <ol class="track-list">
      <li v-for="(track, index) in tracks" :key="track.id" class="track-row">
        <span class="track-index" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
        <div class="track-main">
          <div class="track-heading">
            <h3 class="track-name">{{ track.name }}</h3>
            <span class="track-category">{{ track.category }}</span>
          </div>
          <p class="track-summary">{{ track.summary }}</p>
        </div>
        <div class="track-action">
          <span class="track-status" :class="`status-${track.status}`">{{ track.statusLabel }}</span>
          <NuxtLink v-if="track.href?.startsWith('/')" :to="track.href" class="track-link">
            {{ track.linkLabel }} <span aria-hidden="true">&rarr;</span>
          </NuxtLink>
          <a
            v-else-if="track.href"
            :href="track.href"
            class="track-link"
            target="_blank"
            rel="noreferrer"
          >
            {{ track.linkLabel }} <span aria-hidden="true">&nearr;</span>
          </a>
          <span v-else class="track-private">Private track</span>
        </div>
      </li>
    </ol>
  </section>
</template>

<script setup lang="ts">
import { useStartupPortfolio } from '~/composables/useStartupPortfolio'

const tracks = useStartupPortfolio()
</script>

<style scoped>
.startup-portfolio {
  padding: var(--space-3xl) 0 var(--space-xl);
}

.section-intro {
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(280px, 1.15fr);
  gap: var(--space-xl);
  align-items: end;
  margin-bottom: var(--space-xl);
}

.section-kicker {
  margin: 0 0 var(--space-xs);
  color: var(--color-accent);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: 700;
  letter-spacing: 0;
  text-transform: uppercase;
}

.section-title {
  margin: 0;
  color: var(--color-text-primary);
  font-size: var(--text-2xl);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: 0;
}

.section-summary {
  max-width: 62ch;
  margin: 0;
  color: var(--color-text-secondary);
  font-size: var(--text-base);
  line-height: 1.65;
}

.track-list {
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid var(--color-border);
}

.track-row {
  display: grid;
  grid-template-columns: 36px minmax(0, 1fr) minmax(170px, 0.32fr);
  gap: var(--space-md);
  align-items: start;
  padding: var(--space-lg) 0;
  border-bottom: 1px solid var(--color-border);
}

.track-index {
  padding-top: 3px;
  color: var(--color-text-muted);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
}

.track-main {
  min-width: 0;
}

.track-heading {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: var(--space-xs) var(--space-sm);
}

.track-name {
  margin: 0;
  color: var(--color-text-primary);
  font-size: var(--text-lg);
  font-weight: 800;
  line-height: 1.3;
  letter-spacing: 0;
}

.track-category {
  color: var(--color-text-muted);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  line-height: 1.4;
}

.track-summary {
  max-width: 72ch;
  margin: var(--space-xs) 0 0;
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  line-height: 1.6;
  overflow-wrap: anywhere;
}

.track-action {
  display: flex;
  min-width: 0;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-sm);
}

.track-status {
  max-width: 100%;
  padding: 4px 8px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background: var(--color-surface-1);
  color: var(--color-text-secondary);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  line-height: 1.35;
  overflow-wrap: anywhere;
}

.track-status.status-building {
  border-color: color-mix(in srgb, var(--color-accent) 42%, var(--color-border));
  color: var(--color-accent);
}

.track-status.status-operating {
  border-color: color-mix(in srgb, var(--color-success) 42%, var(--color-border));
  color: var(--color-success);
}

.track-link,
.track-private {
  font-size: var(--text-sm);
  line-height: 1.4;
}

.track-link {
  position: relative;
  z-index: 1;
  color: var(--color-accent);
  font-weight: 650;
  text-decoration: none;
}

.track-link:hover {
  text-decoration: underline;
  text-underline-offset: 3px;
}

.track-private {
  color: var(--color-text-muted);
}

@media (max-width: 767px) {
  .section-intro {
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-md);
  }

  .track-row {
    grid-template-columns: 28px minmax(0, 1fr);
    gap: var(--space-sm);
    padding: var(--space-lg) 0;
  }

  .track-action {
    grid-column: 2;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
  }
}
</style>
