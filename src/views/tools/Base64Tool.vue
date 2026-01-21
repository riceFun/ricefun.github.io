<script setup lang="ts">
import { ref } from 'vue'
import ToolNavigation from '@/components/ToolNavigation.vue'

const activeTab = ref<'encode' | 'decode' | 'image-to-base64' | 'base64-to-image'>('encode')

// 文本编码/解码
const textInput = ref('')
const textOutput = ref('')

// 图片转 Base64
const imageFile = ref<File | null>(null)
const imageBase64 = ref('')
const imagePreview = ref('')

// Base64 转图片
const base64Input = ref('')
const decodedImage = ref('')

const encodeText = () => {
  try {
    textOutput.value = btoa(unescape(encodeURIComponent(textInput.value)))
  } catch (error) {
    textOutput.value = '编码失败：' + (error as Error).message
  }
}

const decodeText = () => {
  try {
    textOutput.value = decodeURIComponent(escape(atob(textInput.value)))
  } catch (error) {
    textOutput.value = '解码失败：' + (error as Error).message
  }
}

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (file) {
    imageFile.value = file
    const reader = new FileReader()

    reader.onload = (e) => {
      const result = e.target?.result as string
      imageBase64.value = result
      imagePreview.value = result
    }

    reader.readAsDataURL(file)
  }
}

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(() => {
    alert('已复制到剪贴板')
  }).catch(() => {
    alert('复制失败')
  })
}

const convertBase64ToImage = () => {
  try {
    if (!base64Input.value) {
      alert('请输入 Base64 字符串')
      return
    }

    // 如果不是完整的 data URL，添加前缀
    let base64 = base64Input.value.trim()
    if (!base64.startsWith('data:')) {
      base64 = 'data:image/png;base64,' + base64
    }

    decodedImage.value = base64
  } catch (error) {
    alert('转换失败：' + (error as Error).message)
  }
}

const downloadImage = () => {
  if (!decodedImage.value) {
    alert('请先转换 Base64')
    return
  }

  const link = document.createElement('a')
  link.href = decodedImage.value
  link.download = 'image.png'
  link.click()
}

const clearAll = () => {
  textInput.value = ''
  textOutput.value = ''
  imageFile.value = null
  imageBase64.value = ''
  imagePreview.value = ''
  base64Input.value = ''
  decodedImage.value = ''
}
</script>

<template>
  <div class="base64-tool">
    <ToolNavigation title="Base64 工具" />
    <div class="tool-container">

      <!-- Tab 切换 -->
      <div class="tabs">
        <button
          :class="['tab', { active: activeTab === 'encode' }]"
          @click="activeTab = 'encode'"
        >
          文本编码
        </button>
        <button
          :class="['tab', { active: activeTab === 'decode' }]"
          @click="activeTab = 'decode'"
        >
          文本解码
        </button>
        <button
          :class="['tab', { active: activeTab === 'image-to-base64' }]"
          @click="activeTab = 'image-to-base64'"
        >
          图片转 Base64
        </button>
        <button
          :class="['tab', { active: activeTab === 'base64-to-image' }]"
          @click="activeTab = 'base64-to-image'"
        >
          Base64 转图片
        </button>
      </div>

      <!-- 文本编码 -->
      <div v-if="activeTab === 'encode'" class="tab-content">
        <div class="input-group">
          <label>输入文本</label>
          <textarea
            v-model="textInput"
            placeholder="请输入要编码的文本..."
            rows="8"
          ></textarea>
        </div>
        <div class="button-group">
          <button class="btn btn-primary" @click="encodeText">编码</button>
          <button class="btn btn-secondary" @click="clearAll">清空</button>
        </div>
        <div class="input-group">
          <label>Base64 结果</label>
          <textarea
            v-model="textOutput"
            placeholder="编码结果将显示在这里..."
            rows="8"
            readonly
          ></textarea>
        </div>
        <button
          v-if="textOutput"
          class="btn btn-success"
          @click="copyToClipboard(textOutput)"
        >
          复制结果
        </button>
      </div>

      <!-- 文本解码 -->
      <div v-if="activeTab === 'decode'" class="tab-content">
        <div class="input-group">
          <label>输入 Base64</label>
          <textarea
            v-model="textInput"
            placeholder="请输入要解码的 Base64 字符串..."
            rows="8"
          ></textarea>
        </div>
        <div class="button-group">
          <button class="btn btn-primary" @click="decodeText">解码</button>
          <button class="btn btn-secondary" @click="clearAll">清空</button>
        </div>
        <div class="input-group">
          <label>解码结果</label>
          <textarea
            v-model="textOutput"
            placeholder="解码结果将显示在这里..."
            rows="8"
            readonly
          ></textarea>
        </div>
        <button
          v-if="textOutput"
          class="btn btn-success"
          @click="copyToClipboard(textOutput)"
        >
          复制结果
        </button>
      </div>

      <!-- 图片转 Base64 -->
      <div v-if="activeTab === 'image-to-base64'" class="tab-content">
        <div class="upload-area">
          <label for="image-upload" class="upload-label">
            <span class="upload-icon">📁</span>
            <span>点击选择图片</span>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              @change="handleImageUpload"
              style="display: none"
            />
          </label>
        </div>

        <div v-if="imagePreview" class="preview-area">
          <h3>图片预览</h3>
          <img :src="imagePreview" alt="Preview" class="preview-image" />
        </div>

        <div v-if="imageBase64" class="input-group">
          <label>Base64 结果</label>
          <textarea
            v-model="imageBase64"
            rows="8"
            readonly
          ></textarea>
          <button class="btn btn-success" @click="copyToClipboard(imageBase64)">
            复制 Base64
          </button>
        </div>
      </div>

      <!-- Base64 转图片 -->
      <div v-if="activeTab === 'base64-to-image'" class="tab-content">
        <div class="input-group">
          <label>输入 Base64</label>
          <textarea
            v-model="base64Input"
            placeholder="请输入图片的 Base64 字符串..."
            rows="8"
          ></textarea>
        </div>
        <div class="button-group">
          <button class="btn btn-primary" @click="convertBase64ToImage">转换</button>
          <button class="btn btn-secondary" @click="clearAll">清空</button>
        </div>

        <div v-if="decodedImage" class="preview-area">
          <h3>转换结果</h3>
          <img :src="decodedImage" alt="Decoded" class="preview-image" />
          <button class="btn btn-success" @click="downloadImage">下载图片</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.base64-tool {
  min-height: 100vh;
  padding: 80px 2rem 4rem;
  background: #ffffff;
}

.tool-container {
  max-width: 1000px;
  margin: 0 auto;
}

.tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.tab {
  flex: 1;
  min-width: 150px;
  padding: 1rem;
  background: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.tab:hover {
  background: #e8e8e8;
  border-color: #00d4ff;
}

.tab.active {
  background: #e3f8ff;
  border-color: #00d4ff;
  color: #00a8cc;
}

.tab-content {
  background: #fafafa;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 2rem;
}

.input-group {
  margin-bottom: 1.5rem;
}

.input-group label {
  display: block;
  color: #333;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.input-group textarea {
  width: 100%;
  padding: 1rem;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  color: #333;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  resize: vertical;
  transition: border-color 0.3s ease;
}

.input-group textarea:focus {
  outline: none;
  border-color: #00d4ff;
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.btn {
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.btn-primary {
  background: linear-gradient(135deg, #00d4ff, #00a8cc);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 212, 255, 0.4);
}

.btn-secondary {
  background: #f5f5f5;
  color: #666;
  border: 1px solid #e0e0e0;
}

.btn-secondary:hover {
  background: #e8e8e8;
}

.btn-success {
  background: #4caf50;
  color: white;
  width: 100%;
  margin-top: 1rem;
}

.btn-success:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4);
}

.upload-area {
  margin-bottom: 2rem;
}

.upload-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  background: #ffffff;
  border: 2px dashed #00d4ff;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.upload-label:hover {
  border-color: #00a8cc;
  background: #f0fbff;
}

.upload-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.upload-label span:last-child {
  color: #333;
  font-size: 1.1rem;
}

.preview-area {
  margin-top: 2rem;
}

.preview-area h3 {
  color: #333;
  margin-bottom: 1rem;
}

.preview-image {
  max-width: 100%;
  max-height: 400px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

@media (max-width: 768px) {
  .base64-tool {
    padding: 70px 1rem 2rem;
  }

  .tabs {
    flex-direction: column;
  }

  .tab {
    min-width: auto;
  }

  .button-group {
    flex-direction: column;
  }
}
</style>
