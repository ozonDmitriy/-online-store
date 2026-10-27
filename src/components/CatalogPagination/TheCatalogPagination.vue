<script setup></script>
<template>
  <div class="footer__page-number">
    <nav class="footer__number-menu">
      <ul class="footer__number-menu-list">
        <li class="footer__number-menu-item">
          <button class="footer__number-menu-button-prev disabled" disabled>Prev</button>
        </li>
        <li class="footer__number-menu-item">
          <button class="footer__number-menu-button active">1</button>
        </li>
        <li class="footer__number-menu-item">
          <button class="footer__number-menu-button">2</button>
        </li>
        <li class="footer__number-menu-item">
          <button class="footer__number-menu-button">3</button>
        </li>
        <li class="footer__number-menu-item">
          <button class="footer__number-menu-button-next next">Next</button>
        </li>
      </ul>
    </nav>
  </div>
</template>
<style lang="scss" src="./stylePagination.scss"></style>
