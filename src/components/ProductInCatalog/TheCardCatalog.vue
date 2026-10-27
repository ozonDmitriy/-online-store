<script lang="ts" setup>
import useProducts from '../../useProducts'
import TheOneCartCatalog from './TheOneCartCatalog.vue'
const { products } = useProducts()
</script>
<template>
  <div class="goods-catalog">
    <TheOneCartCatalog v-for="p in products.slice(0, 6)" :key="p.id" :product="p" />
  </div>
</template>
