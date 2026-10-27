import { ref, onMounted, onUnmounted } from 'vue'

export default function useIsMobile(breakpoint = 660) {
  const isMobile = ref(window.innerWidth <= breakpoint)

  const checkMobile = () => {
    isMobile.value = window.innerWidth <= breakpoint
  }

  onMounted(() => window.addEventListener('resize', checkMobile))
  onUnmounted(() => window.removeEventListener('resize', checkMobile))

  return isMobile
}
