<script lang="ts" setup>
import { useRoute } from 'vue-router'
import useProducts from '../../useProducts'
import { computed, ref, watch } from 'vue'
import StarRating from './StarRating.vue'
import CartReviews from './CartReviews.vue'
import SimularItems from './SimularItems.vue'
import TheFooter from '../Footer/TheFooter.vue'
import { useCartStore } from '../../basket'
import { onMounted, onUnmounted } from 'vue'
import { useProductCart } from '../../useCountProductCart'
import type { BaseProduct } from '../../product'

const cart = useCartStore()
const route = useRoute()
const { products } = useProducts<BaseProduct>()

const showFullDescription = ref<boolean>(false)
const isMobile = ref<boolean>(false)
const EXTRA_LARGE_WIDTH: number = 1200
const checkMobile = (): void => {
  isMobile.value = window.innerWidth <= EXTRA_LARGE_WIDTH
}
onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})
onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

const toggleDescription = () => {
  showFullDescription.value = !showFullDescription.value
}
const heartClass = computed(() => ({
  'is-favorite': product.value?.isFavorite,
}))

const bigImage = ref()
const product = computed(() => products.value.find((p) => p.id === Number(route.params.id)) ?? null)
const { productQty, increment, decrement } = useProductCart(product)
const allImages = computed(() => {
  const imagesArray = product.value?.additionalImages?.additionalImages
  if (!imagesArray) return []
  return imagesArray.flatMap((imgObj) => Object.values(imgObj))
})
const averageRating = computed(() => {
  if (!product.value || !product.value.reviews?.length) return 0
  const sumRate = product.value.reviews.reduce((sum: number, review) => sum + review.rate, 0)
  return sumRate / product.value.reviews.length
})
const reviewsCount = computed(() => product.value?.reviews?.length ?? 0)
watch(product, (val) => {
  if (val) bigImage.value = val.image
})
</script>

<template>
  <div v-if="product" class="cart">
    <div class="cart__product">
      <div class="cart__mini-image">
        <img
          class="cart__main-image-small"
          :src="product.image"
          :alt="product.title"
          @click="bigImage = product.image"
        />
        <img
          class="cart__mini-image-go"
          v-for="(img, index) in allImages"
          :key="index"
          :src="img"
          alt="Mini Image"
          @click="bigImage = img"
        />
      </div>
      <div class="cart__container-for-image">
        <img class="cart__main-image" :src="bigImage || product.image" :alt="product.title" />
      </div>
      <div class="cart__information">
        <h1 class="cart__title">{{ product.title }}</h1>
        <div class="cart__share">
          <p class="cart__price">${{ product.price.toFixed(2) }}</p>
          <img class="cart__share-mobile-icon" src="/images/share.png" />
        </div>

        <div class="cart__basket-button-mobile">
          <button
            class="cart__basket-button-add-mobile"
            @click.prevent="cart.addItem(product, productQty)"
          >
            ADD TO CART
          </button>
        </div>
        <div class="cart__rating">
          <StarRating :model-value="averageRating" readonly />
          <p class="cart__customer-review">{{ reviewsCount }} customer review</p>
        </div>

        <p
          class="cart__description"
          :class="{
            'cart__description--clamp': !showFullDescription && isMobile,
          }"
        >
          {{ product.description }}
        </p>
        <button
          v-if="isMobile && product.description.length > 100"
          class="cart__view-more"
          @click="toggleDescription"
        >
          {{ showFullDescription ? 'View less' : 'View more' }}
        </button>
        <hr class="cart__mobile-line" />

        <div class="cart__navigation">
          <div class="cart__count">
            <button class="cart__decrement" @click="decrement">-</button>
            <span class="cart__count-number">{{ productQty }}</span>
            <button class="cart__increment" @click="increment">+</button>
          </div>
          <div class="cart__basket-button">
            <button
              class="cart__basket-button-add"
              @click.prevent="cart.addItem(product, productQty)"
            >
              ADD TO CART
            </button>
          </div>
        </div>

        <svg
          class="cart__favorite"
          :class="heartClass"
          width="20"
          height="18"
          viewBox="0 0 20 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.95483 17.315C9.20033 17.5605 9.53035 17.6973 9.87647 17.6973C10.2186 17.6973 10.5566 17.5565 10.7981 17.315L18.0304 10.0827C19.1291 8.98399 19.7328 7.52305 19.7368 5.97356C19.7368 4.42005 19.1331 2.9591 18.0344 1.86037C16.9357 0.761648 15.4788 0.157952 13.9253 0.157952C12.3999 0.157952 10.9631 0.741525 9.87245 1.80403C8.77774 0.7375 7.33692 0.149902 5.80756 0.149902C4.25807 0.149902 2.80115 0.753599 1.70242 1.8483C0.603696 2.94703 0 4.40797 0 5.96149C0 7.51097 0.607721 8.97192 1.70645 10.0706L8.95483 17.315ZM2.40271 2.54859C3.31228 1.63902 4.5237 1.13594 5.81158 1.13594C7.09947 1.13594 8.31491 1.63902 9.2285 2.55261L9.52633 2.85044C9.61889 2.943 9.74366 2.99532 9.87647 2.99532C10.0053 2.99532 10.134 2.943 10.2266 2.85044L10.5164 2.56066C11.43 1.64707 12.6414 1.14399 13.9333 1.14399C15.2212 1.14399 16.4326 1.64707 17.3422 2.55664C18.2558 3.47023 18.7548 4.68165 18.7548 5.96953C18.7548 7.25742 18.2517 8.46884 17.3382 9.38243L10.1019 16.6187C9.98514 16.7354 9.77183 16.7354 9.65109 16.6187L2.40674 9.37438C1.49314 8.46079 0.990062 7.24937 0.990062 5.96149C0.990062 4.6736 1.49314 3.46218 2.40271 2.54859Z"
            fill="black"
            stroke="black"
            stroke-width="0.3"
          />
        </svg>

        <div class="cart__parameters">
          <p>SKU: {{ product.SKU }}</p>
          <p v-if="product.categories.length">Categories: {{ product.categories.join(', ') }}</p>
        </div>
      </div>
    </div>

    <CartReviews :product="product" />
    <SimularItems :products="products" />
    <div class="cart__continue-shopping">
      <router-link to="/catalog" class="cart__title-continue">Continue shopping</router-link>
      <router-link to="/catalog">
        <img class="cart__icon-to-catalog" src="/images/continue.png" />
      </router-link>
    </div>
    <TheFooter />
  </div>

  <div v-else>Loading...</div>
</template>

<style scoped lang="scss" src="./styleProductPage.scss"></style>
