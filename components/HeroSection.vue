<template>
  <section class="hero-section">
    
    <div class="hero-content">
      <div class="portrait-container animate-fade-up">
        <div class="portrait-glow"></div>
        <img src="/images/profile/ka-vatana-transparent.png" alt="Ka Vatana" class="portrait-img" />
      </div>
      
      <div class="hero-text-content">
        <div class="identity-badge animate-fade-up delay-100">{{ config.role }}</div>
        <h1 class="hero-name animate-fade-up delay-200">Ka Vatana</h1>
        <p class="hero-headline animate-fade-up delay-300">{{ config.tagline }}</p>
        <p class="hero-summary animate-fade-up delay-300">{{ config.subtitle }}</p>
        
        <div class="tech-chips animate-fade-up delay-400">
          <span class="chip">TypeScript</span>
          <span class="chip">Next.js</span>
          <span class="chip">Nuxt</span>
          <span class="chip">PostgreSQL</span>
          <span class="chip">Product engineering</span>
          <span class="chip">AI-native workflows</span>
        </div>

        <div class="hero-actions animate-fade-up delay-500">
          <NuxtLink to="/projects" class="btn-primary">View projects</NuxtLink>
          <NuxtLink to="/journey" class="btn-secondary">Read journey &rarr;</NuxtLink>
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
  padding: var(--space-xl) 0 var(--space-3xl);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 10;
}

.hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-xl);
  width: 100%;
  max-width: 800px;
}

.portrait-container {
  position: relative;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: flex-end; /* Align to bottom for perfect crop */
  margin-bottom: var(--space-md);
}

.portrait-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 140%;
  height: 140%;
  background: radial-gradient(circle, hsla(28, 80%, 52%, 0.15) 0%, transparent 60%);
  border-radius: 50%;
  z-index: -1;
  animation: pulse 4s ease-in-out infinite;
}

.portrait-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  border-radius: 50%;
  border: 2px solid var(--color-border);
  box-shadow: 0 10px 40px hsla(28, 80%, 52%, 0.1);
  filter: contrast(1.05) saturate(1.1);
}

.hero-text-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
}

.identity-badge {
  display: inline-block;
  padding: 6px var(--space-md);
  background-color: var(--color-surface-1);
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  border-radius: 20px;
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-family: var(--font-mono);
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.hero-name {
  font-size: var(--text-display);
  color: var(--color-text-primary);
  font-weight: 900;
  line-height: 1.1;
  margin: 0;
  letter-spacing: -0.03em;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}

.hero-headline {
  font-size: var(--text-xl);
  color: var(--color-text-secondary);
  font-weight: 500;
  line-height: 1.4;
  margin: 0;
  max-width: 500px;
}

.hero-summary {
  font-size: var(--text-base);
  color: var(--color-text-muted);
  line-height: 1.7;
  margin: 0;
  max-width: 640px;
}

.tech-chips {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin: var(--space-sm) 0;
}

.chip {
  background-color: var(--color-surface-2);
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  padding: 6px 14px;
  border-radius: 20px; /* Pill shape like reference image */
  font-size: var(--text-sm);
  transition: all var(--transition-fast);
}
.chip:hover {
  background-color: hsla(28, 80%, 52%, 0.1);
  color: var(--color-accent);
  border-color: var(--color-accent);
}

.hero-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-lg);
  margin-top: var(--space-md);
}

.btn-primary {
  background-color: var(--color-accent);
  color: #fff;
  padding: 12px 28px;
  border-radius: 30px; /* Pill shape button */
  text-decoration: none;
  font-weight: 600;
  font-size: var(--text-base);
  transition: all var(--transition-fast);
  box-shadow: 0 4px 20px hsla(28, 80%, 52%, 0.25);
  border: 1px solid hsla(28, 80%, 52%, 0.5);
}

.btn-primary:hover {
  background-color: var(--color-accent-hover);
  transform: translateY(-2px);
  box-shadow: 0 6px 25px hsla(28, 80%, 52%, 0.35);
}

.btn-secondary {
  color: var(--color-text-secondary);
  text-decoration: none;
  font-weight: 500;
  font-size: var(--text-base);
  transition: color var(--transition-fast);
  padding: 12px 20px;
}

.btn-secondary:hover {
  color: var(--color-text-primary);
}

@keyframes pulse {
  0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 1; transform: translate(-50%, -50%) scale(1.05); }
}

@media (prefers-reduced-motion: reduce) {
  .portrait-glow {
    animation: none;
  }
}
</style>
