<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

interface Tool {
  id: string
  name: string
  description: string
  icon: string
  path: string
}

const tools = ref<Tool[]>([
  {
    id: 'base64',
    name: 'Base64 工具',
    description: '文本/图片 Base64 编码解码',
    icon: '🔐',
    path: '/tools/base64'
  },
  {
    id: 'text-editor',
    name: '文本编辑器',
    description: '轻量级在线文本编辑器',
    icon: '📝',
    path: '/tools/text-editor'
  },
  {
    id: 'markdown-editor',
    name: 'Markdown 编辑器',
    description: '实时预览的 Markdown 编辑器',
    icon: '📋',
    path: '/tools/markdown-editor'
  }
])

const goToTool = (path: string) => {
  router.push(path)
}
</script>

<template>
  <div class="tools-page">
    <div class="tools-container">
      <header class="tools-header">
        <h1 class="page-title">在线工具箱</h1>
        <p class="page-subtitle">实用的在线开发工具集合</p>
      </header>

      <div class="tools-grid">
        <div
          v-for="tool in tools"
          :key="tool.id"
          class="tool-card"
          @click="goToTool(tool.path)"
        >
          <div class="tool-icon">{{ tool.icon }}</div>
          <h3 class="tool-name">{{ tool.name }}</h3>
          <p class="tool-description">{{ tool.description }}</p>
          <div class="tool-arrow">→</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tools-page {
  min-height: 100vh;
  padding: 100px 2rem 4rem;
  background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0f1729 100%);
  background-attachment: fixed;
}

.tools-container {
  max-width: 1200px;
  margin: 0 auto;
}

.tools-header {
  text-align: center;
  margin-bottom: 4rem;
}

.page-title {
  font-size: 3rem;
  font-weight: bold;
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
}

.page-subtitle {
  font-size: 1.2rem;
  color: var(--text-gray);
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.tool-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.tool-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(255, 0, 110, 0.1));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.tool-card:hover {
  transform: translateY(-10px);
  border-color: var(--primary-color);
  box-shadow: 0 12px 32px rgba(0, 212, 255, 0.3);
}

.tool-card:hover::before {
  opacity: 1;
}

.tool-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
}

.tool-name {
  font-size: 1.5rem;
  color: var(--text-light);
  margin-bottom: 0.8rem;
  position: relative;
  z-index: 1;
}

.tool-description {
  color: var(--text-gray);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
}

.tool-arrow {
  font-size: 1.5rem;
  color: var(--primary-color);
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
}

.tool-card:hover .tool-arrow {
  opacity: 1;
  transform: translateX(0);
}

@media (max-width: 768px) {
  .tools-page {
    padding: 90px 1rem 2rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .tools-grid {
    grid-template-columns: 1fr;
  }
}
</style>
