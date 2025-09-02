import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import BaseLayout from '@/components/BaseLayout.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/login/Login.vue'),
    meta: {
      title: '登录 - 小橘Docker容器管理平台',
      requiresAuth: false,
    },
  },
  {
    path: '/',
    component: BaseLayout,
    redirect: '/home',
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/Home/Home.vue'),
        meta: {
          title: '仪表盘 - 小橘Docker容器管理平台',
        },
      },
      {
        path: 'containers',
        name: 'Containers',
        component: () => import('@/views/Containers/Containers.vue'),
        meta: {
          title: '容器管理 - 小橘Docker容器管理平台',
        },
      },
      {
        path: 'images',
        name: 'Images',
        component: () => import('@/views/Images/Images.vue'),
        meta: {
          title: '镜像管理 - 小橘Docker容器管理平台',
        },
      },
      {
        path: 'networks',
        name: 'Networks',
        component: () => import('@/views/Networks/Networks.vue'),
        meta: {
          title: '网络配置 - 小橘Docker容器管理平台',
        },
      },
      {
        path: 'volumes',
        name: 'Volumes',
        component: () => import('@/views/Volumes/Volumes.vue'),
        meta: {
          title: '存储卷 - 小橘Docker容器管理平台',
        },
      },
      {
        path: 'logs',
        name: 'Logs',
        component: () => import('@/views/SystemLogs/Logs.vue'),
        meta: {
          title: '系统日志 - 小橘Docker容器管理平台',
        },
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('@/views/Settings/Settings.vue'),
        meta: {
          title: '系统设置 - 小橘Docker容器管理平台',
        },
      },
    ],
  },
  {
    // 404页面重定向到登录页
    path: '/:pathMatch(.*)*',
    redirect: '/login',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 路由守卫
router.beforeEach((to, _from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = to.meta.title as string
  }

  // 检查是否需要登录
  const token = localStorage.getItem('orange-docker-token')

  if (to.meta.requiresAuth && !token) {
    // 需要登录但没有token，跳转到登录页
    next('/login')
  }
  else if (to.path === '/login' && token) {
    // 已登录用户访问登录页，跳转到首页
    next('/home')
  }
  else {
    next()
  }
})

export default router
