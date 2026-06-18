<template>
  <div class="bayonhub-case-study flagship-card">
    <!-- Header (matches FlagshipProjectCard) -->
    <div class="card-top">
      <div class="card-meta">
        <span class="status-badge" :class="`status-${project.status}`">{{ project.statusLabel || project.status }}</span>
        <span class="meta-year">{{ project.year }}</span>
        <span class="meta-role">{{ project.role }}</span>
      </div>
      <h2 class="project-title">{{ project.title }}</h2>
      <p class="project-tagline">{{ project.tagline }}</p>
      
      <div class="action-links" style="margin-top: var(--space-md);">
        <a v-if="project.liveUrl" :href="project.liveUrl" target="_blank" rel="noopener noreferrer" class="btn-live">
          Visit Product &nearr;
        </a>
        <a v-if="project.githubUrl" :href="project.githubUrl" target="_blank" rel="noopener noreferrer" class="btn-repo" aria-label="GitHub Repository">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.45-1.16-1.1-1.47-1.1-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
        </a>
      </div>

      <p class="project-context" v-if="project.context">{{ project.context }}</p>
    </div>

    <!-- Case Study Body -->
    <div class="case-study-body">
      
      <!-- 1. Hero Cover -->
      <section class="cs-section hero-section">
        <div class="bayonhub-browser-frame cover animate-fade-up">
          <img :src="shots.cover" class="bayonhub-shot" alt="BayonHub Hero Cover" loading="lazy" />
        </div>
      </section>

      <!-- 2. Mobile-first proof section -->
      <section class="cs-section proof-section">
        <div class="proof-copy animate-fade-up delay-100">
          <h3>The problem I explored</h3>
          <p>{{ project.problem }}</p>
          
          <h3 class="mt-xl">What I built</h3>
          <ul class="detail-list">
            <li v-for="item in project.whatIBuilt" :key="item">{{ item }}</li>
          </ul>

          <h3 class="mt-xl">Stack</h3>
          <div class="stack-chips">
            <span v-for="tech in project.stack" :key="tech" class="stack-chip">{{ tech }}</span>
          </div>
        </div>
        <div class="proof-visual animate-fade-up delay-200">
          <div class="bayonhub-phone-frame">
            <img :src="shots.mobileHome" class="bayonhub-shot" alt="Mobile Home" loading="lazy" />
          </div>
        </div>
      </section>

      <!-- 3. Marketplace discovery section -->
      <section class="cs-section discovery-section">
        <div class="bayonhub-browser-frame wide animate-fade-up delay-100">
          <img :src="shots.search" class="bayonhub-shot" alt="Search Interface" loading="lazy" />
        </div>
        <div class="bayonhub-browser-frame wide animate-fade-up delay-200">
          <img :src="shots.vehicles" class="bayonhub-shot" alt="Category Browsing" loading="lazy" />
        </div>
      </section>

      <!-- 4. Trust and seller flow section -->
      <section class="cs-section seller-section">
        <div class="bayonhub-phone-frame animate-fade-up delay-100">
          <img :src="shots.listing" class="bayonhub-shot" alt="Listing Detail" loading="lazy" />
        </div>
        <div class="bayonhub-phone-frame animate-fade-up delay-200">
          <img :src="shots.post" class="bayonhub-shot" alt="Post Listing" loading="lazy" />
        </div>
        <div class="bayonhub-browser-frame wide pricing-frame animate-fade-up delay-300">
          <img :src="shots.pricing" class="bayonhub-shot" alt="Pricing" loading="lazy" />
        </div>
      </section>

      <!-- Footer/Learnings -->
      <div class="card-footer animate-fade-up delay-400">
        <div class="learned-block" v-if="project.whatILearned?.length">
          <h3 class="learned-heading">What I learned</h3>
          <ul class="learned-list">
            <li v-for="item in project.whatILearned" :key="item">{{ item }}</li>
          </ul>
        </div>
        <div class="repo-note mt-lg" v-if="project.repoNote">
          <span class="repo-icon" aria-hidden="true">✅</span>
          {{ project.repoNote }}
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import type { Project } from '~/types/content'

const props = defineProps<{
  project: Project
}>()

// Theme Management
const theme = ref('dark')

const updateTheme = (e: any) => { 
  if (e.detail) theme.value = e.detail 
}

let observer: MutationObserver | null = null

onMounted(() => {
  theme.value = document.documentElement.getAttribute('data-theme') || 'dark'
  window.addEventListener('theme-changed', updateTheme)
  
  observer = new MutationObserver(() => {
    theme.value = document.documentElement.getAttribute('data-theme') || 'dark'
  })
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
})

onUnmounted(() => {
  window.removeEventListener('theme-changed', updateTheme)
  if (observer) observer.disconnect()
})

// Asset Maps
const bayonhubImages = {
  light: {
    cover: "/images/projects/bayonhub/screenshots/bayonhub-light-home-desktop.png",
    mobileHome: "/images/projects/bayonhub/screenshots/bayonhub-light-home-mobile.png",
    search: "/images/projects/bayonhub/screenshots/bayonhub-light-search-desktop.png",
    vehicles: "/images/projects/bayonhub/screenshots/bayonhub-light-category-vehicles-desktop.png",
    listing: "/images/projects/bayonhub/screenshots/bayonhub-light-listing-mobile.png",
    post: "/images/projects/bayonhub/screenshots/bayonhub-light-post-mobile.png",
    pricing: "/images/projects/bayonhub/screenshots/bayonhub-light-pricing-desktop.png",
  },
  dark: {
    cover: "/images/projects/bayonhub/screenshots/bayonhub-dark-home-desktop.png",
    mobileHome: "/images/projects/bayonhub/screenshots/bayonhub-dark-home-mobile.png",
    search: "/images/projects/bayonhub/screenshots/bayonhub-dark-search-desktop.png",
    vehicles: "/images/projects/bayonhub/screenshots/bayonhub-dark-category-vehicles-desktop.png",
    listing: "/images/projects/bayonhub/screenshots/bayonhub-dark-listing-mobile.png",
    post: "/images/projects/bayonhub/screenshots/bayonhub-dark-post-mobile.png",
    pricing: "/images/projects/bayonhub/screenshots/bayonhub-dark-pricing-desktop.png",
  },
}

const shots = computed(() => {
  return theme.value === 'dark' ? bayonhubImages.dark : bayonhubImages.light
})
</script>

<style scoped>
/* Base Card Styles to match FlagshipProjectCard */
.bayonhub-case-study {
  background-color: var(--glass-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius);
  box-shadow: var(--glass-shadow);
  overflow: hidden;
  margin: var(--space-xl) 0;
  transition: all var(--transition-base);
}

.card-top {
  padding: var(--space-xl);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.card-meta {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  flex-wrap: wrap;
}

.status-badge {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  border: 1px solid transparent;
}
.status-badge.status-in-progress {
  color: hsl(43, 96%, 45%);
  background-color: hsl(43, 96%, 65%, 0.15);
}

.meta-year,
.meta-role {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  font-family: var(--font-mono);
}
.meta-role::before {
  content: '·';
  margin-right: var(--space-xs);
}

.project-title {
  font-size: var(--text-3xl);
  color: var(--color-text-primary);
  font-weight: 800;
  margin: 0;
  letter-spacing: -0.02em;
}

.project-tagline {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  margin: 0;
}

.action-links {
  display: flex;
  gap: var(--space-md);
  align-items: center;
}

.btn-live {
  background-color: transparent;
  border: 1px solid var(--color-accent);
  color: var(--color-accent);
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  text-decoration: none;
  font-weight: 500;
  font-size: var(--text-sm);
  transition: all var(--transition-fast);
}

.btn-live:hover {
  background-color: var(--color-accent);
  color: var(--color-bg);
}

.btn-repo {
  color: var(--color-text-secondary);
  transition: color var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-repo:hover {
  color: var(--color-text-primary);
}

.project-context {
  font-size: var(--text-sm);
  color: var(--color-accent);
  margin: 0;
  padding: var(--space-sm);
  background-color: hsla(28, 80%, 52%, 0.08); /* Copper tint */
  border-left: 2px solid var(--color-accent);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  line-height: 1.5;
}

/* Case Study Body */
.case-study-body {
  padding: var(--space-xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-3xl);
}

.cs-section {
  display: flex;
  gap: var(--space-xl);
}

/* 1. Hero Cover */
.hero-section {
  flex-direction: column;
}

/* 2. Proof Section (Text + Phone) */
.proof-section {
  flex-direction: row;
  align-items: center;
}
.proof-copy {
  flex: 1;
}
.proof-copy h3 {
  font-size: var(--text-xs);
  font-family: var(--font-mono);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0 0 var(--space-sm) 0;
}
.proof-copy p {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0;
}
.mt-xl {
  margin-top: var(--space-xl) !important;
}
.mt-lg {
  margin-top: var(--space-lg) !important;
}

.detail-list {
  margin: 0;
  padding-left: var(--space-md);
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.detail-list li {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: 1.5;
}

.stack-chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
}
.stack-chip {
  background-color: var(--color-surface-1);
  border: 1px solid var(--color-border);
  color: var(--color-text-primary);
  padding: 3px 8px;
  border-radius: var(--radius-sm);
  font-size: var(--text-xs);
  font-family: var(--font-mono);
}

.proof-visual {
  flex: 0 0 auto;
  display: flex;
  justify-content: center;
}

/* 3. Discovery Section */
.discovery-section {
  flex-direction: row;
}
.discovery-section > div {
  flex: 1;
}

/* 4. Seller Section */
.seller-section {
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.pricing-frame {
  flex: 2; /* takes more space */
}

/* Footer / Learnings */
.card-footer {
  border-top: 1px solid var(--color-border);
  padding-top: var(--space-xl);
}
.learned-block {
  background-color: hsla(0, 0%, 0%, 0.2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: var(--space-md);
}
:global([data-theme="light"]) .learned-block {
  background-color: var(--color-surface-1);
}
.learned-heading {
  font-size: var(--text-xs);
  font-family: var(--font-mono);
  color: var(--color-accent);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0 0 var(--space-sm) 0;
}
.learned-list {
  margin: 0;
  padding-left: var(--space-md);
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.learned-list li {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: 1.5;
}
.repo-note {
  display: flex;
  align-items: flex-start;
  gap: var(--space-xs);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  line-height: 1.5;
}

/* CSS CONTRACT FROM HANDOFF */
.bayonhub-browser-frame {
  overflow: hidden;
  border-radius: 18px;
  border: 1px solid var(--color-border);
  background: var(--color-surface-1);
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.18);
}
.bayonhub-browser-frame.cover {
  aspect-ratio: 1440 / 1100;
  width: 100%;
}
.bayonhub-browser-frame.wide {
  aspect-ratio: 1440 / 1000;
}
.bayonhub-phone-frame {
  overflow: hidden;
  width: min(100%, 300px);
  aspect-ratio: 440 / 956;
  border-radius: 38px;
  border: 12px solid var(--color-border);
  background: var(--color-surface-1);
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.22);
  margin: 0 auto;
}
.bayonhub-shot {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
}

/* Responsive Overrides */
@media (max-width: 1024px) {
  .proof-section {
    flex-direction: column;
  }
  .discovery-section {
    flex-direction: column;
  }
  .seller-section {
    flex-direction: column;
  }
  .pricing-frame {
    width: 100%;
    margin-top: var(--space-lg);
  }
}

@media (max-width: 767px) {
  .bayonhub-phone-frame {
    width: min(85vw, 300px);
  }
  .case-study-body {
    padding: var(--space-md);
    gap: var(--space-2xl);
  }
}
</style>
