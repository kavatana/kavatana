<template>
  <a href="#main-content" class="skip-link">Skip to main content</a>
</template>

<style scoped>
.skip-link {
  position: absolute;
  top: -100px;
  left: 0;
  display: inline-flex;
  align-items: center;
  min-height: var(--target-min-size);
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
