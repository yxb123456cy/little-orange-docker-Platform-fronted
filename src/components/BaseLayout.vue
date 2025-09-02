<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import {
  IconClose,
  IconDown,
  IconMenu,
  IconPoweroff,
  IconUser,
} from '@arco-design/web-vue/es/icon'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const sidebarCollapsed = ref(false)
const userInfo = ref({
  username: 'admin',
  role: 'admin',
})

onMounted(() => {
  // 获取用户信息
  const user = localStorage.getItem('orange-docker-user')
  if (user) {
    try {
      userInfo.value = JSON.parse(user)
    }
    catch (error) {
      console.error('解析用户信息失败:', error)
    }
  }
})

function handleLogout() {
  try {
    localStorage.removeItem('orange-docker-token')
    localStorage.removeItem('orange-docker-user')
    localStorage.removeItem('orange-docker-remember')

    Message.success('已安全退出')
    router.push('/login')
  }
  catch (error) {
    console.error('退出登录失败:', error)
    Message.error('退出失败，请重试')
  }
}

function toggleSidebar() {
  sidebarCollapsed.value = !sidebarCollapsed.value
}
</script>

<template>
  <div class="base-layout">
    <!-- 顶部导航栏 -->
    <header class="header">
      <div class="header-content">
        <div class="header-left">
          <button class="sidebar-toggle" @click="toggleSidebar">
            <IconMenu v-if="sidebarCollapsed" />
            <IconClose v-else />
          </button>
          <div class="logo">
            <span class="logo-icon">🍊</span>
            <span class="logo-text">小橘Docker容器管理平台</span>
          </div>
        </div>

        <div class="header-right">
          <a-dropdown trigger="click">
            <div class="user-menu">
              <a-avatar :size="32" class="user-avatar">
                <IconUser />
              </a-avatar>
              <span class="username">{{ userInfo.username }}</span>
              <IconDown class="dropdown-icon" />
            </div>
            <template #content>
              <a-doption @click="handleLogout">
                <template #icon>
                  <IconPoweroff />
                </template>
                退出登录
              </a-doption>
            </template>
          </a-dropdown>
        </div>
      </div>
    </header>

    <div class="layout-body">
      <!-- 侧边栏 -->
      <aside class="sidebar" :class="{ collapsed: sidebarCollapsed }">
        <nav class="sidebar-nav">
          <div class="nav-section">
            <h3 class="nav-title">
              主要功能
            </h3>
            <ul class="nav-list">
              <li class="nav-item">
                <router-link to="/home" class="nav-link" active-class="active">
                  <span class="nav-icon">🏠</span>
                  <span class="nav-text">仪表盘</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/containers" class="nav-link" active-class="active">
                  <span class="nav-icon">📦</span>
                  <span class="nav-text">容器管理</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/images" class="nav-link" active-class="active">
                  <span class="nav-icon">💿</span>
                  <span class="nav-text">镜像管理</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/networks" class="nav-link" active-class="active">
                  <span class="nav-icon">🌐</span>
                  <span class="nav-text">网络配置</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/volumes" class="nav-link" active-class="active">
                  <span class="nav-icon">💾</span>
                  <span class="nav-text">存储卷</span>
                </router-link>
              </li>
            </ul>
          </div>

          <div class="nav-section">
            <h3 class="nav-title">
              系统管理
            </h3>
            <ul class="nav-list">
              <li class="nav-item">
                <router-link to="/logs" class="nav-link" active-class="active">
                  <span class="nav-icon">📋</span>
                  <span class="nav-text">系统日志</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/settings" class="nav-link" active-class="active">
                  <span class="nav-icon">⚙️</span>
                  <span class="nav-text">系统设置</span>
                </router-link>
              </li>
            </ul>
          </div>
        </nav>
      </aside>

      <!-- 主要内容区域 -->
      <main class="main-content">
        <div class="content-wrapper">
          <RouterView />
        </div>
      </main>
    </div>

    <!-- 底部 -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-left">
          <span class="copyright">© 2024 小橘Docker平台. All rights reserved.</span>
        </div>
        <div class="footer-right">
          <span class="version">v1.0.0</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.base-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #fafafa;
}

.header {
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 100;
  flex-shrink: 0;
}

.header-content {
  max-width: 100%;
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.sidebar-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  border-radius: 6px;
  cursor: pointer;
  color: #6b7280;
  transition: all 0.2s;
}

.sidebar-toggle:hover {
  background-color: #f3f4f6;
  color: #374151;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  font-size: 28px;
  line-height: 1;
}

.logo-text {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
}

.header-right {
  display: flex;
  align-items: center;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.user-menu:hover {
  background-color: #f9fafb;
}

.user-avatar {
  background-color: #ff8c42;
}

.username {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.dropdown-icon {
  color: #9ca3af;
  font-size: 12px;
}

.layout-body {
  display: flex;
  flex: 1;
  min-height: 0;
}

.sidebar {
  width: 240px;
  background-color: #ffffff;
  border-right: 1px solid #e5e7eb;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.sidebar.collapsed {
  width: 64px;
}

.sidebar-nav {
  padding: 16px 0;
  height: 100%;
  overflow-y: auto;
}

.nav-section {
  margin-bottom: 24px;
}

.nav-title {
  font-size: 12px;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 8px 0;
  padding: 0 16px;
  transition: opacity 0.3s;
}

.sidebar.collapsed .nav-title {
  opacity: 0;
}

.nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  margin-bottom: 4px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: #6b7280;
  text-decoration: none;
  transition: all 0.2s;
  border-radius: 0;
  position: relative;
}

.nav-link:hover {
  background-color: #f9fafb;
  color: #374151;
}

.nav-link.active {
  background-color: #fff7ed;
  color: #ff8c42;
  border-right: 3px solid #ff8c42;
}

.nav-icon {
  font-size: 18px;
  flex-shrink: 0;
}

.nav-text {
  font-size: 14px;
  font-weight: 500;
  transition: opacity 0.3s;
}

.sidebar.collapsed .nav-text {
  opacity: 0;
}

.main-content {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

.footer {
  background-color: #ffffff;
  border-top: 1px solid #e5e7eb;
  flex-shrink: 0;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.footer-left {
  display: flex;
  align-items: center;
}

.copyright {
  font-size: 14px;
  color: #6b7280;
}

.footer-right {
  display: flex;
  align-items: center;
}

.version {
  font-size: 12px;
  color: #9ca3af;
  background-color: #f3f4f6;
  padding: 4px 8px;
  border-radius: 4px;
}

@media (max-width: 768px) {
  .header-content {
    padding: 0 16px;
  }

  .sidebar {
    position: fixed;
    left: 0;
    top: 64px;
    height: calc(100vh - 64px);
    z-index: 50;
    transform: translateX(-100%);
  }

  .sidebar:not(.collapsed) {
    transform: translateX(0);
  }

  .main-content {
    padding: 16px;
    margin-left: 0;
  }

  .footer-content {
    padding: 12px 16px;
    flex-direction: column;
    gap: 8px;
  }
}
</style>
