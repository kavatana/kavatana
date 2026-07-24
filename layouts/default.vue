<template>
  <div class="layout-default">
    <div class="horizon-glow" aria-hidden="true"></div>
    <AppSkipLink />
    <AppHeader @open-nav="isNavOpen = true" />
    <AppNav :is-open="isNavOpen" @close="isNavOpen = false" />
    
    <main id="main-content" class="main-content">
      <slot />
    </main>
    
    <AppFooter />
    <PortfolioConcierge />
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
