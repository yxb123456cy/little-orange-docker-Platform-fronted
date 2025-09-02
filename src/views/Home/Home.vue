<script setup lang="ts">
import {
  IconApps,
  IconArchive,
  IconDownload,
  IconPlus,
  IconSettings,
  IconStorage,
  IconWifi,
} from '@arco-design/web-vue/es/icon'
import { Log } from '@icon-park/vue-next'
import { onMounted } from 'vue'
import usePageState from './hooks/usePageState'

const { userInfo, stats } = usePageState()

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

  // 模拟获取统计数据
  loadStats()
})

async function loadStats() {
  // 这里可以调用API获取真实数据
  // 目前使用模拟数据
}
</script>

<template>
  <!-- 欢迎区域 -->
  <section class="welcome-section">
    <h1 class="welcome-title">
      欢迎回来，{{ userInfo.username }}
    </h1>
    <p class="welcome-subtitle">
      管理您的Docker容器和服务
    </p>
  </section>

  <!-- 统计卡片网格 -->
  <section class="stats-grid">
    <div class="stat-card">
      <div class="stat-header">
        <div class="stat-icon container-icon">
          <IconApps />
        </div>
        <div class="stat-info">
          <h3 class="stat-title">
            运行中容器
          </h3>
          <p class="stat-value">
            {{ stats.runningContainers }}
          </p>
        </div>
      </div>
      <div class="stat-footer">
        <span class="stat-change positive">+2 较昨日</span>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-header">
        <div class="stat-icon image-icon">
          <IconArchive />
        </div>
        <div class="stat-info">
          <h3 class="stat-title">
            镜像数量
          </h3>
          <p class="stat-value">
            {{ stats.images }}
          </p>
        </div>
      </div>
      <div class="stat-footer">
        <span class="stat-change neutral">无变化</span>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-header">
        <div class="stat-icon network-icon">
          <IconWifi />
        </div>
        <div class="stat-info">
          <h3 class="stat-title">
            网络配置
          </h3>
          <p class="stat-value">
            {{ stats.networks }}
          </p>
        </div>
      </div>
      <div class="stat-footer">
        <span class="stat-change positive">+1 较昨日</span>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-header">
        <div class="stat-icon volume-icon">
          <IconStorage />
        </div>
        <div class="stat-info">
          <h3 class="stat-title">
            存储卷
          </h3>
          <p class="stat-value">
            {{ stats.volumes }}
          </p>
        </div>
      </div>
      <div class="stat-footer">
        <span class="stat-change neutral">无变化</span>
      </div>
    </div>
  </section>

  <!-- 快速操作 -->
  <section class="quick-actions">
    <h2 class="section-title">
      快速操作
    </h2>
    <div class="actions-grid">
      <button class="action-button">
        <IconPlus class="action-icon" />
        <span>创建容器</span>
      </button>
      <button class="action-button">
        <IconDownload class="action-icon" />
        <span>拉取镜像</span>
      </button>
      <button class="action-button">
        <IconSettings class="action-icon" />
        <span>系统设置</span>
      </button>
      <button class="action-button">
        <Log theme="outline" size="24" fill="#ff8c42" class="action-icon" />
        <span>查看日志</span>
      </button>
    </div>
  </section>
</template>

<style scoped>
.welcome-section {
  margin-bottom: 32px;
}

.welcome-title {
  font-size: 28px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 8px 0;
}

.welcome-subtitle {
  font-size: 16px;
  color: #6b7280;
  margin: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}

.stat-card {
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.2s;
}

.stat-card:hover {
  border-color: #ff8c42;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.stat-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.container-icon {
  background-color: #eff6ff;
  color: #2563eb;
}

.image-icon {
  background-color: #f0fdf4;
  color: #16a34a;
}

.network-icon {
  background-color: #fef3c7;
  color: #d97706;
}

.volume-icon {
  background-color: #fef2f2;
  color: #dc2626;
}

.stat-info {
  flex: 1;
}

.stat-title {
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
  margin: 0 0 4px 0;
}

.stat-value {
  font-size: 24px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.stat-footer {
  display: flex;
  justify-content: flex-end;
}

.stat-change {
  font-size: 12px;
  font-weight: 500;
  padding: 2px 8px;
  border-radius: 6px;
}

.stat-change.positive {
  color: #16a34a;
  background-color: #f0fdf4;
}

.stat-change.neutral {
  color: #6b7280;
  background-color: #f9fafb;
}

.quick-actions {
  margin-bottom: 32px;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 16px 0;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.action-button {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.action-button:hover {
  border-color: #ff8c42;
  background-color: #fffbf7;
  transform: translateY(-1px);
}

.action-icon {
  font-size: 18px;
  color: #ff8c42;
}

@media (max-width: 768px) {
  .welcome-title {
    font-size: 24px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .actions-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}
</style>
