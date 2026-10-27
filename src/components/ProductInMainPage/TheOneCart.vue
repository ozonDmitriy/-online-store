<script lang="ts" setup>
import { useCartStore } from '../../basket'
import { useProductNavigation } from '../../useProductNavigation'
import { computed } from 'vue'
import TheProductIcons from '../ProductHoverIcons/TheProductIcons.vue'
type Product = {
  id: number | string
  price: number
  title: string
  discountPercent: number
  image: string
}
const props = defineProps<{ product: Product }>()
const cart = useCartStore()

const { onImageClick } = useProductNavigation(props.product.id)
const discountPrice = computed(() =>
  (props.product.price / (1 - props.product.discountPercent / 100)).toFixed(2),
)
</script>
<template>
  <div class="goods">
    <div v-if="product" class="goods__item">
      <div class="goods__sale" v-if="product.discountPercent > 0">
        <p class="goods__discount">-{{ product.discountPercent }}%</p>
      </div>

      <div class="goods__container-for-mobile" @click="onImageClick">
        <img class="goods-image" :src="product.image" :alt="product.title" />
        <the-product-icons :product="product" />
        <button class="goods__mobile-button" @click.stop.prevent="cart.addItem(product)">
          ADD TO CART
        </button>
      </div>

      <div>
        <p class="goods__title">{{ product.title }}</p>

        <p class="goods__price">
          <s v-if="product.discountPercent" class="goods__sale-price"> ${{ discountPrice }} </s>
          ${{ product.price.toFixed(2) }}
        </p>
      </div>
    </div>
  </div>
</template>
<style lang="scss" src="./styleProduct.scss"></style>
