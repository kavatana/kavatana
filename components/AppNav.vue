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
        <NuxtLink to="/#now" class="nav-link" active-class="active" @click="close">Now</NuxtLink>
        <NuxtLink to="/about" class="nav-link" active-class="active" @click="close">About</NuxtLink>
        <NuxtLink to="/journey" class="nav-link" active-class="active" @click="close">Journey</NuxtLink>
        <NuxtLink to="/contact" class="nav-link" active-class="active" @click="close">Contact</NuxtLink>
        <div class="nav-divider"></div>
        <button class="nav-link theme-link" @click="toggleTheme">
          <span v-if="theme === 'dark'">Switch to Light Mode</span>
          <span v-else>Switch to Dark Mode</span>
          <svg v-if="theme === 'dark'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
          <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </button>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted, watch, nextTick, onMounted } from 'vue'

const props = defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['close'])
const drawer = ref<HTMLElement | null>(null)
const theme = ref('dark')

onMounted(() => {
  theme.value = document.documentElement.getAttribute('data-theme') || 'dark'
  
  window.addEventListener('theme-changed', ((e: CustomEvent) => {
    theme.value = e.detail
  }) as EventListener)
})

const toggleTheme = () => {
  const newTheme = theme.value === 'dark' ? 'light' : 'dark'
  theme.value = newTheme
  document.documentElement.setAttribute('data-theme', newTheme)
  localStorage.setItem('theme', newTheme)
  
  // Dispatch custom event for AppHeader sync
  window.dispatchEvent(new CustomEvent('theme-changed', { detail: newTheme }))
}

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
  transform: translateX(100%);
  animation: slide-in 0.3s forwards ease-out;
}

@keyframes slide-in {
  to { transform: translateX(0); }
}

@media (prefers-reduced-motion: reduce) {
  .nav-drawer {
    animation: none;
    transform: translateX(0);
  }
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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: var(--target-min-size);
  min-height: var(--target-min-size);
  padding: 0;
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.nav-link {
  display: flex;
  align-items: center;
  min-height: var(--target-min-size);
  color: var(--color-text-secondary);
  text-decoration: none;
  font-size: var(--text-lg);
  padding: var(--space-sm) 0;
  font-weight: 500;
}

.nav-link.active {
  color: var(--color-accent);
}

.nav-divider {
  height: 1px;
  background-color: var(--color-border);
  margin: var(--space-sm) 0;
}

.theme-link {
  background: none;
  border: none;
  font-family: inherit;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  text-align: left;
}
</style>
