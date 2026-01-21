<script setup lang="ts">
import { ref, watch } from 'vue'
import ToolNavigation from '@/components/ToolNavigation.vue'

const content = ref('')
const fileName = ref('untitled.txt')
const wordCount = ref(0)
const charCount = ref(0)
const lineCount = ref(1)

watch(content, (newValue) => {
  // 统计字数
  const words = newValue.trim().split(/\s+/).filter(word => word.length > 0)
  wordCount.value = words.length

  // 统计字符数
  charCount.value = newValue.length

  // 统计行数
  lineCount.value = newValue.split('\n').length
})

const downloadFile = () => {
  const blob = new Blob([content.value], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName.value
  link.click()
  URL.revokeObjectURL(url)
}

const openFile = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (file) {
    fileName.value = file.name
    const reader = new FileReader()

    reader.onload = (e) => {
      content.value = e.target?.result as string
    }

    reader.readAsText(file)
  }
}

const clearContent = () => {
  if (content.value && !confirm('确定要清空内容吗？')) {
    return
  }
  content.value = ''
  fileName.value = 'untitled.txt'
}

const copyContent = () => {
  navigator.clipboard.writeText(content.value).then(() => {
    alert('已复制到剪贴板')
  }).catch(() => {
    alert('复制失败')
  })
}
</script>

<template>
  <div class="text-editor">
    <ToolNavigation title="文本编辑器" />
    <div class="editor-container">

      <div class="editor-toolbar">
        <div class="toolbar-left">
          <input
            v-model="fileName"
            class="file-name-input"
            placeholder="文件名"
          />
        </div>
        <div class="toolbar-right">
          <label class="toolbar-btn">
            <span>📂</span> 打开
            <input
              type="file"
              accept=".txt,.md,.js,.json,.html,.css"
              @change="openFile"
              style="display: none"
            />
          </label>
          <button class="toolbar-btn" @click="downloadFile">
            <span>💾</span> 保存
          </button>
          <button class="toolbar-btn" @click="copyContent">
            <span>📋</span> 复制
          </button>
          <button class="toolbar-btn danger" @click="clearContent">
            <span>🗑️</span> 清空
          </button>
        </div>
      </div>

      <div class="editor-main">
        <textarea
          v-model="content"
          class="editor-textarea"
          placeholder="开始输入..."
          spellcheck="false"
        ></textarea>
      </div>

      <div class="editor-footer">
        <div class="stats">
          <span class="stat-item">行数: {{ lineCount }}</span>
          <span class="stat-item">字数: {{ wordCount }}</span>
          <span class="stat-item">字符: {{ charCount }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-editor {
  min-height: 100vh;
  padding: 80px 2rem 2rem;
  background: #ffffff;
}

.editor-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 120px);
}

.editor-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 12px 12px 0 0;
  gap: 1rem;
  flex-wrap: wrap;
}

.toolbar-left {
  flex: 1;
  min-width: 200px;
}

.file-name-input {
  width: 100%;
  max-width: 300px;
  padding: 0.6rem 1rem;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  color: #333;
  font-size: 0.95rem;
}

.file-name-input:focus {
  outline: none;
  border-color: #00d4ff;
}

.toolbar-right {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.toolbar-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  background: #e3f8ff;
  border: 1px solid #00d4ff;
  border-radius: 6px;
  color: #00a8cc;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.toolbar-btn:hover {
  background: #d0f2ff;
  transform: translateY(-2px);
}

.toolbar-btn.danger {
  background: #ffebee;
  border-color: #f44336;
  color: #d32f2f;
}

.toolbar-btn.danger:hover {
  background: #ffcdd2;
}

.editor-main {
  flex: 1;
  background: #fafafa;
  border-left: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
  overflow: hidden;
}

.editor-textarea {
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  background: transparent;
  border: none;
  color: #333;
  font-family: 'Courier New', 'Consolas', monospace;
  font-size: 1rem;
  line-height: 1.6;
  resize: none;
  outline: none;
}

.editor-textarea::placeholder {
  color: #999;
}

.editor-footer {
  padding: 0.8rem 1rem;
  background: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 0 0 12px 12px;
}

.stats {
  display: flex;
  gap: 2rem;
  color: #666;
  font-size: 0.9rem;
}

.stat-item {
  display: flex;
  align-items: center;
}

@media (max-width: 768px) {
  .text-editor {
    padding: 70px 1rem 1rem;
  }

  .editor-container {
    height: calc(100vh - 100px);
  }

  .editor-toolbar {
    flex-direction: column;
    align-items: stretch;
  }

  .toolbar-left,
  .toolbar-right {
    width: 100%;
  }

  .file-name-input {
    max-width: 100%;
  }

  .toolbar-right {
    justify-content: space-between;
  }

  .toolbar-btn {
    flex: 1;
    justify-content: center;
  }

  .stats {
    flex-wrap: wrap;
    gap: 1rem;
  }
}
</style>
