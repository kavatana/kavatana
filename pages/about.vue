<template>
  <AppContainer>
    <div class="page-header animate-fade-up">
      <h1 class="page-title">About</h1>
      <p class="page-subtitle">Current identity, studies, projects, and professional direction.</p>
    </div>
    
    <AboutBio class="animate-fade-up delay-100" />
    <AboutCapabilities class="animate-fade-up delay-200" />
    <AboutTimeline class="animate-fade-up delay-300" />
    
    <CtaBlock 
      class="animate-fade-up delay-400"
      question="Want the full high-school to present timeline?"
      link-label="Read the full journey &rarr;"
      link-href="/journey"
    />
  </AppContainer>
</template>

<script setup lang="ts">
useHead({
  title: 'About · Ka Vatana',
  meta: [
    { name: 'description', content: 'Ka Vatana background, studies, current projects, experience, and learning direction.' },
    { property: 'og:title', content: 'About · Ka Vatana' },
    { property: 'og:description', content: 'Ka Vatana background, studies, current projects, experience, and learning direction.' },
    { property: 'og:url', content: 'https://kavatana.me/about' },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: 'https://kavatana.me/images/og-default.png' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:image', content: 'https://kavatana.me/images/og-default.png' },
    { name: 'twitter:title', content: 'About · Ka Vatana' },
    { name: 'twitter:description', content: 'Ka Vatana background, studies, current projects, experience, and learning direction.' }
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
