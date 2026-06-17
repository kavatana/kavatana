<template>
  <section class="current-focus">
    <div class="focus-header">
      <span class="section-label">Now</span>
      <h2 class="section-title">What I'm working on</h2>
    </div>
    <div class="focus-grid">
      <div v-for="item in focusItems" :key="item.id" class="focus-item">
        <span class="focus-icon" aria-hidden="true">{{ item.icon }}</span>
        <div class="focus-text">
          <span class="focus-title">{{ item.title }}</span>
          <span class="focus-desc">{{ item.description }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const focusItems = [
  {
    id: 'portfolio',
    icon: '✦',
    title: 'Cleaning up my GitHub and portfolio',
    description: 'Making my public presence honest, organized, and professional.'
  },
  {
    id: 'fullstack',
    icon: '⬡',
    title: 'Learning full-stack fundamentals',
    description: 'Vue, Nuxt, TypeScript, NestJS, PostgreSQL — building while studying.'
  },
  {
    id: 'bayonhub',
    icon: '◈',
    title: 'Building BayonHub carefully',
    description: 'Treating it as a real product experiment — architecture first, polish later.'
  },
  {
    id: 'ai',
    icon: '⌘',
    title: 'Learning AI-assisted development',
    description: 'Using Claude and other tools thoughtfully, verifying everything I generate.'
  },
  {
    id: 'angkor-byte',
    icon: '◉',
    title: 'Learning inside Angkor Byte',
    description: 'Understanding how engineering teams think about products and international work.'
  }
]
</script>

<style scoped>
.current-focus {
  padding: var(--space-2xl) 0;
  border-top: 1px solid var(--color-border);
}

.focus-header {
  margin-bottom: var(--space-xl);
}

.section-label {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-accent);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: var(--space-xs);
}

.section-title {
  font-size: var(--text-2xl);
  color: var(--color-text-primary);
  font-weight: 600;
  margin: 0;
}

.focus-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-sm);
}

@media (min-width: 640px) {
  .focus-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .focus-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.focus-item {
  display: flex;
  gap: var(--space-sm);
  align-items: flex-start;
  padding: var(--space-md);
  background-color: var(--color-surface-1);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  transition: border-color var(--transition-base);
}

.focus-item:hover {
  border-color: var(--color-accent);
}

.focus-icon {
  font-size: var(--text-base);
  color: var(--color-accent);
  flex-shrink: 0;
  margin-top: 2px;
  font-style: normal;
}

.focus-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.focus-title {
  font-size: var(--text-sm);
  color: var(--color-text-primary);
  font-weight: 600;
  line-height: 1.4;
}

.focus-desc {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  line-height: 1.5;
}
</style>
