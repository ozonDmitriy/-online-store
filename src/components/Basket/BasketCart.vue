<script setup>
import { useCartStore } from '@/basket'
import { computed } from 'vue'
const cart = useCartStore()
const totalQty = computed(() => cart.items.reduce((sum, item) => sum + item.qty, 0))
const totalPrice = computed(() => cart.items.reduce((sum, item) => sum + item.price * item.qty, 0))
function discountPrice(item) {
  return item.price / (1 - item.discountPercent / 100)
}
function toggleCart() {
  cart.toggleCart()
}
const shortTitle = (text, maxLength) => {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text
}
</script>
<template>
  <button class="basket__button" @click.stop="toggleCart">
    <img src="/images/Group 77.svg" alt="корзина" />
    <div class="header__shop-count">{{ totalQty }}</div>
  </button>
  <div v-if="cart.isBagOpen" class="overlay" @click="cart.closeCart"></div>
  <div v-if="cart.isBagOpen" v-click-outside="() => cart.closeCart()" class="modal">
    <div class="basket__mobile-flex">
      <img
        src="/images/backtopage.svg"
        alt=""
        class="basket__mobile-back-icon"
        @click.stop="toggleCart"
      />
      <p class="basket__title">Shopping bag</p>
    </div>
    <p class="basket__count-header">{{ totalQty }} items</p>
    <router-link
      v-if="cart.items.length === 0"
      to="/catalog"
      class="basket__empty"
      @click="cart.closeCart()"
      >Your cart is empty. Add items.</router-link
    >
    <div class="basket__scroll">
      <div v-for="item in cart.items" :key="item.id">
        <div class="basketCart">
          <router-link :to="`/product/${item.id}`"
            ><img class="basketImage" :src="item.image" :alt="item.title"
          /></router-link>

          <div>
            <p class="basket__product-title">{{ shortTitle(item.title, 15) }}</p>
            <p class="basket__color-size">{{ item.color }} / {{ item.size }}</p>
            <div class="basket__product-price">
              <p class="basket__discountPercent" v-if="item.discountPercent > 0">
                $ {{ discountPrice(item).toFixed(2) }}
              </p>
              <p class="basket__price">$ {{ item.price.toFixed(2) }}</p>
            </div>
            <div class="header__basket-counter">
              <p class="header__basket-counter-name">QTY:</p>
              <div class="header__basket-counter-signs">
                <button class="basket__btn" @click="cart.decreaseQty(item.id)">-</button>
                <span class="basket__countProduct">{{ item.qty }}</span>
                <button class="basket__btn" @click="cart.increaseQty(item.id)">+</button>
              </div>
            </div>
          </div>

          <div class="basket__close-product">
            <img @click="cart.removeItem(item.id)" src="/images/crest.svg" />
          </div>
        </div>
      </div>
    </div>
    <div class="header__basket-end">
      <hr class="header__basket-line" />
      <div class="header__basket-total">
        <p class="header__basket-totalCount">Subtotal ({{ cart.totalItems }} items)</p>
        <p class="header__basket-totalCost">$ {{ totalPrice.toFixed(2) }}</p>
      </div>
      <div class="header__basket-button">
        <button class="header__basket-button-view">VIEW CART</button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" src="./styleBasketCart.scss"></style>
