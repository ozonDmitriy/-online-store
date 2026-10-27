import { defineStore } from 'pinia'
import { ref } from 'vue'
type NotificationType = 'success' | 'error'
export const useNotificationStore = defineStore('notification', () => {
  const isVisible = ref<boolean>(false)
  const text = ref<string>('')
  const type = ref<NotificationType>('success')
  let timer: ReturnType<typeof setTimeout> | null = null
  function show(message: string, notificationType: NotificationType = 'success', timeout = 2500) {
    isVisible.value = false

    setTimeout(() => {
      text.value = message
      type.value = notificationType
      isVisible.value = true

      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        isVisible.value = false
        timer = null
      }, timeout)
    }, 0)
  }
  return {
    isVisible,
    text,
    type,
    show,
  }
})
