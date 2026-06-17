<template>
  <header class="app-header">
    <AppContainer class="header-container">
      <NuxtLink to="/" class="wordmark">kavatana</NuxtLink>
      
      <nav aria-label="Main navigation" class="desktop-nav">
        <NuxtLink to="/projects" class="nav-link" active-class="active">Projects</NuxtLink>
        <NuxtLink to="/about" class="nav-link" active-class="active">About</NuxtLink>
        <NuxtLink to="/contact" class="nav-link" active-class="active">Contact</NuxtLink>
        <button class="theme-toggle" @click="toggleTheme" aria-label="Toggle theme">
          <svg v-if="theme === 'dark'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
          <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </button>
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
import { ref, onMounted } from 'vue'

const theme = ref('dark')

onMounted(() => {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark'
  theme.value = currentTheme
  
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      const newTheme = e.matches ? 'light' : 'dark'
      document.documentElement.setAttribute('data-theme', newTheme)
      theme.value = newTheme
    }
  })
})

const toggleTheme = () => {
  const newTheme = theme.value === 'dark' ? 'light' : 'dark'
  theme.value = newTheme
  document.documentElement.setAttribute('data-theme', newTheme)
  localStorage.setItem('theme', newTheme)
  
  // Dispatch custom event for AppNav sync
  window.dispatchEvent(new CustomEvent('theme-changed', { detail: newTheme }))
}

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
  align-items: center;
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

.theme-toggle {
  background: none;
  border: none;
  color: var(--color-text-secondary);
  cursor: pointer;
  padding: var(--space-xs);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color var(--transition-fast);
}

.theme-toggle:hover {
  color: var(--color-text-primary);
}
</style>
