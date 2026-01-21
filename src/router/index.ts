import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Resume from '../views/Resume.vue'
import Tools from '../views/Tools.vue'
import Base64Tool from '../views/tools/Base64Tool.vue'
import TextEditor from '../views/tools/TextEditor.vue'
import MarkdownEditor from '../views/tools/MarkdownEditor.vue'
import QRCodeTool from '../views/tools/QRCodeTool.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/resume',
      name: 'resume',
      component: Resume
    },
    {
      path: '/tools',
      name: 'tools',
      component: Tools
    },
    {
      path: '/tools/base64',
      name: 'base64-tool',
      component: Base64Tool
    },
    {
      path: '/tools/text-editor',
      name: 'text-editor',
      component: TextEditor
    },
    {
      path: '/tools/markdown-editor',
      name: 'markdown-editor',
      component: MarkdownEditor
    },
    {
      path: '/tools/qrcode',
      name: 'qrcode-tool',
      component: QRCodeTool
    }
  ]
})

export default router
