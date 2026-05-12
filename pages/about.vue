<template>
  <AppContainer>
    <div class="page-header">
      <h1 class="page-title">About</h1>
      <p class="page-subtitle">Background, approach, and experience.</p>
    </div>
    
    <AboutBio />
    <AboutCapabilities />
    <AboutTimeline />
    
    <CtaBlock 
      question="Open to the right opportunity"
      link-label="Let's talk &rarr;"
      link-href="/contact"
    />
  </AppContainer>
</template>

<script setup lang="ts">
useHead({
  title: 'About · kavatana',
  meta: [
    { name: 'description', content: 'Background, approach, and experience.' },
    { property: 'og:title', content: 'About · kavatana' },
    { property: 'og:description', content: 'Background, approach, and experience.' },
    { property: 'og:url', content: 'https://kavatana.me/about' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'About · kavatana' },
    { name: 'twitter:description', content: 'Background, approach, and experience.' }
  ],
  link: [
    { rel: 'canonical', href: 'https://kavatana.me/about' }
  ]
})
</script>

<style scoped>
.page-header {
  padding: var(--space-2xl) 0 var(--space-xl);
}

.page-title {
  font-size: var(--text-display);
  color: var(--color-text-primary);
  font-weight: 900;
  margin: 0 0 var(--space-sm) 0;
}

.page-subtitle {
  font-size: var(--text-xl);
  color: var(--color-text-secondary);
  margin: 0;
}
</style>
