<template>
  <AppContainer>
    <HeroSection />
    <FlagshipProjectCard />
    <CapabilitiesSection />
    <BuildDirections />
    <CtaBlock 
      question="Want to build something together?"
      link-label="Let's talk &rarr;"
      link-href="/contact"
    />
  </AppContainer>
</template>

<script setup lang="ts">
import { usePortfolioConfig } from '~/composables/usePortfolioConfig'

const config = usePortfolioConfig()

useHead({
  title: 'kavatana',
  meta: [
    { name: 'description', content: config?.description || '' },
    { property: 'og:title', content: 'kavatana' },
    { property: 'og:description', content: config?.description || '' },
    { property: 'og:image', content: config?.ogImage || '' },
    { property: 'og:url', content: 'https://kavatana.me' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'kavatana' },
    { name: 'twitter:description', content: config?.description || '' },
    { name: 'twitter:image', content: config?.ogImage || '' }
  ],
  link: [
    { rel: 'canonical', href: 'https://kavatana.me' }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "kavatana",
        "url": "https://kavatana.me",
        "sameAs": [
          "https://github.com/kavatana",
          "https://www.linkedin.com/in/ka-vatana-99b85440a/"
        ]
      })
    }
  ]
})
</script>
