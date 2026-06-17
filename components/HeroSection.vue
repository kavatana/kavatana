<template>
  <section class="hero-section">
    <div class="availability-badge" v-if="config?.availabilityStatus">
      {{ config.availabilityStatus }}
    </div>
    <h1 class="hero-title">{{ config?.tagline }}</h1>
    <p class="hero-subtitle">{{ config?.description }}</p>
    <div class="hero-actions">
      <NuxtLink to="/projects" class="btn-primary">See how I build</NuxtLink>
      <NuxtLink to="/contact" class="btn-secondary">Open to the right opportunity &rarr;</NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { usePortfolioConfig } from '~/composables/usePortfolioConfig'
const config = usePortfolioConfig()
</script>

<style scoped>
.hero-section {
  padding: var(--space-3xl) 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.availability-badge {
  display: inline-block;
  align-self: flex-start;
  padding: var(--space-xs) var(--space-sm);
  border: 1px solid var(--color-accent);
  color: var(--color-text-primary);
  border-radius: var(--radius-sm);
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.hero-title {
  font-size: var(--text-display);
  color: var(--color-text-primary);
  font-weight: 900;
  line-height: 1.1;
  margin: 0;
}

.hero-subtitle {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  font-weight: 400;
  max-width: 800px;
  margin: 0;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
  margin-top: var(--space-md);
  flex-wrap: wrap;
}

.btn-primary {
  background-color: var(--color-accent);
  color: var(--color-bg);
  padding: var(--space-sm) var(--space-lg);
  border-radius: var(--radius);
  text-decoration: none;
  font-weight: bold;
  font-size: var(--text-base);
  transition: background-color var(--transition-fast);
}

.btn-primary:hover {
  background-color: var(--color-accent-hover);
}

.btn-secondary {
  color: var(--color-accent);
  text-decoration: none;
  font-weight: 500;
  font-size: var(--text-base);
  transition: color var(--transition-fast);
}

.btn-secondary:hover {
  color: var(--color-accent-hover);
}
</style>
