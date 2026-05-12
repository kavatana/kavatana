const fs = require('fs');
const path = require('path');

const write = (p, content) => {
  const fullPath = path.resolve(p);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + '\n');
};

write('assets/styles/base.css', `
*, *::before, *::after {
  box-sizing: border-box;
}

* {
  margin: 0;
  padding: 0;
}

html, body {
  background-color: var(--color-bg);
  color: var(--color-text-primary);
  font-family: var(--font-sans);
  height: 100%;
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: var(--color-bg);
}
::-webkit-scrollbar-thumb {
  background: var(--color-accent);
  border-radius: var(--radius);
}

::selection {
  background: var(--color-accent);
  color: var(--color-bg);
}

:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
`);

write('components/AppContainer.vue', `
<template>
  <div class="app-container">
    <slot />
  </div>
</template>

<style scoped>
.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  width: 100%;
}

@media (min-width: 768px) {
  .app-container {
    padding: 0 48px;
  }
}

@media (min-width: 1024px) {
  .app-container {
    padding: 0 64px;
  }
}
</style>
`);

write('components/AppSkipLink.vue', `
<template>
  <a href="#main-content" class="skip-link">Skip to main content</a>
</template>

<style scoped>
.skip-link {
  position: absolute;
  top: -100px;
  left: 0;
  background-color: var(--color-accent);
  color: var(--color-bg);
  padding: var(--space-xs) var(--space-sm);
  z-index: 1000;
  font-weight: bold;
  text-decoration: none;
  transition: top var(--transition-fast);
}

.skip-link:focus-visible {
  top: 0;
}
</style>
`);

write('components/AppHeader.vue', `
<template>
  <header class="app-header">
    <AppContainer class="header-container">
      <NuxtLink to="/" class="wordmark">kavatana</NuxtLink>
      
      <nav aria-label="Main navigation" class="desktop-nav">
        <NuxtLink to="/projects" class="nav-link" active-class="active">Projects</NuxtLink>
        <NuxtLink to="/about" class="nav-link" active-class="active">About</NuxtLink>
        <NuxtLink to="/contact" class="nav-link" active-class="active">Contact</NuxtLink>
      </nav>
      
      <button class="mobile-toggle" @click="emit('open-nav')" aria-label="Open mobile navigation">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 12h18M3 6h18M3 18h18" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </AppContainer>
  </header>
</template>

<script setup lang="ts">
const emit = defineEmits(['open-nav'])
</script>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background-color: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
}

.wordmark {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--color-text-primary);
  text-decoration: none;
  font-weight: bold;
}

.desktop-nav {
  display: none;
  gap: var(--space-md);
}

@media (min-width: 768px) {
  .desktop-nav {
    display: flex;
  }
  .mobile-toggle {
    display: none;
  }
}

.nav-link {
  color: var(--color-text-secondary);
  text-decoration: none;
  font-size: var(--text-sm);
  padding: var(--space-xs) 0;
  transition: color var(--transition-fast);
  border-bottom: 2px solid transparent;
}

.nav-link:hover {
  color: var(--color-text-primary);
}

.nav-link.active {
  color: var(--color-text-primary);
  border-bottom-color: var(--color-accent);
}

.mobile-toggle {
  background: none;
  border: none;
  color: var(--color-text-primary);
  cursor: pointer;
  padding: var(--space-xs);
}
</style>
`);

write('components/AppNav.vue', `
<template>
  <div v-if="isOpen" class="nav-overlay" @click="close">
    <div class="nav-drawer" @click.stop role="dialog" aria-modal="true" aria-label="Mobile navigation" ref="drawer">
      <div class="drawer-header">
        <button class="close-button" @click="close" aria-label="Close mobile navigation">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
      <nav class="mobile-nav">
        <NuxtLink to="/projects" class="nav-link" active-class="active" @click="close">Projects</NuxtLink>
        <NuxtLink to="/about" class="nav-link" active-class="active" @click="close">About</NuxtLink>
        <NuxtLink to="/contact" class="nav-link" active-class="active" @click="close">Contact</NuxtLink>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted, watch, nextTick } from 'vue'

const props = defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['close'])
const drawer = ref<HTMLElement | null>(null)

const close = () => {
  emit('close')
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    close()
  }
  
  if (e.key === 'Tab' && drawer.value) {
    const focusableElements = drawer.value.querySelectorAll(
      'a[href], button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
    )
    if (!focusableElements.length) return
    
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus()
        e.preventDefault()
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus()
        e.preventDefault()
      }
    }
  }
}

watch(() => props.isOpen, async (newVal) => {
  if (newVal) {
    if (typeof document !== 'undefined') {
      document.addEventListener('keydown', handleKeydown)
      document.body.style.overflow = 'hidden'
      await nextTick()
      if (drawer.value) {
        const closeBtn = drawer.value.querySelector('.close-button') as HTMLElement
        closeBtn?.focus()
      }
    }
  } else {
    if (typeof document !== 'undefined') {
      document.removeEventListener('keydown', handleKeydown)
      document.body.style.overflow = ''
    }
  }
})

onUnmounted(() => {
  if (typeof document !== 'undefined') {
    document.removeEventListener('keydown', handleKeydown)
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.nav-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
}

.nav-drawer {
  position: fixed;
  top: 0;
  right: 0;
  width: 80%;
  max-width: 300px;
  height: 100%;
  background-color: var(--color-surface-1);
  border-left: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  padding: var(--space-md);
  box-shadow: -4px 0 15px rgba(0, 0, 0, 0.3);
}

.drawer-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: var(--space-lg);
}

.close-button {
  background: none;
  border: none;
  color: var(--color-text-primary);
  cursor: pointer;
  padding: var(--space-xs);
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.nav-link {
  color: var(--color-text-secondary);
  text-decoration: none;
  font-size: var(--text-lg);
  padding: var(--space-xs) 0;
}

.nav-link.active {
  color: var(--color-accent);
}
</style>
`);

write('components/AppFooter.vue', `
<template>
  <footer class="app-footer">
    <AppContainer class="footer-container">
      <div class="footer-left">
        <NuxtLink to="/" class="wordmark">kavatana</NuxtLink>
      </div>
      <div class="footer-center">
        <nav class="footer-nav">
          <NuxtLink to="/projects" class="nav-link">Projects</NuxtLink>
          <span class="separator">·</span>
          <NuxtLink to="/about" class="nav-link">About</NuxtLink>
          <span class="separator">·</span>
          <NuxtLink to="/contact" class="nav-link">Contact</NuxtLink>
        </nav>
      </div>
      <div class="footer-right">
        <a href="https://github.com/kavatana" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.45-1.16-1.1-1.47-1.1-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
        </a>
        <a href="https://linkedin.com/in/kavatana" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
        </a>
      </div>
    </AppContainer>
    <AppContainer class="copyright">
      <p>© {{ currentYear }} kavatana.</p>
    </AppContainer>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.app-footer {
  border-top: 1px solid var(--color-border);
  padding: var(--space-lg) 0 var(--space-md);
  margin-top: auto;
}

.footer-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
}

@media (min-width: 768px) {
  .footer-container {
    flex-direction: row;
    justify-content: space-between;
  }
}

.wordmark {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--color-text-primary);
  text-decoration: none;
  font-weight: bold;
}

.footer-nav {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.nav-link {
  color: var(--color-text-secondary);
  text-decoration: none;
  font-size: var(--text-sm);
  transition: color var(--transition-fast);
}

.nav-link:hover {
  color: var(--color-text-primary);
}

.separator {
  color: var(--color-text-muted);
}

.footer-right {
  display: flex;
  gap: var(--space-sm);
}

.footer-right a {
  color: var(--color-text-secondary);
  transition: color var(--transition-fast);
}

.footer-right a:hover {
  color: var(--color-text-primary);
}

.copyright {
  text-align: center;
  color: var(--color-text-muted);
  font-size: var(--text-xs);
  margin-top: var(--space-md);
}

@media (min-width: 768px) {
  .copyright {
    text-align: left;
  }
}
</style>
`);

write('layouts/default.vue', `
<template>
  <div class="layout-default">
    <AppSkipLink />
    <AppHeader @open-nav="isNavOpen = true" />
    <AppNav :is-open="isNavOpen" @close="isNavOpen = false" />
    
    <main id="main-content" class="main-content">
      <slot />
    </main>
    
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const isNavOpen = ref(false)
</script>

<style scoped>
.layout-default {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
}
</style>
`);

