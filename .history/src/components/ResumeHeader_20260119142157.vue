<script setup>
defineProps({
  name: String,
  title: String,
  contact: Object
})
</script>

<template>
  <header class="resume-header">
    <h1>{{ name }}</h1>
    <p class="subtitle">{{ title }}</p>
    <div class="contact-info">
      <span>{{ contact.phone }}</span> | 
      <a :href="'mailto:' + contact.email">{{ contact.email }}</a> | 
      <a :href="contact.linkedin" target="_blank">LinkedIn</a>
    </div>
  </header>
</template>

<style scoped>
.resume-header {
  text-align: center;
  margin-bottom: 3rem;
  border-bottom: 2px solid var(--accent-color);
  padding-bottom: 1rem;
}

h1 {
  margin: 0;
  font-size: 2.5rem;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.subtitle {
  font-size: 1.2rem;
  color: var(--secondary-color);
  margin: 0.5rem 0;
}

.contact-info {
  font-size: 0.9rem;
}
</style>
