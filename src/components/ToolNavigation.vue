<script setup lang="ts">
import { useRouter } from 'vue-router'

defineProps<{
  title: string
}>()

const router = useRouter()

const goBack = () => {
  router.push('/tools')
}
</script>

<template>
  <nav class="tool-navigation">
    <div class="nav-container">
      <button class="back-btn" @click="goBack">
        <span class="back-icon">←</span>
        <span>工具箱</span>
      </button>

      <h1 class="tool-title">{{ title }}</h1>

      <div class="spacer"></div>
    </div>
  </nav>
</template>

<style scoped>
.tool-navigation {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: white;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: transparent;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  white-space: nowrap;
}

.back-btn:hover {
  background: #f5f5f5;
  border-color: #333;
}

.back-icon {
  font-size: 1.2rem;
}

.tool-title {
  flex: 1;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.spacer {
  width: 120px;
}

@media (max-width: 768px) {
  .nav-container {
    padding: 0.8rem 1rem;
  }

  .tool-title {
    font-size: 1.2rem;
  }

  .back-btn {
    padding: 0.4rem 0.8rem;
    font-size: 0.85rem;
  }

  .spacer {
    width: 80px;
  }
}
</style>
