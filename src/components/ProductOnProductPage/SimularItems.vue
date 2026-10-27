<script setup>
import TheOneCartCatalog from '../ProductInCatalog/TheOneCartCatalog.vue'

const props = defineProps({
  products: Array,
})
</script>

<template>
  <p class="similar-items-title">Similar Items</p>
  <div class="similar-items-container">
    <TheOneCartCatalog
      v-for="p in props.products.slice(0, 3)"
      :key="p.id"
      :product="p"
      variant="compact"
      :no-margin-left="true"
      :show-mobile-button="false"
    />
  </div>
</template>
<style lang="scss" src="./SimularItems.scss"></style>
