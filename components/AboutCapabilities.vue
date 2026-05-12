<template>
  <div class="about-capabilities">
    <h2 class="card-heading">What I bring</h2>
    <ul class="capabilities-list">
      <li><span class="dash">&mdash;</span> Backend Development</li>
      <li><span class="dash">&mdash;</span> Full-Stack Web Apps</li>
      <li><span class="dash">&mdash;</span> DevOps & Deployment</li>
      <li><span class="dash">&mdash;</span> Product Architecture</li>
      <li><span class="dash">&mdash;</span> AI-Powered Products</li>
    </ul>
  </div>
</template>

<style scoped>
.about-capabilities {
  background-color: var(--color-surface-1);
  border: 1px solid var(--color-border);
  padding: var(--space-xl);
  margin: var(--space-xl) 0;
}

.card-heading {
  font-size: var(--text-xl);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-md) 0;
}

.capabilities-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-sm);
}

@media (min-width: 768px) {
  .capabilities-list {
    grid-template-columns: 1fr 1fr;
  }
}

.capabilities-list li {
  color: var(--color-text-primary);
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.dash {
  color: var(--color-accent);
}
</style>
