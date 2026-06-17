<template>
  <section class="hero-section">
    <div class="hero-left">
      <div class="hero-identity">
        <span class="identity-badge">{{ config?.role }}</span>
        <h1 class="hero-name">{{ config?.fullName || config?.name }}</h1>
      </div>
      <p class="hero-headline">{{ config?.tagline }}</p>
      <p class="hero-subtitle">{{ config?.subtitle }}</p>
      <div class="hero-actions">
        <NuxtLink to="/projects" class="btn-primary">View projects</NuxtLink>
        <NuxtLink to="/contact" class="btn-secondary">Contact me &rarr;</NuxtLink>
      </div>
      <div class="availability-badge" v-if="config?.availabilityStatus">
        <span class="availability-dot" aria-hidden="true"></span>
        {{ config.availabilityStatus }}
      </div>
    </div>
    <div class="hero-right" aria-hidden="true">
      <div class="identity-card">
        <div class="card-header">
          <div class="card-avatar">
            <img src="/images/kavatana.webp" alt="Ka Vatana" class="avatar-img" />
          </div>
          <div class="card-info">
            <span class="card-name">Ka Vatana</span>
            <span class="card-location">📍 Cambodia</span>
          </div>
        </div>
        <div class="card-divider"></div>
        <div class="card-section">
          <span class="card-label">Currently building</span>
          <span class="card-value">BayonHub — Khmer marketplace</span>
        </div>
        <div class="card-section">
          <span class="card-label">Learning</span>
          <div class="card-chips">
            <span class="chip">Vue / Nuxt</span>
            <span class="chip">TypeScript</span>
            <span class="chip">NestJS</span>
            <span class="chip">AI workflows</span>
          </div>
        </div>
        <div class="card-section">
          <span class="card-label">Environment</span>
          <span class="card-value">Angkor Byte · Cambodia × Japan</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { usePortfolioConfig } from '~/composables/usePortfolioConfig'
const config = usePortfolioConfig()
</script>

<style scoped>
.hero-section {
  padding: var(--space-3xl) 0 var(--space-2xl);
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-2xl);
  align-items: center;
}

@media (min-width: 1024px) {
  .hero-section {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-3xl);
  }
}

/* Left column */
.hero-left {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.hero-identity {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.identity-badge {
  display: inline-block;
  align-self: flex-start;
  padding: 4px var(--space-sm);
  border: 1px solid var(--color-accent);
  color: var(--color-accent);
  border-radius: var(--radius-sm);
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-family: var(--font-mono);
}

.hero-name {
  font-size: var(--text-display);
  color: var(--color-text-primary);
  font-weight: 900;
  line-height: 1.05;
  margin: 0;
  letter-spacing: -0.02em;
}

.hero-headline {
  font-size: var(--text-xl);
  color: var(--color-text-secondary);
  font-weight: 500;
  line-height: 1.4;
  margin: 0;
  max-width: 520px;
}

.hero-subtitle {
  font-size: var(--text-base);
  color: var(--color-text-muted);
  font-weight: 400;
  line-height: 1.7;
  max-width: 520px;
  margin: 0;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
  margin-top: var(--space-xs);
  flex-wrap: wrap;
}

.btn-primary {
  background-color: var(--color-accent);
  color: var(--color-bg);
  padding: var(--space-sm) var(--space-lg);
  border-radius: var(--radius);
  text-decoration: none;
  font-weight: 700;
  font-size: var(--text-base);
  transition: background-color var(--transition-fast), transform var(--transition-fast);
}

.btn-primary:hover {
  background-color: var(--color-accent-hover);
  transform: translateY(-1px);
}

.btn-secondary {
  color: var(--color-text-secondary);
  text-decoration: none;
  font-weight: 500;
  font-size: var(--text-base);
  transition: color var(--transition-fast);
}

.btn-secondary:hover {
  color: var(--color-text-primary);
}

.availability-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  padding: 6px var(--space-sm);
  background-color: var(--color-surface-1);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
  align-self: flex-start;
}

.availability-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--color-success);
  flex-shrink: 0;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

/* Right column — Identity card */
.hero-right {
  display: none;
}

@media (min-width: 1024px) {
  .hero-right {
    display: flex;
    justify-content: center;
  }
}

.identity-card {
  background-color: var(--color-surface-1);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: var(--space-lg);
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  box-shadow: 0 0 40px rgba(59, 130, 246, 0.06);
}

.card-header {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.card-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: var(--color-accent);
  color: var(--color-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
  border: 2px solid var(--color-surface-2);
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: var(--color-bg);
}

.card-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.card-name {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-primary);
}

.card-location {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.card-divider {
  height: 1px;
  background-color: var(--color-border);
}

.card-section {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.card-label {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-family: var(--font-mono);
}

.card-value {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.card-chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
}

.chip {
  background-color: var(--color-surface-2);
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  padding: 3px 8px;
  border-radius: var(--radius-sm);
  font-size: var(--text-xs);
}

/* Entrance animation */
.hero-left {
  animation: fade-up 0.5s ease both;
}

.hero-right {
  animation: fade-up 0.5s ease 0.15s both;
}

@media (prefers-reduced-motion: reduce) {
  .hero-left,
  .hero-right {
    animation: none;
  }
  .availability-dot {
    animation: none;
  }
}
</style>
