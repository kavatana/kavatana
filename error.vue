<template>
  <div class="error-page">
    <div class="error-inner">
      <p class="error-code">{{ error?.statusCode || 500 }}</p>
      <h1 class="error-title">{{ isNotFound ? 'Page not found' : 'Something went wrong' }}</h1>
      <p class="error-message">
        {{ isNotFound
          ? "That page doesn't exist or has moved. Let's get you back on track."
          : (error?.statusMessage || 'An unexpected error occurred. Please try again.') }}
      </p>
      <div class="error-actions">
        <button class="btn-home" @click="goHome">&larr; Back to home</button>
        <NuxtLink to="/projects" class="btn-alt" @click="clearError()">View projects</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { NuxtError } from '#app'
import { clearError, useHead } from '#imports'

const props = defineProps<{ error: NuxtError }>()

const isNotFound = computed(() => props.error?.statusCode === 404)

const goHome = () => clearError({ redirect: '/' })

useHead({
  title: computed(() => `${props.error?.statusCode || 'Error'} · Ka Vatana`)
})
</script>

<style scoped>
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-xl);
  background-color: var(--color-bg);
}

.error-inner {
  max-width: 520px;
  text-align: center;
}

.error-code {
  font-family: var(--font-mono);
  font-size: var(--text-display);
  font-weight: 900;
  color: var(--color-accent);
  margin: 0;
  line-height: 1;
}

.error-title {
  font-size: var(--text-3xl);
  font-weight: 800;
  color: var(--color-text-primary);
  margin: var(--space-md) 0 var(--space-sm);
  letter-spacing: -0.02em;
}

.error-message {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0 0 var(--space-xl);
}

.error-actions {
  display: flex;
  gap: var(--space-md);
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-home {
  background-color: var(--color-accent);
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: var(--radius-sm);
  font-weight: 600;
  font-size: var(--text-base);
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.btn-home:hover {
  background-color: var(--color-accent-hover);
}

.btn-alt {
  color: var(--color-text-secondary);
  text-decoration: none;
  font-weight: 500;
  font-size: var(--text-base);
  padding: 12px 16px;
  transition: color var(--transition-fast);
}

.btn-alt:hover {
  color: var(--color-text-primary);
}
</style>
