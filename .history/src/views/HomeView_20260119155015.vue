<script setup>
import NavBar from '../components/NavBar.vue'
import ResumeHeader from '../components/ResumeHeader.vue'
import ResumeSection from '../components/ResumeSection.vue'
import ProjectCard from '../components/ProjectCard.vue'

const resumeData = {
  name: "Han Haolin (韩浩霖)",
  title: "Artificial Intelligence Student",
  summary: "Hi, I'm HAN Haolin, Hank. I'm an undergraduate student majoring in Artificial Intelligence at Hong Kong Baptist University. I'm passionate about AI and robotics development. In 2025, I completed a three-month internship at EngineAI. Currently, I'm engaged in the entrepreneurial development of a water-based companion navigation robot.",
  contact: {
    phone: "+852 84030595",
    email: "23259612@life.hkbu.edu.hk",
    linkedin: "https://linkedin.com/in/HaolinHAN",
    github: "https://github.com/hhl2802149944-afk"
  },
  education: {
    school: "Hong Kong Baptist University",
    major: "Artificial Intelligence",
    gpa: "3.01/4",
    courses: ["Artificial Intelligence and Machine Learning", "Software Engineering", "Data Communications and Networking"]
  },
  experience: [
    {
      name: "EngineAI Robotics Technology Co., Ltd.",
      date: "May - Aug 2025",
      role: "Robot Embedded Software Intern",
      details: [
        "Learning robot embedded software development based on the Ubuntu system, conducting factory testing of products and developing with the Intel RealSense D435i.",
        "Participate in world-class artificial intelligence exhibitions such as Macau EXPO and WRC, showcasing company products while conducting market research and sales activities"
      ]
    },
    {
      name: "Student Helper for Computer Science",
      date: "Nov - Dec 2024",
      role: "Hong Kong Baptist University",
      details: [
        "Facilitated weekly Python programming labs under professor supervision.",
        "Providing hands-on coding guidance to 30+ undergraduate students."
      ]
    }
  ],
  projects: [
    {
      name: "Internship Management System Documentation",
      date: "Oct 2025 - Dec 2025",
      role: "Software Engineering Project",
      details: [
        "Proposal for Enhancements and Testing Plan for the Internship System.",
        "Total: 105 pages, 13,377 words."
      ]
    },
    {
      name: "Online Multiplayer Drawing and Chat Platform",
      date: "2025",
      role: "Full-Stack Developer",
      details: [
        "Designed and implemented a real-time multiplayer drawing and chat system.",
        "Full-Stack Design for a Library Management Website."
      ]
    },
    {
      name: "Java Game Development Portfolio",
      date: "2024",
      role: "Game Programmer",
      details: [
        "Successfully developed three classic games: Labyrinth, Tetris, and Modern Art.",
        "Designed and developed an original computer game as an independent project."
      ]
    },
    {
      name: "Soccer Recognition AI System",
      date: "2025",
      role: "AI Developer",
      details: [
        "Developed an autonomous model for identifying and tracking players and the ball in soccer footage.",
        "Implemented computer vision algorithms to process real-time sports video data."
      ]
    }
  ],
  extracurricular: [
    {
      name: "Internal Vice President",
      date: "Apr 2024 - Apr 2025",
      role: "HKBU Chinese Students and Scholars Association",
      details: [
        "Communicated with executive board members, organized team building, and improved cohesion.",
        "Organised a two-week orientation programme for 300 new mainland students.",
        "Managed a total of 13 events during the year."
      ]
    },
    {
      name: "ROBOCON 2025，HKBU",
      date: "Dec 2024 - Jan 2025",
      role: "Mechanical Design and Programming Engineer",
      details: [
        "Mechanical designer for the HKBU team in the 2025 Robocon robotics competition.",
        "Assisted with site identification and programming of AI autonomous task modules."
      ]
    }
  ],
  skills: {
    programming: ["Python", "Java", "Javascript", "HTML", "Markdown"],
    ai_tech: ["CNN", "RNN", "GAN", "Ubuntu"],
    publicity: ["Canva", "WeChat Public", "Capcut"]
  },
  languages: [
    { name: "Mandarin", level: "Native" },
    { name: "English", level: "Fluent" },
    { name: "Cantonese", level: "Basic" }
  ]
}
</script>

<template>
  <NavBar />
  <main class="resume-container">
    <ResumeHeader 
      :name="resumeData.name" 
      :title="resumeData.title" 
      :contact="resumeData.contact" 
      :summary="resumeData.summary"
    />

    <ResumeSection title="Education" id="education">
      <div class="education-item">
        <div class="edu-header">
          <h3>{{ resumeData.education.school }}</h3>
          <span class="gpa">cGPA: {{ resumeData.education.gpa }}</span>
        </div>
        <p class="major">Major: {{ resumeData.education.major }}</p>
        <p class="courses"><strong>Core Courses:</strong> {{ resumeData.education.courses.join(', ') }}</p>
      </div>
    </ResumeSection>

    <ResumeSection title="Working Experience" id="experience">
      <ProjectCard 
        v-for="(exp, index) in resumeData.experience" 
        :key="index" 
        :project="exp" 
      />
    </ResumeSection>

    <ResumeSection title="Projects" id="projects">
      <ProjectCard 
        v-for="(proj, index) in resumeData.projects" 
        :key="index" 
        :project="proj" 
      />
    </ResumeSection>

    <ResumeSection title="Extracurricular Activity" id="extracurricular">
      <ProjectCard 
        v-for="(item, index) in resumeData.extracurricular" 
        :key="index" 
        :project="item" 
      />
    </ResumeSection>

    <ResumeSection title="Skills & Languages" id="skills">
      <div class="skills-lang-grid">
        <div class="skills-grid">
          <div class="skill-category">
            <h4>Programming</h4>
            <div class="skill-tags">
              <span v-for="skill in resumeData.skills.programming" :key="skill" class="tag">{{ skill }}</span>
            </div>
          </div>
          <div class="skill-category">
            <h4>AI & Tools</h4>
            <div class="skill-tags">
              <span v-for="skill in resumeData.skills.ai_tech" :key="skill" class="tag">{{ skill }}</span>
            </div>
          </div>
          <div class="skill-category">
            <h4>Publicity & Design</h4>
            <div class="skill-tags">
              <span v-for="skill in resumeData.skills.publicity" :key="skill" class="tag">{{ skill }}</span>
            </div>
          </div>
        </div>

        <div class="lang-list">
          <div v-for="lang in resumeData.languages" :key="lang.name" class="lang-item">
            <span class="lang-name">{{ lang.name }}</span>
            <span class="lang-level">{{ lang.level }}</span>
          </div>
        </div>
      </div>
    </ResumeSection>
  </main>
</template>

<style scoped>
.resume-container {
  padding-bottom: 50px;
}

.education-item {
  margin-bottom: 1.5rem;
}

.edu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.major {
  font-weight: bold;
  color: var(--accent-color);
  margin: 0.2rem 0;
}

.courses {
  font-size: 0.9rem;
  color: #555;
}

.skills-lang-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  align-items: start;
}

.skills-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.skill-category h4 {
  margin-bottom: 1rem;
  color: var(--secondary-color);
  border-bottom: 1px solid #ddd;
  padding-bottom: 0.3rem;
  font-size: 1rem;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background: #eef2f7;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.85rem;
  color: var(--primary-color);
}

.lang-list {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.lang-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  background: white;
  border-radius: 4px;
  border-left: 3px solid var(--accent-color);
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.lang-name {
  font-weight: bold;
}

.lang-level {
  color: #666;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .skills-lang-grid {
    grid-template-columns: 1fr;
  }
}
</style>
