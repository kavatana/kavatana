<template>
  <AppContainer>
    <div class="page-header animate-fade-up">
      <h1 class="page-title">About</h1>
      <p class="page-subtitle">Background, product direction, and how I work.</p>
    </div>
    
    <AboutBio class="animate-fade-up delay-100" />
    <AboutCapabilities class="animate-fade-up delay-200" />
    <AboutTimeline class="animate-fade-up delay-300" />
    
    <CtaBlock 
      class="animate-fade-up delay-400"
      question="Open to the right opportunity"
      link-label="Let's talk &rarr;"
      link-href="/contact"
    />
  </AppContainer>
</template>

<script setup lang="ts">
useHead({
  title: 'About · Ka Vatana',
  meta: [
    { name: 'description', content: 'Ka Vatana is a Cambodia-based Software Engineering student and founder-engineer building AI-native product systems.' },
    { property: 'og:title', content: 'About · Ka Vatana' },
    { property: 'og:description', content: 'Background, product direction, and AI-native engineering workflow.' },
    { property: 'og:url', content: 'https://kavatana.me/about' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'About · Ka Vatana' },
    { name: 'twitter:description', content: 'Background, product direction, and AI-native engineering workflow.' }
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
