<template>
  <AppContainer>
    <HeroSection />
    <CurrentFocus />
    <FeaturedProjects />
    <WhatImLearning />
    <BuildDirections />
    <CtaBlock
      question="Want to collaborate, learn together, or just say hello?"
      link-label="Get in touch &rarr;"
      link-href="/contact"
    />
  </AppContainer>
</template>

<script setup lang="ts">
import { usePortfolioConfig } from '~/composables/usePortfolioConfig'

const config = usePortfolioConfig()

useHead({
  title: 'Ka Vatana — Software Engineering Student & Builder from Cambodia',
  meta: [
    {
      name: 'description',
      content: config?.description || 'Ka Vatana is a Year 1 Software Engineering student from Cambodia learning full-stack development, AI-assisted workflows, and product building through practical web projects.'
    },
    { property: 'og:title', content: 'Ka Vatana — Software Engineering Student & Builder from Cambodia' },
    {
      property: 'og:description',
      content: config?.description || 'Year 1 Software Engineering student from Cambodia learning full-stack development, AI workflows, and product building.'
    },
    { property: 'og:image', content: config?.ogImage || '/images/og-default.png' },
    { property: 'og:url', content: 'https://kavatana.me' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Ka Vatana — Software Engineering Student & Builder from Cambodia' },
    {
      name: 'twitter:description',
      content: config?.description || 'Year 1 Software Engineering student from Cambodia.'
    },
    { name: 'twitter:image', content: config?.ogImage || '/images/og-default.png' }
  ],
  link: [
    { rel: 'canonical', href: 'https://kavatana.me' }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        'name': 'Ka Vatana',
        'url': 'https://kavatana.me',
        'jobTitle': 'Software Engineering Student',
        'description': 'Year 1 Software Engineering student from Cambodia learning full-stack development and product building.',
        'sameAs': [
          'https://github.com/kavatana',
          'https://www.linkedin.com/in/ka-vatana-99b85440a/'
        ]
      })
    }
  ]
})
</script>
