<script setup lang="ts">
import { ref } from 'vue'
import ToolNavigation from '@/components/ToolNavigation.vue'
import QRCode from 'qrcode'

const activeTab = ref<'generate' | 'decode'>('generate')

// 生成二维码
const generateInput = ref('')
const qrCodeDataUrl = ref('')
const qrSize = ref(300)
const errorLevel = ref<'L' | 'M' | 'Q' | 'H'>('M')

// 解码二维码
const decodeResult = ref('')
const uploadedImage = ref('')

const generateQRCode = async () => {
  if (!generateInput.value) {
    alert('请输入要生成二维码的内容')
    return
  }

  try {
    const dataUrl = await QRCode.toDataURL(generateInput.value, {
      width: qrSize.value,
      errorCorrectionLevel: errorLevel.value,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    })
    qrCodeDataUrl.value = dataUrl
  } catch (error) {
    alert('生成二维码失败：' + (error as Error).message)
  }
}

const downloadQRCode = () => {
  if (!qrCodeDataUrl.value) {
    alert('请先生成二维码')
    return
  }

  const link = document.createElement('a')
  link.href = qrCodeDataUrl.value
  link.download = 'qrcode.png'
  link.click()
}

const copyQRCodeImage = async () => {
  if (!qrCodeDataUrl.value) {
    alert('请先生成二维码')
    return
  }

  try {
    const response = await fetch(qrCodeDataUrl.value)
    const blob = await response.blob()
    await navigator.clipboard.write([
      new ClipboardItem({ 'image/png': blob })
    ])
    alert('二维码图片已复制到剪贴板')
  } catch (error) {
    alert('复制失败，请使用下载功能')
  }
}

const handleImageUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) return

  const reader = new FileReader()
  reader.onload = async (e) => {
    const imageData = e.target?.result as string
    uploadedImage.value = imageData
    await decodeQRCode(imageData)
  }
  reader.readAsDataURL(file)
}

const decodeQRCode = async (imageData: string) => {
  try {
    // 创建图片元素
    const img = new Image()
    img.src = imageData

    await new Promise((resolve) => {
      img.onload = resolve
    })

    // 创建 canvas 来处理图片
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      throw new Error('无法创建 canvas context')
    }

    canvas.width = img.width
    canvas.height = img.height
    ctx.drawImage(img, 0, 0)

    // 使用 jsQR 库解码
    const imageDataObj = ctx.getImageData(0, 0, canvas.width, canvas.height)

    // 简单的解码尝试 - 实际项目中应该使用专门的解码库
    // 这里我们使用一个简化的方法
    const { default: jsQR } = await import('jsqr')
    const code = jsQR(imageDataObj.data, imageDataObj.width, imageDataObj.height)

    if (code) {
      decodeResult.value = code.data
    } else {
      decodeResult.value = '未能识别二维码，请确保图片清晰且包含有效的二维码'
    }
  } catch (error) {
    decodeResult.value = '解码失败：' + (error as Error).message
  }
}

const clearGenerate = () => {
  generateInput.value = ''
  qrCodeDataUrl.value = ''
}

const clearDecode = () => {
  uploadedImage.value = ''
  decodeResult.value = ''
}
</script>

<template>
  <div class="qrcode-tool">
    <ToolNavigation title="二维码工具" />
    <div class="tool-container">
      <!-- Tab 切换 -->
      <div class="tabs">
        <button
          :class="['tab', { active: activeTab === 'generate' }]"
          @click="activeTab = 'generate'"
        >
          生成二维码
        </button>
        <button
          :class="['tab', { active: activeTab === 'decode' }]"
          @click="activeTab = 'decode'"
        >
          解码二维码
        </button>
      </div>

      <!-- 生成二维码 -->
      <div v-if="activeTab === 'generate'" class="tab-content">
        <!-- 生成结果区域 - 放在上面 -->
        <div v-if="qrCodeDataUrl" class="result-area-top">
          <h3>生成结果</h3>
          <div class="qrcode-display">
            <img :src="qrCodeDataUrl" alt="QR Code" class="qrcode-image" />
          </div>
          <div class="button-group">
            <button class="btn btn-success" @click="downloadQRCode">
              <span>💾</span> 下载二维码
            </button>
            <button class="btn btn-success" @click="copyQRCodeImage">
              <span>📋</span> 复制图片
            </button>
          </div>
        </div>

        <!-- 输入区域 -->
        <div class="input-group">
          <label>输入内容</label>
          <textarea
            v-model="generateInput"
            placeholder="请输入文本、网址等内容..."
            rows="6"
          ></textarea>
        </div>

        <div class="settings-group">
          <div class="setting-item">
            <label>二维码大小</label>
            <select v-model.number="qrSize">
              <option :value="200">小 (200x200)</option>
              <option :value="300">中 (300x300)</option>
              <option :value="400">大 (400x400)</option>
              <option :value="600">超大 (600x600)</option>
            </select>
          </div>

          <div class="setting-item">
            <label>容错级别</label>
            <select v-model="errorLevel">
              <option value="L">低 (7%)</option>
              <option value="M">中 (15%)</option>
              <option value="Q">较高 (25%)</option>
              <option value="H">高 (30%)</option>
            </select>
          </div>
        </div>

        <div class="button-group">
          <button class="btn btn-primary" @click="generateQRCode">生成二维码</button>
          <button class="btn btn-secondary" @click="clearGenerate">清空</button>
        </div>
      </div>

      <!-- 解码二维码 -->
      <div v-if="activeTab === 'decode'" class="tab-content">
        <div class="upload-area">
          <label for="qr-upload" class="upload-label">
            <span class="upload-icon">📷</span>
            <span>点击上传二维码图片</span>
            <span class="upload-hint">支持 PNG, JPG, JPEG 格式</span>
            <input
              id="qr-upload"
              type="file"
              accept="image/*"
              @change="handleImageUpload"
              style="display: none"
            />
          </label>
        </div>

        <div v-if="uploadedImage" class="preview-area">
          <h3>上传的图片</h3>
          <img :src="uploadedImage" alt="Uploaded" class="preview-image" />
        </div>

        <div v-if="decodeResult" class="result-area">
          <h3>解码结果</h3>
          <div class="decode-result">
            <textarea
              v-model="decodeResult"
              rows="6"
              readonly
            ></textarea>
          </div>
          <button
            class="btn btn-success"
            @click="navigator.clipboard.writeText(decodeResult).then(() => alert('已复制到剪贴板'))"
          >
            <span>📋</span> 复制结果
          </button>
        </div>

        <button
          v-if="uploadedImage || decodeResult"
          class="btn btn-secondary"
          @click="clearDecode"
          style="margin-top: 1rem"
        >
          清空
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.qrcode-tool {
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

.settings-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.setting-item label {
  display: block;
  color: #333;
  margin-bottom: 0.5rem;
  font-weight: 600;
  font-size: 0.9rem;
}

.setting-item select {
  width: 100%;
  padding: 0.6rem;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  color: #333;
  font-size: 0.9rem;
  cursor: pointer;
}

.setting-item select:focus {
  outline: none;
  border-color: #00d4ff;
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.btn {
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
}

.btn-primary {
  background: linear-gradient(135deg, #00d4ff, #00a8cc);
  color: white;
  flex: 1;
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
  flex: 1;
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

.upload-label span:nth-child(2) {
  color: #333;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.upload-hint {
  color: #999;
  font-size: 0.85rem;
}

.result-area {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 2px solid #e0e0e0;
}

.result-area-top {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #e0e0e0;
}

.result-area h3,
.result-area-top h3 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.qrcode-display {
  display: flex;
  justify-content: center;
  padding: 2rem;
  background: #ffffff;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.qrcode-image {
  max-width: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
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

.decode-result textarea {
  width: 100%;
  padding: 1rem;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  color: #333;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  resize: vertical;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .qrcode-tool {
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

  .btn {
    width: 100%;
  }

  .settings-group {
    grid-template-columns: 1fr;
  }
}
</style>
