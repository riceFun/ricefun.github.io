<script setup lang="ts">
import { ref, onMounted } from 'vue'

const skills = ref([
  { name: 'Flutter', level: 95 },
  { name: 'iOS (Objective-C)', level: 90 },
  { name: 'Vue.js', level: 85 },
  { name: 'React', level: 85 },
  { name: 'TypeScript', level: 80 },
])

const projects = ref([
  {
    title: '智能家居 App',
    description: '百万级用户的智能家居应用，主导 Flutter 化 0 → 1，涉及蓝牙通信、权限管理等',
    tech: ['Flutter', 'Dart', 'Provider', 'BLE'],
    link: 'https://github.com/ricefun'
  },
  {
    title: 'VR 看房平台',
    description: 'VR 看房类 App 及小程序，负责 iOS 核心模块和 Flutter 架构设计',
    tech: ['iOS', 'Flutter', 'Taro', 'React'],
    link: 'https://github.com/ricefun'
  },
  {
    title: '政务服务 App',
    description: '千万级用户的政务服务应用，通过二进制重排优化启动速度提升 18%',
    tech: ['iOS', 'Objective-C', 'Runtime', 'Performance'],
    link: 'https://github.com/ricefun'
  }
])

const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero" :class="{ 'visible': isVisible }">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">
            <span class="greeting">你好，我是</span>
            <span class="name">Elecarder</span>
          </h1>
          <p class="hero-subtitle">
            <span class="typing-text">前端 / 移动端开发工程师 | Flutter 专家 | iOS 开发者</span>
          </p>
          <p class="hero-description">
            移动端与前端开发经验丰富，精通 Flutter、iOS、Vue、React。
            擅长架构设计与性能优化，多次主导 0 → 1 项目落地。
          </p>
          <div class="hero-buttons">
            <a href="#projects" class="btn btn-primary">查看项目</a>
            <a href="#contact" class="btn btn-secondary">联系我</a>
          </div>
        </div>
        <div class="hero-visual">
          <div class="code-window">
            <div class="window-header">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
            </div>
            <div class="window-content">
              <pre><code><span class="keyword">class</span> <span class="variable">Developer</span> {
  <span class="keyword">final</span> <span class="property">name</span> = <span class="string">'Elecarder'</span>;
  <span class="keyword">final</span> <span class="property">skills</span> = [
    <span class="string">'Flutter'</span>, <span class="string">'iOS'</span>, <span class="string">'Vue'</span>, <span class="string">'React'</span>
  ];
  <span class="keyword">final</span> <span class="property">passion</span> = <span class="string">'Coding'</span>;
  <span class="keyword">final</span> <span class="property">status</span> = <span class="string">'Available'</span>;
}</code></pre>
            </div>
          </div>
        </div>
      </div>
      <div class="scroll-indicator">
        <span>向下滚动</span>
        <div class="arrow">↓</div>
      </div>
    </section>

    <!-- Skills Section -->
    <section id="skills" class="skills-section">
      <div class="container">
        <h2 class="section-title">技能专长</h2>
        <div class="skills-grid">
          <div v-for="skill in skills" :key="skill.name" class="skill-card">
            <div class="skill-header">
              <h3>{{ skill.name }}</h3>
              <span class="skill-percentage">{{ skill.level }}%</span>
            </div>
            <div class="skill-bar">
              <div class="skill-progress" :style="{ width: skill.level + '%' }"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="projects-section">
      <div class="container">
        <h2 class="section-title">精选项目</h2>
        <div class="projects-grid">
          <div v-for="project in projects" :key="project.title" class="project-card">
            <div class="project-content">
              <h3 class="project-title">{{ project.title }}</h3>
              <p class="project-description">{{ project.description }}</p>
              <div class="project-tech">
                <span v-for="tech in project.tech" :key="tech" class="tech-tag">
                  {{ tech }}
                </span>
              </div>
              <a :href="project.link" target="_blank" class="project-link">
                查看详情 →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact-section">
      <div class="container">
        <h2 class="section-title">联系方式</h2>
        <div class="contact-content">
          <p class="contact-text">
            如果你对我的项目感兴趣，或者想要合作，欢迎通过以下方式联系我：
          </p>
          <div class="contact-links">
            <a href="https://github.com/ricefun" target="_blank" class="contact-link">
              <span class="icon">💻</span>
              <span>GitHub</span>
            </a>
            <a href="mailto:adolphbaofan@gmail.com" class="contact-link">
              <span class="icon">📧</span>
              <span>Email</span>
            </a>
            <a href="https://t.me/Elecarder" target="_blank" class="contact-link">
              <span class="icon">💬</span>
              <span>Telegram</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home {
  padding-top: 70px;
}

/* Hero Section */
.hero {
  min-height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 20% 50%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(255, 0, 110, 0.1) 0%, transparent 50%);
  animation: pulse 8s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

.hero-content {
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 1;
  opacity: 0;
  transform: translateY(30px);
  transition: all 1s ease-out;
}

.hero.visible .hero-content {
  opacity: 1;
  transform: translateY(0);
}

.hero-text {
  color: var(--text-light);
}

.greeting {
  display: block;
  font-size: 1.5rem;
  color: var(--text-gray);
  margin-bottom: 0.5rem;
}

.name {
  display: block;
  font-size: 4rem;
  font-weight: bold;
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
}

.typing-text {
  border-right: 2px solid var(--primary-color);
  animation: blink 0.7s step-end infinite;
}

@keyframes blink {
  50% { border-color: transparent; }
}

.hero-description {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-gray);
  margin-bottom: 2rem;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 0.8rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-block;
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  box-shadow: 0 4px 15px rgba(0, 212, 255, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 212, 255, 0.5);
}

.btn-secondary {
  background: transparent;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
}

.btn-secondary:hover {
  background: var(--primary-color);
  color: white;
}

/* Code Window */
.code-window {
  background: rgba(0, 0, 0, 0.5);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(0, 212, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 212, 255, 0.2);
}

.window-header {
  background: rgba(0, 0, 0, 0.3);
  padding: 0.8rem;
  display: flex;
  gap: 0.5rem;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.dot.red { background: #ff5f56; }
.dot.yellow { background: #ffbd2e; }
.dot.green { background: #27c93f; }

.window-content {
  padding: 1.5rem;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
}

.window-content code {
  color: var(--text-light);
}

.keyword { color: #ff79c6; }
.variable { color: #50fa7b; }
.property { color: #8be9fd; }
.string { color: #f1fa8c; }

/* Scroll Indicator */
.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: var(--text-gray);
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
  40% { transform: translateX(-50%) translateY(-10px); }
  60% { transform: translateX(-50%) translateY(-5px); }
}

.arrow {
  font-size: 1.5rem;
  margin-top: 0.5rem;
}

/* Sections */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

.section-title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: var(--text-light);
  position: relative;
}

.section-title::after {
  content: '';
  display: block;
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
  margin: 1rem auto 0;
  border-radius: 2px;
}

/* Skills Section */
.skills-section {
  background: rgba(0, 0, 0, 0.2);
}

.skills-grid {
  display: grid;
  gap: 2rem;
}

.skill-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 12px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.skill-card:hover {
  transform: translateY(-5px);
  border-color: var(--primary-color);
  box-shadow: 0 8px 24px rgba(0, 212, 255, 0.2);
}

.skill-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.skill-header h3 {
  color: var(--text-light);
  font-size: 1.2rem;
}

.skill-percentage {
  color: var(--primary-color);
  font-weight: bold;
}

.skill-bar {
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
  border-radius: 4px;
  transition: width 1s ease-out;
}

/* Projects Section */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.project-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 12px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.project-card:hover {
  transform: translateY(-10px);
  border-color: var(--primary-color);
  box-shadow: 0 12px 32px rgba(0, 212, 255, 0.3);
}

.project-title {
  color: var(--text-light);
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.project-description {
  color: var(--text-gray);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tech-tag {
  background: rgba(0, 212, 255, 0.1);
  color: var(--primary-color);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  border: 1px solid rgba(0, 212, 255, 0.3);
}

.project-link {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.project-link:hover {
  color: var(--accent-color);
}

/* Contact Section */
.contact-section {
  background: rgba(0, 0, 0, 0.2);
}

.contact-content {
  text-align: center;
}

.contact-text {
  color: var(--text-gray);
  font-size: 1.1rem;
  margin-bottom: 2rem;
  line-height: 1.8;
}

.contact-links {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.contact-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem 2rem;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 12px;
  text-decoration: none;
  color: var(--text-light);
  transition: all 0.3s ease;
  min-width: 120px;
}

.contact-link:hover {
  transform: translateY(-5px);
  border-color: var(--primary-color);
  box-shadow: 0 8px 24px rgba(0, 212, 255, 0.3);
}

.contact-link .icon {
  font-size: 2rem;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .name {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .hero-buttons {
    flex-direction: column;
  }

  .section-title {
    font-size: 2rem;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }

  .contact-links {
    flex-direction: column;
    align-items: center;
  }
}
</style>
