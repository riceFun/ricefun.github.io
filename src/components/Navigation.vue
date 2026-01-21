<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<template>
  <nav class="navigation">
    <div class="nav-container">
      <div class="logo">
        <RouterLink to="/">
          <span class="logo-text">&lt;Elecard /&gt;</span>
        </RouterLink>
      </div>

      <div class="nav-links" :class="{ 'mobile-open': isMobileMenuOpen }">
        <RouterLink to="/" class="nav-link" @click="isMobileMenuOpen = false">
          <span class="link-icon">🏠</span>
          <span>首页</span>
        </RouterLink>
        <RouterLink to="/resume" class="nav-link" @click="isMobileMenuOpen = false">
          <span class="link-icon">📄</span>
          <span>简历</span>
        </RouterLink>
        
        <a href="https://github.com/ricefun" target="_blank" class="nav-link">
          <span class="link-icon">💻</span>
          <span>GitHub</span>
        </a>
        <RouterLink to="/tools" class="nav-link" @click="isMobileMenuOpen = false">
          <span class="link-icon">🛠️</span>
          <span>工具</span>
        </RouterLink>
      </div>

      <button class="mobile-menu-btn" @click="toggleMobileMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </nav>
</template>

<style scoped>
.navigation {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(10, 14, 39, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 212, 255, 0.2);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

.logo a {
  text-decoration: none;
  color: var(--text-light);
}

.logo-text {
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: 'Courier New', monospace;
  transition: all 0.3s ease;
}

.logo-text:hover {
  filter: brightness(1.2);
  text-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
}

.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-gray);
  text-decoration: none;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
  transition: width 0.3s ease;
}

.nav-link:hover {
  color: var(--text-light);
  background: rgba(0, 212, 255, 0.1);
}

.nav-link:hover::before {
  width: 80%;
}

.nav-link.router-link-active {
  color: var(--primary-color);
  background: rgba(0, 212, 255, 0.15);
}

.link-icon {
  font-size: 1.2rem;
}

.mobile-menu-btn {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.mobile-menu-btn span {
  width: 25px;
  height: 3px;
  background: var(--primary-color);
  border-radius: 2px;
  transition: all 0.3s ease;
}

@media (max-width: 768px) {
  .nav-container {
    padding: 1rem;
  }

  .mobile-menu-btn {
    display: flex;
  }

  .nav-links {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    flex-direction: column;
    background: rgba(10, 14, 39, 0.95);
    backdrop-filter: blur(10px);
    padding: 2rem;
    gap: 1rem;
    transform: translateY(-150%);
    transition: transform 0.3s ease;
    border-bottom: 1px solid rgba(0, 212, 255, 0.2);
  }

  .nav-links.mobile-open {
    transform: translateY(0);
  }

  .nav-link {
    width: 100%;
    justify-content: center;
    font-size: 1.2rem;
  }
}
</style>
