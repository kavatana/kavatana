<template>
  <section class="hero-section">
    <div class="hero-left">
      <div class="hero-identity">
        <span class="identity-badge">🇰🇭 Year 1 Software Engineering Student · Cambodia</span>
        <h1 class="hero-name">Ka Vatana</h1>
      </div>
      <p class="hero-headline">Building real software while learning how to build better software.</p>
      <p class="hero-subtitle">
        I’m a Year 1 Software Engineering student from Cambodia. I learn by building practical web projects, exploring AI-assisted workflows, and developing product thinking one commit at a time.
      </p>
      <div class="hero-actions">
        <NuxtLink to="/projects" class="btn-primary">View projects</NuxtLink>
        <NuxtLink to="/contact" class="btn-secondary">Contact me &rarr;</NuxtLink>
      </div>
      <div class="availability-badge">
        <span class="availability-dot" aria-hidden="true"></span>
        Open to internships, collaborations, and learning opportunities
      </div>
    </div>
    
    <div class="hero-right" aria-hidden="true">
      <div class="portrait-card">
        <div class="portrait-image-wrapper">
          <img src="/images/profile/ka-vatana.jpg" alt="Portrait of Ka Vatana" class="portrait-img" />
        </div>
        <div class="portrait-details">
          <div class="focus-header">
            <span class="focus-title">Current Focus</span>
            <span class="focus-subtitle">Full-stack · AI Tools · Product Building</span>
          </div>
          <div class="tech-chips">
            <span class="chip">Nuxt</span>
            <span class="chip">Vue</span>
            <span class="chip">TypeScript</span>
            <span class="chip">Node.js</span>
            <span class="chip">PostgreSQL</span>
            <span class="chip">Git & GitHub</span>
            <span class="chip">AI Tools</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
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
    grid-template-columns: 1.1fr 0.9fr;
    gap: var(--space-3xl);
  }
}

/* Left column */
.hero-left {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  animation: fade-up 0.5s ease both;
}

.hero-identity {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.identity-badge {
  display: inline-block;
  align-self: flex-start;
  padding: 6px var(--space-sm);
  background-color: var(--color-surface-1);
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  border-radius: var(--radius-sm);
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-family: var(--font-mono);
  font-weight: 500;
}

.hero-name {
  font-size: var(--text-display);
  color: var(--color-text-primary);
  font-weight: 800;
  line-height: 1.05;
  margin: 0;
  letter-spacing: -0.03em;
}

.hero-headline {
  font-size: var(--text-2xl);
  color: var(--color-text-primary);
  font-weight: 600;
  line-height: 1.3;
  margin: 0;
  max-width: 540px;
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
  color: #fff; /* Always white text on primary button */
  padding: var(--space-sm) var(--space-lg);
  border-radius: var(--radius);
  text-decoration: none;
  font-weight: 600;
  font-size: var(--text-base);
  transition: background-color var(--transition-fast), transform var(--transition-fast);
  box-shadow: 0 4px 14px rgba(59, 130, 246, 0.4);
}

.btn-primary:hover {
  background-color: var(--color-accent-hover);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.5);
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
  gap: var(--space-sm);
  margin-top: var(--space-sm);
  padding: 8px var(--space-md);
  background-color: var(--color-surface-1);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  align-self: flex-start;
  line-height: 1.4;
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

/* Right column — Portrait card */
.hero-right {
  display: flex;
  justify-content: center;
  animation: fade-up 0.6s ease 0.15s both;
}

.portrait-card {
  background-color: var(--color-surface-1);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: var(--space-sm);
  width: 100%;
  max-width: 440px;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  box-shadow: var(--shadow-featured);
}

.portrait-image-wrapper {
  width: 100%;
  aspect-ratio: 4 / 5;
  border-radius: calc(var(--radius) - 4px);
  overflow: hidden;
  background: radial-gradient(circle at top, rgba(59, 130, 246, 0.15), transparent 70%);
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
}

.portrait-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  filter: contrast(1.05) saturate(1.05);
}

.portrait-details {
  padding: var(--space-sm) var(--space-xs);
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.focus-header {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.focus-title {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-family: var(--font-mono);
}

.focus-subtitle {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  font-weight: 500;
}

.tech-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.chip {
  background-color: var(--color-surface-2);
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  font-size: var(--text-xs);
  font-family: var(--font-mono);
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
