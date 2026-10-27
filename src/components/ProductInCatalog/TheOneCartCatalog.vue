<script setup>
import { useCartStore } from '../../basket'
import { useProductNavigation } from '@/useProductNavigation'
import { computed } from 'vue'
import TheProductIcons from '../ProductHoverIcons/TheProductIcons.vue'
const cart = useCartStore()

const props = defineProps({
  product: Object,
  cardWidth: { type: Number, default: 320 },
  cardHeight: { type: Number, default: 420 },
  imageSize: { type: Number, default: 300 },
  noMarginLeft: { type: Boolean, default: false },
  layout: { type: String, default: 'grid' },
  showMobileButton: { type: Boolean, default: true },
  variant: { type: String, default: 'catalog' },
})
const { onImageClick } = useProductNavigation(props.product.id)
const discountPrice = computed(() => {
  return (props.product.price / (1 - props.product.discountPercent / 100)).toFixed(2)
})
</script>
<template>
  <div
    class="goods-catalog"
    :class="[
      { 'no-margin-left': noMarginLeft },
      { 'goods-catalog--single': layout === 'single' },
      `goods-catalog--${variant}`,
    ]"
  >
    <div class="goods-catalog__item1 card-template">
      <div class="goods__sale" v-if="product.discountPercent > 0">
        <p class="goods__discount">-{{ product.discountPercent }}%</p>
      </div>
      <div class="image-wrapper" @click="onImageClick">
        <img class="goods-catalog__images" :src="product.image" :alt="product.title" />
        <button
          v-if="showMobileButton"
          class="goods-catalog__mobile-button"
          @click.stop.prevent="cart.addItem(product)"
        >
          ADD TO CART
        </button>
        <the-product-icons :product="product" />
      </div>
      <p class="goods-catalog__title">{{ product.title }}</p>
      <p class="goods-catalog__price">
        <s class="goods-catalog__sale-price" v-if="product.discountPercent > 0"
          >${{ discountPrice }}
        </s>
        ${{ product.price.toFixed(2) }}
      </p>
    </div>
  </div>
</template>
<style lang="scss" src="./styleCatalog.scss"></style>
