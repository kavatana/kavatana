<template>
  <section class="about-bio">
    <div class="bio-left">
      <img src="/images/profile/ka-vatana-transparent.png" alt="kavatana profile photo" class="profile-photo" width="250" height="250" fetchpriority="high" />
      <div class="photo-caption">
        <span class="name">{{ config?.name }}</span>
        <span class="role">{{ about?.role }}</span>
      </div>
    </div>
    <div class="bio-right">
      <p v-for="(paragraph, index) in about?.bio" :key="index" :class="{ 'intro': index === 0 }">
        {{ paragraph }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { usePortfolioConfig } from '~/composables/usePortfolioConfig'
import { useAbout } from '~/composables/useAbout'
const config = usePortfolioConfig()
const about = useAbout()
</script>

<style scoped>
.about-bio {
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
  padding: var(--space-2xl) 0;
}

@media (min-width: 768px) {
  .about-bio {
    flex-direction: row;
  }
}

.bio-left {
  flex: 0 0 250px;
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.profile-photo {
  background-color: transparent;
  border: 1px solid var(--color-border);
  aspect-ratio: 1 / 1;
  width: 100%;
  height: auto;
  object-fit: cover;
  display: block;
  transition: all var(--transition-normal);
}

:global([data-theme="dark"]) .profile-photo {
  filter: drop-shadow(0 0 15px rgba(59, 130, 246, 0.15));
  border-color: rgba(255, 255, 255, 0.1);
}

.photo-caption {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.name {
  color: var(--color-text-primary);
  font-size: var(--text-sm);
  font-weight: bold;
}

.role {
  color: var(--color-text-muted);
  font-size: var(--text-sm);
}

.bio-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.bio-right p {
  color: var(--color-text-secondary);
  font-size: var(--text-base);
  line-height: 1.6;
  margin: 0;
}

.bio-right p.intro {
  color: var(--color-text-primary);
  font-size: var(--text-lg);
}
</style>
