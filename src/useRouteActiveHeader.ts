import { useRoute } from 'vue-router'
import { computed } from 'vue'

export function useRouteActive(paths: string[] = []) {
  const route = useRoute()
  const isActive = computed(() => paths.some((path) => route.path.startsWith(path)))
  return { isActive }
}
