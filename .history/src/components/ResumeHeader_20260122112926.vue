<script setup>
defineProps({
  name: String,
  title: String,
  contact: Object,
  summary: String
})

const imageUrl = '/assets/HAN Haolin.jpg'
</script>

<template>
  <header class="resume-header" id="hero">
    <div class="header-content">
      <div class="profile-pic-container">
        <img :src="imageUrl" alt="Han Haolin" class="profile-pic">
      </div>
      <div class="text-info">
        <h1>{{ name }}</h1>
        <p class="subtitle">{{ title }}</p>
        <div class="contact-info">
          <span><i class="fas fa-phone"></i> {{ contact.phone }}</span> | 
          <a :href="'mailto:' + contact.email"><i class="fas fa-envelope"></i> {{ contact.email }}</a> | 
          <a :href="contact.linkedin" target="_blank"><i class="fab fa-linkedin"></i> LinkedIn</a> |
          <a :href="contact.github" target="_blank"><i class="fab fa-github"></i> GitHub</a>
        </div>
        <div class="about-me">
          <p>{{ summary }}</p>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.resume-header {
  padding: 100px 0 50px 0;
  margin-bottom: 2rem;
  text-align: center;
}

.header-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.text-info {
  max-width: 700px;
}

h1 {
  margin: 0;
  font-size: 3rem;
  text-transform: uppercase;
  letter-spacing: 4px;
  color: var(--primary-color);
}

.subtitle {
  font-size: 1.4rem;
  color: var(--accent-color);
  font-weight: 600;
  margin: 0.5rem 0;
  letter-spacing: 1px;
}

.contact-info {
  font-size: 1rem;
  color: var(--light-text);
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.contact-info i {
  color: var(--accent-color);
  margin-right: 4px;
}

.about-me {
  text-align: left;
  line-height: 1.8;
  font-size: 1.1rem;
  color: var(--text-color);
  background: #fcfcfc;
  padding: 1.5rem 2rem;
  border-radius: 12px;
  border-left: 4px solid var(--accent-color);
  box-shadow: 0 4px 15px rgba(0,0,0,0.02);
}

.profile-pic-container {
  width: 250px;
  height: 333px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  border: 4px solid white;
  transform-origin: center;
}

.profile-pic {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 768px) {
  h1 { font-size: 2.2rem; }
  .profile-pic-container {
    width: 200px;
    height: 266px;
    transform: scale(1.1); /* 移动端稍微缩小一点缩放倍数 */
  }
}
</style>
