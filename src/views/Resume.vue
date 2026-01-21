<script setup lang="ts">
import { ref } from 'vue'

interface Experience {
  company: string
  position: string
  period: string
  description: string[]
}

interface Education {
  school: string
  degree: string
  major: string
  period: string
}

const personalInfo = ref({
  name: 'Elecarder',
  title: '前端 / 移动端开发工程师',
  email: 'adolphbaofan@gmail.com',
  location: '杭州',
  telegram: 'Elecarder',
  github: 'https://github.com/ricefun',
  website: 'https://ricefun.github.io'
})

const summary = ref(
  '移动端 / 前端双栈成熟工程经验，多次 0 → 1 项目与架构设计经验。' +
  '精通 Objective-C、Dart、Flutter，熟悉 Swift、Vue、React。' +
  '千万级用户 App 开发与长期维护经验，具有良好的代码规范和团队协作能力。'
)

const skills = ref({
  mobile: ['Objective-C', 'Dart', 'Swift', 'Flutter', 'iOS', 'Runtime', 'RunLoop', 'GCD / NSOperation'],
  frontend: ['Vue', 'React / React Hooks', 'Taro', 'TypeScript', 'JavaScript (ES6+)', 'HTML5/CSS3', 'Webpack/Vite'],
  architecture: ['MVC / MVVM', '模块化', '组件化', '全局路由设计', 'Plugin / Package 开发', '混合架构'],
  optimization: ['启动速度优化', '界面流畅度优化', 'Instrument', 'LLDB', '内存管理', '性能调优'],
  tools: ['CocoaPods', 'pub', 'npm', 'Git', 'SVN', '蓝牙', 'PlatformView', 'Stream', 'Provider']
})

const experience = ref<Experience[]>([
  {
    company: '某智能硬件公司',
    position: '移动端 Flutter + 前端',
    period: '2023.04 - 至今',
    description: [
      '智能家居类 App，用户规模百万级',
      '担任 Scrum Master，主导 App Flutter 化 0 → 1',
      '将原生 SDK 封装为 Flutter Plugin，统一 Flutter 调用',
      '涉及蓝牙通信、权限管理、PlatformView、Provider、Stream',
      '负责团队 Flutter 技术培训与代码评审'
    ]
  },
  {
    company: '某互联网家居平台',
    position: '移动端 + 前端',
    period: '2020.09 - 2023.02',
    description: [
      'VR 看房类 App / 小程序 / 后台系统',
      'iOS 独立负责核心模块，抽象私有 Framework 并对外提供',
      '主导 Flutter 版本整体架构设计（网络层、路由、适配方案）',
      '开发 Flutter Package（仿 iOS Group List 组件）',
      '小程序技术栈：Taro，支持语音 + 实时看房',
      '后台系统技术栈：React / React Hooks'
    ]
  },
  {
    company: '某政务与企业服务公司',
    position: '移动端 iOS',
    period: '2018.03 - 2020.09',
    description: [
      '政务服务类 App（千万级用户规模）',
      '国家级能源行业 App',
      '负责 UI 组件、支付、分享等核心模块',
      '通过二进制重排，App 启动速度提升 18%',
      '参与多个大型项目的长期维护与重构'
    ]
  },
  {
    company: '某智能硬件公司',
    position: '移动端 iOS',
    period: '2016.07 - 2018.03',
    description: [
      '视频监控与智能硬件类 App（百万级用户）',
      '负责视频播放、设备控制、报警与远程监控',
      '接入 IP Camera / DVR / NVR 等硬件设备'
    ]
  }
])

const education = ref<Education[]>([
  {
    school: '电子科技大学中山学院',
    degree: '本科',
    major: '计算机相关专业',
    period: '2012.09 - 2016.06'
  }
])

const downloadResume = () => {
  alert('简历下载功能开发中...')
}

const printResume = () => {
  window.print()
}
</script>

<template>
  <div class="resume">
    <div class="resume-container">
      <!-- Header -->
      <header class="resume-header">
        <div class="header-content">
          <h1 class="name">{{ personalInfo.name }}</h1>
          <p class="title">{{ personalInfo.title }}</p>
        </div>
        <!-- <div class="header-actions">
          <button @click="downloadResume" class="action-btn">
            <span>📥</span> 下载简历
          </button>
          <button @click="printResume" class="action-btn">
            <span>🖨️</span> 打印
          </button>
        </div> -->
      </header>

      <!-- Contact Info -->
      <section class="section contact-section">
        <div class="contact-grid">
          <div class="contact-item">
            <span class="icon">📧</span>
            <a :href="`mailto:${personalInfo.email}`">{{ personalInfo.email }}</a>
          </div>
          <div class="contact-item">
            <span class="icon">💬</span>
            <span>TG: {{ personalInfo.telegram }}</span>
          </div>
          <!-- <div class="contact-item">
            <span class="icon">📍</span>
            <span>{{ personalInfo.location }}</span>
          </div> -->
        </div>
      </section>

      <!-- Summary -->
      <section class="section">
        <h2 class="section-title">个人简介</h2>
        <p class="summary-text">{{ summary }}</p>
      </section>

      <!-- Skills -->
      <section class="section">
        <h2 class="section-title">技术能力</h2>
        <div class="skills-container">
          <div class="skill-category">
            <h3 class="skill-category-title">移动端技术</h3>
            <div class="skill-tags">
              <span v-for="skill in skills.mobile" :key="skill" class="skill-tag">
                {{ skill }}
              </span>
            </div>
          </div>
          <div class="skill-category">
            <h3 class="skill-category-title">前端技术</h3>
            <div class="skill-tags">
              <span v-for="skill in skills.frontend" :key="skill" class="skill-tag">
                {{ skill }}
              </span>
            </div>
          </div>
          <div class="skill-category">
            <h3 class="skill-category-title">架构设计</h3>
            <div class="skill-tags">
              <span v-for="skill in skills.architecture" :key="skill" class="skill-tag">
                {{ skill }}
              </span>
            </div>
          </div>
          <div class="skill-category">
            <h3 class="skill-category-title">性能优化</h3>
            <div class="skill-tags">
              <span v-for="skill in skills.optimization" :key="skill" class="skill-tag">
                {{ skill }}
              </span>
            </div>
          </div>
          <div class="skill-category">
            <h3 class="skill-category-title">工具 & 其他</h3>
            <div class="skill-tags">
              <span v-for="skill in skills.tools" :key="skill" class="skill-tag">
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- Experience -->
      <section class="section">
        <h2 class="section-title">工作经历</h2>
        <div class="timeline">
          <div v-for="(exp, index) in experience" :key="index" class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
              <div class="timeline-header">
                <h3 class="company">{{ exp.company }}</h3>
                <span class="period">{{ exp.period }}</span>
              </div>
              <p class="position">{{ exp.position }}</p>
              <ul class="description-list">
                <li v-for="(desc, i) in exp.description" :key="i">{{ desc }}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Education -->
      <section class="section">
        <h2 class="section-title">教育背景</h2>
        <div v-for="(edu, index) in education" :key="index" class="education-item">
          <div class="education-header">
            <h3 class="school">{{ edu.school }}</h3>
            <span class="period">{{ edu.period }}</span>
          </div>
          <p class="degree">{{ edu.degree }} · {{ edu.major }}</p>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.resume {
  min-height: 100vh;
  padding: 100px 2rem 4rem;
  background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0f1729 100%);
}

.resume-container {
  max-width: 900px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 3rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

/* Header */
.resume-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid rgba(0, 212, 255, 0.3);
}

.name {
  font-size: 2.5rem;
  font-weight: bold;
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
}

.title {
  font-size: 1.3rem;
  color: var(--text-gray);
}

.header-actions {
  display: flex;
  gap: 1rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid var(--primary-color);
  border-radius: 8px;
  color: var(--primary-color);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.action-btn:hover {
  background: var(--primary-color);
  color: white;
  transform: translateY(-2px);
}

/* Contact Section */
.contact-section {
  background: rgba(0, 212, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(0, 212, 255, 0.2);
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-light);
}

.contact-item .icon {
  font-size: 1.2rem;
}

.contact-item a {
  color: var(--primary-color);
  text-decoration: none;
  transition: color 0.3s ease;
}

.contact-item a:hover {
  color: var(--accent-color);
}

/* Section */
.section {
  margin-bottom: 2.5rem;
}

.section-title {
  font-size: 1.8rem;
  color: var(--text-light);
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid rgba(0, 212, 255, 0.3);
  position: relative;
}

.section-title::before {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
}

/* Summary */
.summary-text {
  color: var(--text-gray);
  line-height: 1.8;
  font-size: 1.05rem;
}

/* Skills */
.skills-container {
  display: grid;
  gap: 1.5rem;
}

.skill-category {
  background: rgba(0, 0, 0, 0.2);
  padding: 1.2rem;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.skill-category-title {
  color: var(--primary-color);
  font-size: 1.1rem;
  margin-bottom: 0.8rem;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.skill-tag {
  background: rgba(0, 212, 255, 0.1);
  color: var(--text-light);
  padding: 0.4rem 0.9rem;
  border-radius: 20px;
  font-size: 0.9rem;
  border: 1px solid rgba(0, 212, 255, 0.3);
  transition: all 0.3s ease;
}

.skill-tag:hover {
  background: rgba(0, 212, 255, 0.2);
  border-color: var(--primary-color);
  transform: translateY(-2px);
}

/* Timeline */
.timeline {
  position: relative;
  padding-left: 2rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, var(--primary-color), var(--accent-color));
}

.timeline-item {
  position: relative;
  margin-bottom: 2rem;
}

.timeline-marker {
  position: absolute;
  left: -2.4rem;
  top: 0.3rem;
  width: 12px;
  height: 12px;
  background: var(--primary-color);
  border-radius: 50%;
  box-shadow: 0 0 0 4px rgba(0, 212, 255, 0.2);
}

.timeline-content {
  background: rgba(0, 0, 0, 0.2);
  padding: 1.5rem;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.company {
  color: var(--text-light);
  font-size: 1.3rem;
}

.period {
  color: var(--primary-color);
  font-size: 0.9rem;
}

.position {
  color: var(--text-gray);
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.description-list {
  list-style: none;
  padding: 0;
}

.description-list li {
  color: var(--text-gray);
  line-height: 1.8;
  padding-left: 1.5rem;
  position: relative;
  margin-bottom: 0.5rem;
}

.description-list li::before {
  content: '▹';
  position: absolute;
  left: 0;
  color: var(--primary-color);
}

/* Projects */
.projects-list {
  display: grid;
  gap: 1.5rem;
}

.project-item {
  background: rgba(0, 0, 0, 0.2);
  padding: 1.5rem;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.project-item:hover {
  border-color: var(--primary-color);
  transform: translateX(5px);
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
}

.project-name {
  color: var(--text-light);
  font-size: 1.2rem;
}

.project-role {
  color: var(--primary-color);
  font-size: 0.9rem;
  background: rgba(0, 212, 255, 0.1);
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
}

.project-description {
  color: var(--text-gray);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  color: var(--text-gray);
}

.tech-tag {
  background: rgba(255, 0, 110, 0.1);
  color: var(--accent-color);
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.85rem;
  border: 1px solid rgba(255, 0, 110, 0.3);
}

.project-highlights {
  color: var(--text-gray);
}

.project-highlights strong {
  color: var(--text-light);
}

.project-highlights ul {
  margin-top: 0.5rem;
  padding-left: 1.5rem;
}

.project-highlights li {
  line-height: 1.6;
  margin-bottom: 0.3rem;
}

/* Education */
.education-item {
  background: rgba(0, 0, 0, 0.2);
  padding: 1.5rem;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.education-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.school {
  color: var(--text-light);
  font-size: 1.2rem;
}

.degree {
  color: var(--text-gray);
  font-size: 1rem;
}

/* Print Styles */
@media print {
  .resume {
    background: white;
    padding: 0;
  }

  .resume-container {
    background: white;
    border: none;
    box-shadow: none;
    padding: 1rem;
  }

  .action-btn {
    display: none;
  }

  .section-title,
  .name,
  .company,
  .project-name,
  .school {
    color: #000;
  }

  .timeline::before {
    background: #000;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .resume {
    padding: 90px 1rem 2rem;
  }

  .resume-container {
    padding: 2rem 1.5rem;
  }

  .resume-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .name {
    font-size: 2rem;
  }

  .header-actions {
    width: 100%;
  }

  .action-btn {
    flex: 1;
    justify-content: center;
  }

  .contact-grid {
    grid-template-columns: 1fr;
  }

  .timeline-header,
  .project-header,
  .education-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>
