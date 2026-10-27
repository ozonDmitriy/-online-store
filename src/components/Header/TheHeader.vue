<script lang="ts" setup>
import BasketCart from '../Basket/BasketCart.vue'
import { useRouteActive } from '../../useRouteActiveHeader'

const { isActive: isShopActive } = useRouteActive(['/catalog', '/product'])
</script>
<template>
  <header class="header">
    <a class="header__logo" href="/">SHOPPE</a>
    <div class="header__right">
      <nav class="header__menu">
        <ul class="header__menu-list">
          <li class="header__menu-item">
            <router-link
              to="/catalog"
              class="header__menu-link"
              :class="{ activeShop: isShopActive }"
              >Shop</router-link
            >
            <span class="header__menu-separator">|</span>
          </li>
        </ul>
      </nav>
      <div class="header__actions">
        <BasketCart />
        <a class="header__logo-man-button" href="/">
          <img src="/images/Icon man.svg" alt="профиль" />
        </a>
        <button class="header__mobile-menu">
          <img src="/images/menumobile.svg" alt="меню" />
        </button>
      </div>
    </div>
  </header>
</template>
<style lang="scss" src="./styleHeader.scss"></style>
