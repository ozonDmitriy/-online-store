<script lang="ts" setup>
import { toRefs } from 'vue'
type Product = {
  weight: number
  dimensions: string
  color: string
  material: string
}
const props = defineProps<{ product: Product }>()
const { product } = toRefs(props)
</script>

<template>
  <div>
    <div class="characteristic">
      <p>Weight:</p>
      <p class="meaningСharacteristic">{{ product.weight }}kg</p>
    </div>
    <div class="characteristic">
      <p>Dimensions:</p>
      <p class="meaningСharacteristic">{{ product.dimensions }}cm</p>
    </div>
    <div class="characteristic">
      <p>Colours:</p>
      <p class="meaningСharacteristic">{{ product.color }}</p>
    </div>
    <div class="characteristic">
      <p>Material:</p>
      <p class="meaningСharacteristic">{{ product.material }}</p>
    </div>
  </div>
</template>
<style scoped lang="scss" src="./styleCartReviews.scss"></style>
