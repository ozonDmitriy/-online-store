import { useRouter } from 'vue-router'
import { useHoverCapability } from './useHoverCapability'

export function useProductNavigation(productId: number | string) {
  const router = useRouter()
  const { canHover } = useHoverCapability()

  const goToProduct = () => router.push(`/product/${productId}`)
  const onImageClick = () => {
    if (!canHover.value) goToProduct()
  }

  return { onImageClick }
}
