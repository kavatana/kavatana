<template>
  <section class="project-screenshots" v-if="screenshots && screenshots.length">
    <h2 class="section-title">Feature Tour</h2>
    <div class="screenshots-stack">
      <div v-for="(img, idx) in screenshots" :key="idx" class="screenshot-feature-block">
        <div class="premium-browser-frame">
          <div class="frame-header">
            <span class="dot close"></span>
            <span class="dot minimize"></span>
            <span class="dot maximize"></span>
          </div>
          <img :src="img.src" :alt="img.alt" width="1200" height="630" loading="lazy" class="screenshot-img" />
        </div>
        <div v-if="img.caption" class="screenshot-caption-wrapper">
          <h3 class="screenshot-caption-title">{{ img.caption.split('.')[0] }}</h3>
          <p class="screenshot-caption-text" v-if="img.caption.includes('.')">{{ img.caption.substring(img.caption.indexOf('.') + 1).trim() }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Screenshot } from '~/types/content'
defineProps<{
  screenshots?: Screenshot[]
}>()
</script>

<style scoped>
.project-screenshots {
  padding: var(--space-xl) 0;
}

.section-title {
  font-size: var(--text-2xl);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-xl) 0;
}

.screenshots-stack {
  display: flex;
  flex-direction: column;
  gap: var(--space-3xl);
}

.screenshot-feature-block {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.premium-browser-frame {
  background-color: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  box-shadow: var(--glass-shadow);
  overflow: hidden;
  transition: all var(--transition-base);
}

.premium-browser-frame:hover {
  box-shadow: var(--glass-shadow-hover);
  border-color: var(--color-border);
  transform: translateY(-2px);
}

.frame-header {
  height: 38px;
  background-color: var(--glass-bg);
  border-bottom: 1px solid var(--glass-border);
  display: flex;
  align-items: center;
  padding: 0 16px;
  gap: 8px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  opacity: 0.8;
}

.dot.close { background-color: #FF5F56; }
.dot.minimize { background-color: #FFBD2E; }
.dot.maximize { background-color: #27C93F; }

.screenshot-img {
  width: 100%;
  height: auto;
  display: block;
}

.screenshot-caption-wrapper {
  padding: 0 var(--space-sm);
  max-width: 800px;
}

.screenshot-caption-title {
  font-size: var(--text-xl);
  color: var(--color-text-primary);
  font-weight: 700;
  margin: 0 0 var(--space-xs) 0;
}

.screenshot-caption-text {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0;
}
</style>
