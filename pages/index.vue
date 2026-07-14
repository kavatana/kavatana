<template>
  <AppContainer>
    <HeroSection />
    <CurrentFocus />
    <FlagshipProjectCard v-if="flagshipProject" :project="flagshipProject" />
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
import { useProjects } from '~/composables/useProjects'

const config = usePortfolioConfig()
const projects = useProjects()
const flagshipProject = projects.find(project => project.id === 'chomkar') || projects[0]

useHead({
  title: 'Ka Vatana — Software Engineering Student & Founder-Engineer',
  meta: [
    {
      name: 'description',
      content: config?.description || 'Ka Vatana is a Cambodian software engineering student and founder-engineer building private startup products with AI-native workflows.'
    },
    { property: 'og:title', content: 'Ka Vatana — Software Engineering Student & Founder-Engineer' },
    {
      property: 'og:description',
      content: config?.description || 'Cambodian software engineering student building startup products with AI-native workflows.'
    },
    { property: 'og:image', content: 'https://kavatana.me' + (config?.ogImage || '/images/og-default.png') },
    { property: 'og:url', content: 'https://kavatana.me' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Ka Vatana — Software Engineering Student & Founder-Engineer' },
    {
      name: 'twitter:description',
      content: config?.description || 'Cambodian software engineering student and founder-engineer.'
    },
    { name: 'twitter:image', content: 'https://kavatana.me' + (config?.ogImage || '/images/og-default.png') }
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
        'description': 'Cambodian software engineering student and founder-engineer building private startup products, public proof of work, and AI-native engineering systems.',
        'sameAs': [
          'https://github.com/kavatana',
          'https://www.linkedin.com/in/ka-vatana-99b85440a/'
        ]
      })
    }
  ]
})
</script>
