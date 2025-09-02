import { reactive, ref } from 'vue'

export default function usePageState() {
  const userInfo = ref({
    username: 'admin',
    role: 'admin',
  })

  const stats = reactive({
    runningContainers: 12,
    images: 8,
    networks: 3,
    volumes: 5,
  })
  return {
    userInfo,
    stats,
  }
}
