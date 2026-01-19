<script setup>
import { ref } from 'vue'

defineProps({
  name: String,
  title: String,
  contact: Object
})

const imageUrl = ref('/profile-placeholder.png')
const fileInput = ref(null)

const triggerUpload = () => {
  fileInput.value.click()
}

const handleUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    imageUrl.value = URL.createObjectURL(file)
  }
}
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
      <div class="profile-pic-container" @click="triggerUpload">
        <img :src="imageUrl" alt="Profile Picture" class="profile-pic">
        <div class="upload-overlay">Update Image</div>
        <input type="file" ref="fileInput" @change="handleUpload" accept="image/*" style="display: none">
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
  align-items: center;
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
  width: 120px;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  border: 2px dashed #ccc;
  background: #f8f9fa;
  margin-left: 20px;
}

.profile-pic {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.upload-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,0.5);
  color: white;
  font-size: 10px;
  text-align: center;
  padding: 4px 0;
  opacity: 0;
  transition: opacity 0.3s;
}

.profile-pic-container:hover .upload-overlay {
  opacity: 1;
}

@media (max-width: 600px) {
  .header-content {
    flex-direction: column-reverse;
    text-align: center;
  }
  .profile-pic-container {
    margin-left: 0;
    margin-bottom: 1rem;
    width: 100px;
    height: 100px;
    align-self: center;
  }
}
</style>
