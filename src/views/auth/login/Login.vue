<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import {
  IconCloud,
  IconLock,
  IconSafe,
  IconThunderbolt,
  IconUser,
} from '@arco-design/web-vue/es/icon'

import { useRouter } from 'vue-router'
import usePageState from './hooks/usePageState'

const router = useRouter()
const {
  formRef,
  loading,
  loginForm,
  rules,
} = usePageState()

async function handleLogin() {
  // 防止重复提交
  if (loading.value)
    return

  try {
    // 表单验证
    const valid = await formRef.value?.validate()
    console.warn(valid)
    if (valid !== undefined) {
      Message.warning('请检查输入信息')
      return
    }

    loading.value = true

    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 800))

    // 登录验证逻辑
    if (loginForm.username.trim() && loginForm.password.trim()) {
      const token = `orange-token-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      const userInfo = {
        id: 1,
        username: loginForm.username.trim(),
        role: 'admin',
        loginTime: new Date().toISOString(),
      }

      // 保存登录信息
      localStorage.setItem('orange-docker-token', token)
      localStorage.setItem('orange-docker-user', JSON.stringify(userInfo))

      if (loginForm.remember) {
        localStorage.setItem('orange-docker-remember', 'true')
      }
      else {
        localStorage.removeItem('orange-docker-remember')
      }

      Message.success('登录成功')

      // 跳转到首页
      await router.push('/')
    }
    else {
      Message.error('用户名和密码不能为空')
    }
  }
  catch (error) {
    console.error('登录错误:', error)
    Message.error('登录失败，请重试')
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <div class="logo">
          <div class="logo-icon">
            🍊
          </div>
          <h1 class="title">
            小橘Docker平台
          </h1>
        </div>
        <p class="subtitle">
          企业级容器管理解决方案
        </p>
      </div>

      <a-form
        ref="formRef"
        :model="loginForm"
        :rules="rules"
        layout="vertical"
        class="login-form"
      >
        <a-form-item field="username" label="用户名">
          <a-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
            size="large"
            class="input-field"
            :disabled="loading"
            @keyup.enter="handleLogin"
          >
            <template #prefix>
              <IconUser class="input-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item field="password" label="密码">
          <a-input-password
            v-model="loginForm.password"
            placeholder="请输入密码"
            size="large"
            class="input-field"
            :disabled="loading"
            @keyup.enter="handleLogin"
          >
            <template #prefix>
              <IconLock class="input-icon" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a-checkbox
            v-model="loginForm.remember"
            class="remember-checkbox"
            :disabled="loading"
          >
            记住登录状态
          </a-checkbox>
        </a-form-item>

        <a-form-item>
          <a-button
            type="primary"
            size="large"
            long
            :loading="loading"
            class="login-button"
            @click="handleLogin"
          >
            {{ loading ? '登录中...' : '登录' }}
          </a-button>
        </a-form-item>
      </a-form>

      <div class="login-footer">
        <div class="features">
          <div class="feature">
            <IconSafe class="feature-icon" />
            <span>安全可靠</span>
          </div>
          <div class="feature">
            <IconThunderbolt class="feature-icon" />
            <span>高效管理</span>
          </div>
          <div class="feature">
            <IconCloud class="feature-icon" />
            <span>云原生</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fafafa;
  padding: 20px;
}

.login-card {
  width: 100%;
  max-width: 400px;
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 32px;
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.logo-icon {
  font-size: 48px;
  line-height: 1;
}

.title {
  font-size: 24px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.subtitle {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

.login-form {
  margin-bottom: 24px;
}

.input-field {
  border-radius: 8px;
  border: 1px solid #d1d5db;
  transition: all 0.2s;
}

.input-field:hover:not(.arco-input-disabled) {
  border-color: #ff8c42;
}

.input-field:focus-within {
  border-color: #ff8c42;
  box-shadow: 0 0 0 3px rgba(255, 140, 66, 0.1);
}

.input-icon {
  color: #9ca3af;
}

.remember-checkbox {
  color: #374151;
}

.login-button {
  background-color: #ff8c42;
  border-color: #ff8c42;
  border-radius: 8px;
  font-weight: 500;
  height: 44px;
  transition: all 0.2s;
}

.login-button:hover:not(.arco-btn-loading) {
  background-color: #ff7a28;
  border-color: #ff7a28;
  transform: translateY(-1px);
}

.login-button:active {
  transform: translateY(0);
}

.login-button.arco-btn-loading {
  transform: none;
}

.login-footer {
  border-top: 1px solid #f3f4f6;
  padding-top: 20px;
}

.features {
  display: flex;
  justify-content: space-around;
  gap: 16px;
}

.feature {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #6b7280;
}

.feature-icon {
  font-size: 16px;
  color: #ff8c42;
}

@media (max-width: 480px) {
  .login-container {
    padding: 16px;
  }

  .login-card {
    padding: 24px;
  }

  .title {
    font-size: 20px;
  }
}
</style>
