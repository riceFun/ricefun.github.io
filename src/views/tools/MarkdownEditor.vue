<script setup lang="ts">
import { ref, computed } from 'vue'
import ToolNavigation from '@/components/ToolNavigation.vue'

const markdown = ref('# 欢迎使用 Markdown 编辑器\n\n开始编写你的 Markdown 文档...\n\n## 功能特性\n\n- 实时预览\n- 支持标准 Markdown 语法\n- 代码高亮\n\n```javascript\nconst hello = "world";\nconsole.log(hello);\n```\n\n**粗体** 和 *斜体* 文本\n\n> 这是一个引用块\n\n1. 有序列表项 1\n2. 有序列表项 2\n\n- 无序列表项\n- 另一个列表项')

const fileName = ref('document.md')

// 简单的 Markdown 转 HTML
const htmlPreview = computed(() => {
  let html = markdown.value

  // 标题
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>')
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>')
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>')

  // 粗体
  html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')

  // 斜体
  html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>')

  // 代码块
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/gim, '<pre><code class="language-$1">$2</code></pre>')

  // 行内代码
  html = html.replace(/`([^`]+)`/gim, '<code>$1</code>')

  // 引用
  html = html.replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')

  // 无序列表
  html = html.replace(/^\- (.*$)/gim, '<li>$1</li>')
  html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')

  // 有序列表
  html = html.replace(/^\d+\. (.*$)/gim, '<li>$1</li>')

  // 链接
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank">$1</a>')

  // 换行
  html = html.replace(/\n/gim, '<br>')

  return html
})

const downloadMarkdown = () => {
  const blob = new Blob([markdown.value], { type: 'text/markdown' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName.value
  link.click()
  URL.revokeObjectURL(url)
}

const downloadHTML = () => {
  const htmlContent = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${fileName.value.replace('.md', '')}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 800px; margin: 40px auto; padding: 0 20px; line-height: 1.6; }
    h1, h2, h3 { margin-top: 24px; margin-bottom: 16px; font-weight: 600; }
    code { background: #f6f8fa; padding: 2px 6px; border-radius: 3px; font-family: 'Courier New', monospace; }
    pre { background: #f6f8fa; padding: 16px; border-radius: 6px; overflow-x: auto; }
    blockquote { border-left: 4px solid #ddd; padding-left: 16px; color: #666; margin: 16px 0; }
    a { color: #0366d6; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  ${htmlPreview.value}
</body>
</html>`

  const blob = new Blob([htmlContent], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName.value.replace('.md', '.html')
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
      markdown.value = e.target?.result as string
    }

    reader.readAsText(file)
  }
}

const clearContent = () => {
  if (markdown.value && !confirm('确定要清空内容吗？')) {
    return
  }
  markdown.value = ''
  fileName.value = 'document.md'
}

const copyMarkdown = () => {
  navigator.clipboard.writeText(markdown.value).then(() => {
    alert('已复制 Markdown 到剪贴板')
  }).catch(() => {
    alert('复制失败')
  })
}

const copyHTML = () => {
  navigator.clipboard.writeText(htmlPreview.value).then(() => {
    alert('已复制 HTML 到剪贴板')
  }).catch(() => {
    alert('复制失败')
  })
}
</script>

<template>
  <div class="markdown-editor">
    <ToolNavigation title="Markdown 编辑器" />
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
              accept=".md,.markdown,.txt"
              @change="openFile"
              style="display: none"
            />
          </label>
          <button class="toolbar-btn" @click="downloadMarkdown">
            <span>💾</span> 保存 MD
          </button>
          <button class="toolbar-btn" @click="downloadHTML">
            <span>📄</span> 导出 HTML
          </button>
          <button class="toolbar-btn" @click="copyMarkdown">
            <span>📋</span> 复制 MD
          </button>
          <button class="toolbar-btn" @click="copyHTML">
            <span>📋</span> 复制 HTML
          </button>
          <button class="toolbar-btn danger" @click="clearContent">
            <span>🗑️</span> 清空
          </button>
        </div>
      </div>

      <div class="editor-main">
        <div class="editor-pane">
          <div class="pane-header">编辑</div>
          <textarea
            v-model="markdown"
            class="editor-textarea"
            placeholder="开始编写 Markdown..."
            spellcheck="false"
          ></textarea>
        </div>

        <div class="preview-pane">
          <div class="pane-header">预览</div>
          <div class="preview-content" v-html="htmlPreview"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.markdown-editor {
  min-height: 100vh;
  padding: 80px 2rem 2rem;
  background: #ffffff;
}

.editor-container {
  max-width: 1400px;
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
  font-size: 0.85rem;
  white-space: nowrap;
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  border-left: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  border-radius: 0 0 12px 12px;
  overflow: hidden;
  min-height: 0;
}

.editor-pane,
.preview-pane {
  display: flex;
  flex-direction: column;
  background: #fafafa;
  min-height: 0;
}

.editor-pane {
  border-right: 1px solid #e0e0e0;
}

.pane-header {
  padding: 0.8rem 1rem;
  background: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
  color: #333;
  font-weight: 600;
  font-size: 0.9rem;
}

.editor-textarea {
  flex: 1;
  padding: 1.5rem;
  background: transparent;
  border: none;
  color: #333;
  font-family: 'Courier New', 'Consolas', monospace;
  font-size: 1rem;
  line-height: 1.6;
  resize: none;
  outline: none;
  overflow-y: auto;
}

.editor-textarea::placeholder {
  color: #999;
}

.preview-content {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  color: #333;
  line-height: 1.6;
}

/* Markdown 预览样式 */
.preview-content :deep(h1) {
  font-size: 2rem;
  margin: 1.5rem 0 1rem;
  color: #00a8cc;
}

.preview-content :deep(h2) {
  font-size: 1.5rem;
  margin: 1.2rem 0 0.8rem;
  color: #00a8cc;
}

.preview-content :deep(h3) {
  font-size: 1.2rem;
  margin: 1rem 0 0.6rem;
  color: #00a8cc;
}

.preview-content :deep(code) {
  background: #e3f8ff;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  color: #00a8cc;
}

.preview-content :deep(pre) {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
  margin: 1rem 0;
  border: 1px solid #e0e0e0;
}

.preview-content :deep(pre code) {
  background: transparent;
  padding: 0;
  color: #333;
}

.preview-content :deep(blockquote) {
  border-left: 4px solid #00d4ff;
  padding-left: 1rem;
  margin: 1rem 0;
  color: #666;
}

.preview-content :deep(ul),
.preview-content :deep(ol) {
  padding-left: 2rem;
  margin: 1rem 0;
}

.preview-content :deep(li) {
  margin: 0.5rem 0;
}

.preview-content :deep(a) {
  color: #00a8cc;
  text-decoration: none;
}

.preview-content :deep(a:hover) {
  text-decoration: underline;
}

.preview-content :deep(strong) {
  color: #ff006e;
  font-weight: 600;
}

.preview-content :deep(em) {
  color: #666;
  font-style: italic;
}

@media (max-width: 1024px) {
  .markdown-editor {
    padding: 70px 1rem 1rem;
  }

  .editor-container {
    height: calc(100vh - 100px);
  }

  .editor-main {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }

  .editor-pane {
    border-right: none;
    border-bottom: 1px solid #e0e0e0;
  }

  .toolbar-right {
    width: 100%;
    justify-content: space-between;
  }

  .toolbar-btn {
    flex: 1;
    justify-content: center;
    font-size: 0.75rem;
    padding: 0.5rem 0.5rem;
  }
}
</style>
