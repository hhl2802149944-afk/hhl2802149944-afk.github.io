<script setup>
defineProps({
  project: Object
})
</script>

<template>
  <div class="project-card">
    <div class="project-header">
      <h3>{{ project.name }}</h3>
      <span class="date">{{ project.date }}</span>
    </div>
    <p class="role" v-if="project.role">{{ project.role }}</p>
    <ul class="details">
      <li v-for="(detail, index) in project.details" :key="index">
        {{ detail }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.project-card {
  background: var(--card-bg);
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  margin-bottom: 1rem;
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

h3 {
  margin: 0;
  font-size: 1.2rem;
}

.date {
  font-size: 0.85rem;
  color: #666;
}

.role {
  font-weight: bold;
  color: var(--accent-color);
  margin-bottom: 0.5rem;
}

.details {
  margin: 0;
  padding-left: 1.2rem;
  font-size: 0.95rem;
}

.details li {
  margin-bottom: 0.3rem;
}
</style>
