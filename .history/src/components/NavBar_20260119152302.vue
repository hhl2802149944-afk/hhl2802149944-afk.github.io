<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)

const sections = [
  { id: 'education', name: 'Education' },
  { id: 'experience', name: 'Working Experience' },
  { id: 'projects', name: 'Projects' },
  { id: 'extracurricular', name: 'Extracurricular' },
  { id: 'skills', name: 'Skills & Languages' }
]

const scrollToSection = (id) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
  isMenuOpen.value = false
}
</script>

<template>
  <nav class="navbar">
    <div class="nav-container">
      <div class="nav-logo" @click="scrollToSection('hero')">HAN HAOLIN</div>
      
      <div class="nav-links" :class="{ 'nav-active': isMenuOpen }">
        <div v-for="section in sections" 
             :key="section.id" 
             class="nav-item" 
             @click="scrollToSection(section.id)">
          {{ section.name }}
        </div>
      </div>

      <div class="burger" @click="isMenuOpen = !isMenuOpen">
        <div class="line1"></div>
        <div class="line2"></div>
        <div class="line3"></div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.nav-container {
  width: 90%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  font-weight: bold;
  font-size: 1.2rem;
  letter-spacing: 2px;
  cursor: pointer;
  color: var(--primary-color);
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-item {
  cursor: pointer;
  font-weight: 500;
  color: var(--secondary-color);
  transition: color 0.3s;
  font-size: 0.9rem;
  text-transform: uppercase;
}

.nav-item:hover {
  color: var(--accent-color);
}

.burger {
  display: none;
  cursor: pointer;
}

.burger div {
  width: 25px;
  height: 3px;
  background-color: var(--primary-color);
  margin: 5px;
  transition: all 0.3s ease;
}

@media screen and (max-width: 768px) {
  .nav-links {
    position: absolute;
    right: 0px;
    height: 92vh;
    top: 70px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    transform: translateX(100%);
    transition: transform 0.5s ease-in;
    padding-top: 2rem;
  }
  
  .nav-links.nav-active {
    transform: translateX(0%);
  }

  .burger {
    display: block;
  }
}
</style>
