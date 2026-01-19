<script setup>
defineProps({
  title: String
})
</script>

<template>
  <section class="resume-section">
    <h2>{{ title }}</h2>
    <div class="section-content">
      <slot></slot>
    </div>
  </section>
</template>

<style scoped>
.resume-section {
  margin-bottom: 2.5rem;
}

h2 {
  font-size: 1.5rem;
  border-left: 4px solid var(--accent-color);
  padding-left: 1rem;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
}
</style>
