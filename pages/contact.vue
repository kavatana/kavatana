<template>
  <AppContainer>
    <div class="page-header">
      <h1 class="page-title">Let's talk.</h1>
      <p class="page-subtitle">
        I am currently open to the right opportunities. Whether it's a full-stack product build, system architecture, or a complex DevOps pipeline, I typically respond within 1-2 days.
      </p>
    </div>
    
    <div class="form-container">
      <ContactForm />
      
      <div class="alt-contact">
        <p class="email-text">
          Prefer email? &rarr; <a :href="'mailto:' + config?.email" class="email-link">{{ config?.email }}</a>
        </p>
        <div class="social-links">
          <a :href="config?.social?.github" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.45-1.16-1.1-1.47-1.1-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
          </a>
          <a :href="config?.social?.linkedin" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>
        </div>
      </div>
    </div>
  </AppContainer>
</template>

<script setup lang="ts">
import { usePortfolioConfig } from '~/composables/usePortfolioConfig'

const config = usePortfolioConfig()

useHead({
  title: 'Contact · Ka Vatana',
  meta: [
    { name: 'description', content: 'Get in touch for opportunities or collaborations.' },
    { property: 'og:title', content: 'Contact · Ka Vatana' },
    { property: 'og:description', content: 'Get in touch for opportunities or collaborations.' },
    { property: 'og:url', content: 'https://kavatana.me/contact' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Contact · Ka Vatana' },
    { name: 'twitter:description', content: 'Get in touch for opportunities or collaborations.' }
  ],
  link: [
    { rel: 'canonical', href: 'https://kavatana.me/contact' }
  ]
})
</script>

<style scoped>
.page-header {
  padding: var(--space-2xl) 0 var(--space-xl);
  max-width: 800px;
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
  line-height: 1.5;
  margin: 0;
}

.form-container {
  max-width: 700px;
  margin: 0 auto var(--space-3xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.alt-contact {
  background-color: var(--color-surface-1);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: var(--space-md) var(--space-xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

@media (min-width: 600px) {
  .alt-contact {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.email-text {
  color: var(--color-text-secondary);
  margin: 0;
  font-size: var(--text-base);
}

.email-link {
  color: var(--color-accent);
  text-decoration: none;
  font-weight: 500;
}

.social-links {
  display: flex;
  gap: var(--space-sm);
}

.social-links a {
  color: var(--color-text-secondary);
  transition: color var(--transition-fast);
}

.social-links a:hover {
  color: var(--color-text-primary);
}
</style>
