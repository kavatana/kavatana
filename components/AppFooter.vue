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
        <a href="https://www.linkedin.com/in/ka-vatana-99b85440a/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: var(--target-min-size);
  min-height: var(--target-min-size);
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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: var(--target-min-size);
  min-height: var(--target-min-size);
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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: var(--target-min-size);
  min-height: var(--target-min-size);
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
