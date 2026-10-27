<script lang="ts" setup>
import useProducts from '../../useProducts'
import TheOneCart from './TheOneCart.vue'

const { products } = useProducts()
</script>

<template>
  <div class="goods">
    <TheOneCart v-for="p in products.slice(0, 6)" :key="p.id" :product="p" />
  </div>
</template>
