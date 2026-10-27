<script lang="ts" setup>
import ProductReviews from './ProductReviews.vue'
import type { BaseProduct } from '../../product'
defineProps<{ product: BaseProduct }>()
</script>

<template>
  <ProductReviews :reviews="product.reviews" :product="product" />
</template>
