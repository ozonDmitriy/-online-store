import { ref, onMounted } from 'vue'
import type { Ref } from 'vue'
import type { BaseProduct } from './product'
type ApiResponce<T> = {
  data: T[]
}

export default function useProducts<T extends BaseProduct>() {
  const API_URL = 'https://api.dev.cwe.su/api/products/?populate=*&'
  const products: Ref<T[]> = ref([])

  async function fetchProducts(): Promise<void> {
    try {
      const res = await fetch(API_URL)
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      const data = (await res.json()) as ApiResponce<T>
      products.value = data.data
    } catch (err) {
      console.error('fetch error', err)
    }
  }

  onMounted(fetchProducts)

  return {
    products,
    fetchProducts,
  }
}
