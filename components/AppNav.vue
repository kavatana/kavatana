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
