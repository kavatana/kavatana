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
