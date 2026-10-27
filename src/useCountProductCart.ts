import { ref, computed } from 'vue'
import { useCartStore } from './basket'
import { useNotificationStore } from './message'
import type { ComputedRef, Ref } from 'vue'
import type { BaseProduct } from './product'

const MSG_OUT_OF_STOCK = 'This item is out of stock!'

export function useProductCart(product: ComputedRef<BaseProduct | null>) {
  const cart = useCartStore()
  const notification = useNotificationStore()
  const productQty = ref(1)

  const inCartQty = computed(() => {
    const itemInCart = cart.items.find((i) => i.id === product.value?.id)
    return itemInCart ? itemInCart.qty : 0
  })

  const maxQty = computed(() => {
    if (!product.value) return 0

    return product.value.itemsInStock - inCartQty.value
  })

  const increment = () => {
    if (!product.value) return

    if (maxQty.value > 0 && productQty.value < maxQty.value) {
      productQty.value++
    } else {
      notification.show(MSG_OUT_OF_STOCK, 'error')
    }
  }

  const decrement = () => {
    if (productQty.value > 1) productQty.value--
  }

  const addToCart = () => {
    if (productQty.value <= 0) return
    cart.addItem(product.value, productQty.value)
    productQty.value = 1
  }

  return {
    productQty,
    maxQty,
    increment,
    decrement,
    addToCart,
  }
}
