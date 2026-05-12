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
