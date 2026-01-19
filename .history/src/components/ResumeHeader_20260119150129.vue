<script setup>
defineProps({
  name: String,
  title: String,
  contact: Object
})

const imageUrl = '/assets/HAN Haolin.jpg'
</script>

<template>
  <header class="resume-header">
    <div class="header-content">
      <div class="text-info">
        <h1>{{ name }}</h1>
        <p class="subtitle">{{ title }}</p>
        <div class="contact-info">
          <span>{{ contact.phone }}</span> | 
          <a :href="'mailto:' + contact.email">{{ contact.email }}</a> | 
          <a :href="contact.linkedin" target="_blank">LinkedIn</a>
        </div>
      </div>
      <div class="profile-pic-container">
        <img :src="imageUrl" alt="Han Haolin" class="profile-pic">
      </div>
    </div>
  </header>
</template>

<style scoped>
.resume-header {
  margin-bottom: 3rem;
  border-bottom: 2px solid var(--accent-color);
  padding-bottom: 1.5rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start; /* Align to top instead of center for larger pics */
}

.text-info {
  flex: 1;
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

.profile-pic-container {
  width: 240px; /* Doubled from 120px */
  height: 320px; /* 4:3 Aspect Ratio (240 / 3 * 4) */
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  background: #f8f9fa;
  margin-left: 30px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  border: 1px solid var(--border-color);
}

.profile-pic {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column-reverse;
    text-align: center;
    align-items: center;
  }
  .profile-pic-container {
    margin-left: 0;
    margin-bottom: 1.5rem;
    width: 200px;
    height: 266px;
  }
}
</style>
