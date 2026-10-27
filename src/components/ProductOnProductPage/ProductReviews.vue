<script lang="ts" setup>
import StarRating from './StarRating.vue'
import type { BaseProduct } from '../../product'
type Review = {
  id: number | string
  author: string
  rate: number
  text: string
}
defineProps<{
  reviews: Review[]
  product: BaseProduct
}>()
</script>

<template>
  <div class="cart-review">
    <div class="left-information-review">
      <div class="reviews-scroll">
        <p class="cart-review__count">{{ reviews.length }} Reviews for {{ product.title }}</p>
        <div class="cart-review__review" v-for="review in reviews" :key="review.id">
          <p>{{ review.author }}</p>
          <StarRating :model-value="review.rate" readonly />
          <p class="multi-line-second">{{ review.text }}</p>
          <hr class="scarlet-line" />
        </div>
      </div>
    </div>

    <div class="rigth-information-review">
      <p>Add a Review</p>
      <p class="information-text-rigth">Required fields are marked *</p>
      <p class="information-text-rigth your-review">Your Review*</p>
      <div><input type="search" class="underline-input" /></div>

      <input type="search" placeholder="Enter your name *" class="underline-input2" />

      <div class="checkbox-wrapper">
        <input type="checkbox" id="myCheck" class="check-mark-input" />
        <label for="myCheck" class="information-text-rigth">
          Save my name, and website in this browser for the next time I comment
        </label>
      </div>

      <p class="information-text-rigth">Your Rating*</p>
      <StarRating />

      <div class="button-perimeter">
        <button class="btn-submit">Submit</button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" src="./ProductReviews.scss"></style>
