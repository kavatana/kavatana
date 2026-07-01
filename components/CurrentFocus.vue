<template>
  <section class="current-focus" id="now">
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
    id: 'chomkar',
    icon: '✦',
    title: 'Building Chomkar.com',
    description: 'Co-founder and full-stack contributor on an agritech platform for farmer market access.'
  },
  {
    id: 'chnai-lab',
    icon: '⬡',
    title: 'Growing Chnai Lab',
    description: 'Building a student-led digital project team for products, automation, and practical execution.'
  },
  {
    id: 'studies',
    icon: '◈',
    title: 'Studying software and English',
    description: 'Software Engineering at BELTEI International University and Year 1 English at IFL.'
  },
  {
    id: 'angkor-byte',
    icon: '⌘',
    title: 'Preparing for Angkor Byte work',
    description: 'July 2026 - October 2026 web system and digital project support contract.'
  },
  {
    id: 'portfolio',
    icon: '◉',
    title: 'Organizing my public identity',
    description: 'Turning high-school activities, awards, projects, and photos into a clean portfolio archive.'
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
  gap: var(--space-md);
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
  gap: var(--space-md);
  align-items: flex-start;
  padding: var(--space-lg);
  background-color: var(--color-surface-1);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  transition: transform var(--transition-fast), border-color var(--transition-fast), box-shadow var(--transition-fast);
  box-shadow: var(--shadow-card);
}

.focus-item:hover {
  border-color: var(--color-accent);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.08);
}

.focus-icon {
  font-size: var(--text-xl);
  color: var(--color-accent);
  flex-shrink: 0;
  font-style: normal;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
}

.focus-text {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.focus-title {
  font-size: var(--text-base);
  color: var(--color-text-primary);
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: -0.01em;
}

.focus-desc {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
}
</style>
