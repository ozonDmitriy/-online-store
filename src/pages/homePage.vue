<script setup>
import TheFooter from '@/components/Footer/TheFooter.vue'
import TheHeader from '@/components/Header/TheHeader.vue'
import TheCard from '@/components/ProductInMainPage/TheCard.vue'
import TheSliderMainPage from '@/components/Slider/TheSliderMainPage.vue'
</script>
<template>
  <TheHeader></TheHeader>
  <TheSliderMainPage />
  <div class="store__goods">
    <span class="store__goods-logo">Shop The Latest</span>
    <router-link to="/catalog" class="store__view-all-store">View All </router-link>
  </div>
  <TheCard></TheCard>
  <TheFooter></TheFooter>
</template>
<style lang="scss" src="./HomePageStyle.scss"></style>
