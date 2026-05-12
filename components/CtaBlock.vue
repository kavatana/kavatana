<template>
  <section class="cta-block">
    <p class="cta-question">{{ question }}</p>
    <NuxtLink :to="linkHref" class="cta-link" @click="trackClick">{{ linkLabel }}</NuxtLink>
  </section>
</template>

<script setup lang="ts">
import { useNuxtApp } from '#app'

const props = defineProps<{
  question: string
  linkLabel: string
  linkHref: string
}>()

const trackClick = () => {
  const { $trackEvent } = useNuxtApp()
  if ($trackEvent) {
    $trackEvent('cta_click', { props: { href: props.linkHref } })
  }
}
</script>

<style scoped>
.cta-block {
  padding: var(--space-3xl) 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-md);
}

.cta-question {
  color: var(--color-text-secondary);
  font-size: var(--text-lg);
  margin: 0;
}

.cta-link {
  color: var(--color-accent);
  font-size: var(--text-2xl);
  font-weight: bold;
  text-decoration: none;
  transition: color var(--transition-fast);
}

.cta-link:hover {
  color: var(--color-accent-hover);
}
</style>
