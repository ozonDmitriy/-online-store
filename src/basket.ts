import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useNotificationStore } from './message'
import type { Ref } from 'vue'
const MSG_ADDED = 'Added to your Shopping bag'
const MSG_OUT_OF_STOCK = 'This item is out of stock!'
type ItemStore = {
  id: number | string
  itemsInStock?: number
  [key: string]: unknown
}
type Id = number | string
export const useCartStore = defineStore(
  'cart',
  () => {
    const items = ref<(ItemStore & { qty: number })[]>([])
    const isBagOpen = ref(false)
    const notification = useNotificationStore()
    function openCart(): void {
      isBagOpen.value = true
    }

    function closeCart(): void {
      isBagOpen.value = false
    }

    function toggleCart(): void {
      isBagOpen.value = !isBagOpen.value
    }
    function addItem<T extends ItemStore>(item: T | null, count = 1) {
      const product = item
      if (!product) return
      console.log(product)
      const existing = items.value.find((i) => i.id === product.id)
      const availableToAdd: number = product.itemsInStock - (existing?.qty || 0)
      if (availableToAdd <= 0) {
        notification.show(MSG_OUT_OF_STOCK, 'error')
        return
      }

      const qtyToAdd: number = Math.min(count, availableToAdd)

      if (existing) {
        existing.qty += qtyToAdd
        notification.show(MSG_ADDED, 'success')
      } else {
        items.value.push({
          ...product,
          qty: qtyToAdd,
        })
        notification.show(MSG_ADDED, 'success')
      }
    }
    function findItemById(id: Id) {
      return items.value.find((i) => i.id === id)
    }
    function increaseQty(id: Id) {
      const item = findItemById(id)
      if (!item) return

      if (item.qty < item.itemsInStock) {
        item.qty++

        notification.show(MSG_ADDED, 'success')
      } else {
        notification.show(MSG_OUT_OF_STOCK, 'error')
      }
    }
    function decreaseQty(id: Id) {
      const item = findItemById(id)
      if (!item) return
      if (item.qty > 1) {
        item.qty--
      } else {
        removeItem(id)
      }
    }
    function hasItem(id: Id) {
      return items.value.some((i) => i.id === id)
    }
    function removeItem(id: Id) {
      items.value = items.value.filter((item) => item.id !== id)
    }

    const totalItems = computed(() => items.value.reduce((sum, item) => sum + item.qty, 0))

    return {
      items,
      isBagOpen,
      openCart,
      closeCart,
      toggleCart,
      addItem,
      increaseQty,
      decreaseQty,
      removeItem,
      totalItems,
      hasItem,
    }
  },
  {
    // @ts-ignore
    persist: {
      key: 'cart-storage',
      paths: ['items', 'isBagOpen'],
      storage: localStorage,
    },
  },
)
