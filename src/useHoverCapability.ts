import { ref, onMounted } from 'vue'

export function useHoverCapability() {
  const canHover = ref<boolean>(false)

  onMounted(() => {
    canHover.value = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  })

  return { canHover }
}
