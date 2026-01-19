<script setup>
import { ref } from 'vue'

defineProps({
  title: String,
  id: String
})

const isOpen = ref(false)
</script>

<template>
  <section :id="id" class="resume-section">
    <div class="section-header" @click="isOpen = !isOpen">
      <h2>{{ title }}</h2>
      <span class="toggle-icon" :class="{ 'is-open': isOpen }">▼</span>
    </div>
    <transition name="fade">
      <div v-if="isOpen" class="section-content">
        <slot></slot>
      </div>
    </transition>
  </section>
</template>

<style scoped>
.resume-section {
  margin-bottom: 1rem;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  border-bottom: 1px solid var(--border-color);
}

.section-header {
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background: #fff;
  transition: background 0.3s;
}

.section-header:hover {
  background: #fcfcfc;
}

h2 {
  font-size: 1.3rem;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--primary-color);
}

.toggle-icon {
  font-size: 0.8rem;
  transition: transform 0.3s;
  color: var(--light-text);
}

.toggle-icon.is-open {
  transform: rotate(180deg);
}

.section-content {
  padding: 0 2rem 2rem 2rem;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
