<script setup>
const props = defineProps({
  promo: Object,
  index: Number,
  isMobile: Boolean,
})

const chooseImage = (promo) => (props.isMobile ? promo.mobileImage : promo.desktopImage)
const MOBILE_BREAKPOINT = 500
const imageStyle = () => {
  if (!props.isMobile) return {}
  if (window.innerWidth <= MOBILE_BREAKPOINT && props.index === 3)
    return { objectPosition: '30% center' }
  return { objectPosition: props.index < 2 ? 'left' : 'center' }
}
</script>

<template>
  <div class="promos__girl">
    <img
      class="promos__girlContent"
      :class="isMobile ? 'promos__mobile' : 'promos__desktop'"
      :src="chooseImage(promo)"
      :alt="promo.product.title"
      :style="imageStyle()"
    />

    <div class="promos__text-on-border">
      <div class="promos__Text-content">
        <p class="promos__Text-on-content">{{ promo.product.title }}</p>
        <p class="promos__cost-content">$ {{ promo.product.price.toFixed(2) }}</p>
      </div>
      <router-link class="promos__link-to-product" :to="`/product/${promo.product.id}`">
        <div class="promos__Button-border">
          <button class="promos__ViewButton">
            <span class="promos__buttonText">View Product</span>
          </button>
        </div>
      </router-link>
    </div>
  </div>
</template>
<style lang="scss" src="./styleSlider.scss"></style>
