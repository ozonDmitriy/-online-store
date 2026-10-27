<script setup>
import SearchCatalog from '@/components/SearchOrFiltersInCatalog/SearchCatalog.vue'
import TheCardCatalog from '@/components/ProductInCatalog/TheCardCatalog.vue'
import TheCatalogPagination from '@/components/CatalogPagination/TheCatalogPagination.vue'
import TheFooter from '@/components/Footer/TheFooter.vue'

import TheHeader from '@/components/Header/TheHeader.vue'
</script>
<template>
  <TheHeader />
  <hr class="catalog__hr" />
  <div class="rigth__catalog">
    <SearchCatalog />
    <TheCardCatalog />
  </div>
  <TheCatalogPagination />

  <TheFooter />
</template>
<style lang="scss" src="./CatalogPages.scss"></style>
