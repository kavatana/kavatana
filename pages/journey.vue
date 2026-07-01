<template>
  <AppContainer>
    <section class="journey-hero animate-fade-up">
      <span class="eyebrow">{{ journeyData.intro.eyebrow }}</span>
      <h1 class="page-title">{{ journeyData.intro.title }}</h1>
      <p class="page-subtitle">{{ journeyData.intro.summary }}</p>
    </section>

    <nav class="section-nav animate-fade-up delay-100" aria-label="Journey sections">
      <a href="#education">Education</a>
      <a href="#experience">Experience</a>
      <a href="#activities">Activities</a>
      <a href="#awards">Awards</a>
      <a href="#timeline">Timeline</a>
      <a href="#skills">Skills</a>
    </nav>

    <section class="snapshot-grid animate-fade-up delay-100" aria-label="Identity snapshot">
      <article v-for="item in journeyData.snapshot" :key="item.label" class="snapshot-item">
        <span>{{ item.label }}</span>
        <p>{{ item.value }}</p>
      </article>
    </section>

    <section id="education" class="journey-section animate-fade-up delay-200">
      <div class="section-heading">
        <span class="section-kicker">Foundation</span>
        <h2>Education</h2>
      </div>
      <div class="detail-list">
        <article v-for="item in journeyData.education" :key="item.institution" class="detail-card">
          <div class="card-header">
            <div>
              <h3>{{ item.institution }}</h3>
              <p class="role">{{ item.role }}</p>
            </div>
            <span class="period">{{ item.period }}</span>
          </div>
          <ul>
            <li v-for="detail in item.details" :key="detail">{{ detail }}</li>
          </ul>
        </article>
      </div>
    </section>

    <section id="experience" class="journey-section animate-fade-up delay-200">
      <div class="section-heading">
        <span class="section-kicker">Current and past work</span>
        <h2>Experience</h2>
      </div>
      <div class="detail-list">
        <article v-for="item in journeyData.experience" :key="`${item.organization}-${item.period}`" class="detail-card">
          <div class="card-header">
            <div>
              <h3>{{ item.organization }}</h3>
              <p class="role">{{ item.role }}</p>
            </div>
            <span class="period">{{ item.period }}</span>
          </div>
          <ul>
            <li v-for="detail in item.details" :key="detail">{{ detail }}</li>
          </ul>
        </article>
      </div>
    </section>

    <section id="activities" class="journey-section animate-fade-up delay-300">
      <div class="section-heading">
        <span class="section-kicker">High-school activities</span>
        <h2>Activities & Community</h2>
      </div>
      <div v-for="group in journeyData.activities" :key="group.group" class="activity-group">
        <h3 class="group-title">{{ group.group }}</h3>
        <div class="event-grid">
          <article v-for="item in group.items" :key="`${item.title}-${item.period}`" class="event-card">
            <span class="period">{{ item.period }}</span>
            <h4>{{ item.title }}</h4>
            <ul>
              <li v-for="detail in item.details" :key="detail">{{ detail }}</li>
            </ul>
          </article>
        </div>
      </div>

      <div class="activity-group">
        <h3 class="group-title">Training & Development</h3>
        <div class="event-grid">
          <article v-for="item in journeyData.training" :key="`${item.title}-${item.period}`" class="event-card">
            <span class="period">{{ item.period }}</span>
            <h4>{{ item.title }}</h4>
            <ul>
              <li v-for="detail in item.details" :key="detail">{{ detail }}</li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <section id="awards" class="journey-section animate-fade-up delay-300">
      <div class="section-heading">
        <span class="section-kicker">Recognition</span>
        <h2>Awards & Honors</h2>
      </div>
      <div class="award-grid">
        <article v-for="award in journeyData.awards" :key="`${award.title}-${award.period}`" class="award-card">
          <span class="period">{{ award.period }}</span>
          <h3>{{ award.title }}</h3>
          <p>{{ award.result }}</p>
        </article>
      </div>
    </section>

    <section id="timeline" class="journey-section animate-fade-up delay-400">
      <div class="section-heading">
        <span class="section-kicker">Chronological view</span>
        <h2>Timeline</h2>
      </div>
      <div class="year-stack">
        <article v-for="year in journeyData.timeline" :key="year.year" class="year-block">
          <h3>{{ year.year }}</h3>
          <div class="month-stack">
            <div v-for="month in year.months" :key="month.month" class="month-row">
              <div class="month-label">{{ month.month }}</div>
              <ul>
                <li v-for="item in month.items" :key="item">{{ item }}</li>
              </ul>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section id="skills" class="journey-section animate-fade-up delay-400">
      <div class="section-heading">
        <span class="section-kicker">Working strengths</span>
        <h2>Skills</h2>
      </div>
      <div class="skill-grid">
        <article v-for="group in journeyData.skills" :key="group.category" class="skill-card">
          <h3>{{ group.category }}</h3>
          <ul>
            <li v-for="item in group.items" :key="item">{{ item }}</li>
          </ul>
        </article>
      </div>
    </section>
  </AppContainer>
</template>

<script setup lang="ts">
import journey from '~/content/journey.json'

interface TextBlock {
  title: string
  period: string
  details: string[]
}

interface JourneyContent {
  intro: {
    eyebrow: string
    title: string
    summary: string
  }
  snapshot: Array<{
    label: string
    value: string
  }>
  education: Array<{
    institution: string
    role: string
    period: string
    details: string[]
  }>
  experience: Array<{
    organization: string
    role: string
    period: string
    details: string[]
  }>
  activities: Array<{
    group: string
    items: TextBlock[]
  }>
  training: TextBlock[]
  awards: Array<{
    title: string
    period: string
    result: string
  }>
  timeline: Array<{
    year: string
    months: Array<{
      month: string
      items: string[]
    }>
  }>
  skills: Array<{
    category: string
    items: string[]
  }>
}

const journeyData = journey as JourneyContent

useHead({
  title: 'Journey · Ka Vatana',
  meta: [
    { name: 'description', content: 'Ka Vatana full education, experience, activities, awards, and growth timeline from high school to present.' },
    { property: 'og:title', content: 'Journey · Ka Vatana' },
    { property: 'og:description', content: 'Ka Vatana full education, experience, activities, awards, and growth timeline from high school to present.' },
    { property: 'og:url', content: 'https://kavatana.me/journey' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Journey · Ka Vatana' },
    { name: 'twitter:description', content: 'Ka Vatana full education, experience, activities, awards, and growth timeline from high school to present.' }
  ],
  link: [
    { rel: 'canonical', href: 'https://kavatana.me/journey' }
  ]
})
</script>

<style scoped>
.journey-hero {
  padding: var(--space-2xl) 0 var(--space-lg);
  max-width: 920px;
}

.eyebrow,
.section-kicker {
  display: inline-block;
  color: var(--color-accent);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.page-title {
  color: var(--color-text-primary);
  font-size: var(--text-display);
  font-weight: 900;
  margin: var(--space-sm) 0;
}

.page-subtitle {
  color: var(--color-text-secondary);
  font-size: var(--text-xl);
  line-height: 1.6;
  margin: 0;
}

.section-nav {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
  padding: var(--space-md) 0 var(--space-xl);
}

.section-nav a {
  background-color: var(--color-surface-1);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  color: var(--color-text-secondary);
  min-height: 44px;
  padding: 10px 14px;
  text-decoration: none;
  transition: color var(--transition-fast), border-color var(--transition-fast);
}

.section-nav a:hover {
  border-color: var(--color-accent);
  color: var(--color-text-primary);
}

.snapshot-grid,
.event-grid,
.award-grid,
.skill-grid {
  display: grid;
  gap: var(--space-md);
  grid-template-columns: 1fr;
}

@media (min-width: 720px) {
  .snapshot-grid,
  .event-grid,
  .award-grid,
  .skill-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1100px) {
  .award-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.snapshot-item,
.detail-card,
.event-card,
.award-card,
.skill-card {
  background-color: var(--color-surface-1);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: var(--space-lg);
  overflow-wrap: anywhere;
}

.snapshot-item span,
.period {
  color: var(--color-accent);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: 700;
  text-transform: uppercase;
}

.snapshot-item p {
  color: var(--color-text-primary);
  font-size: var(--text-lg);
  line-height: 1.5;
  margin: var(--space-xs) 0 0;
}

.journey-section {
  border-top: 1px solid var(--color-border);
  padding: var(--space-2xl) 0;
}

.section-heading {
  margin-bottom: var(--space-xl);
  max-width: 760px;
}

.section-heading h2 {
  font-size: var(--text-3xl);
  margin: var(--space-xs) 0 0;
}

.detail-list,
.year-stack,
.month-stack {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.card-header {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  margin-bottom: var(--space-md);
}

@media (min-width: 760px) {
  .card-header {
    align-items: flex-start;
    flex-direction: row;
    justify-content: space-between;
  }
}

.detail-card h3,
.event-card h4,
.award-card h3,
.skill-card h3,
.year-block h3 {
  color: var(--color-text-primary);
  font-size: var(--text-xl);
  margin: 0;
}

.role {
  color: var(--color-text-secondary);
  margin: 6px 0 0;
}

ul {
  color: var(--color-text-secondary);
  display: flex;
  flex-direction: column;
  gap: 8px;
  line-height: 1.6;
  margin: 0;
  padding-left: 1.1rem;
}

.activity-group + .activity-group {
  margin-top: var(--space-xl);
}

.group-title {
  color: var(--color-text-primary);
  font-size: var(--text-2xl);
  margin: 0 0 var(--space-md);
}

.event-card,
.award-card,
.skill-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.award-card p {
  color: var(--color-text-secondary);
  font-size: var(--text-base);
  line-height: 1.5;
  margin: 0;
}

.year-block {
  padding: 0 0 var(--space-xl);
}

.year-block h3 {
  color: var(--color-accent);
  font-family: var(--font-mono);
  margin-bottom: var(--space-md);
}

.month-row {
  border-left: 1px solid var(--color-border);
  display: grid;
  gap: var(--space-sm);
  grid-template-columns: 1fr;
  padding-left: var(--space-md);
}

@media (min-width: 820px) {
  .month-row {
    grid-template-columns: 220px 1fr;
  }
}

.month-label {
  color: var(--color-text-primary);
  font-weight: 700;
}

@media (max-width: 520px) {
  .page-title {
    font-size: var(--text-4xl);
  }

  .snapshot-item,
  .detail-card,
  .event-card,
  .award-card,
  .skill-card {
    padding: var(--space-md);
  }
}
</style>
