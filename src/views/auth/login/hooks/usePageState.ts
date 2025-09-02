import { reactive, ref } from 'vue'

export default function usePageState() {
  const formRef = ref()
  const loading = ref(false)

  const loginForm = reactive({
    username: '',
    password: '',
    remember: false,
  })

  const rules = {
    username: [
      { required: true, message: '请输入用户名' },
      { minLength: 2, message: '用户名至少2个字符' },
    ],
    password: [
      { required: true, message: '请输入密码' },
      { minLength: 4, message: '密码至少4个字符' },
    ],
  }
  return {
    formRef,
    loading,
    loginForm,
    rules,
  }
}
