<script setup></script>
<template>
  <div class="catalog__search-block">
    <p class="catalog__logo-catalog">Shop The Latest</p>
    <div class="catalog__search-catalog">
      <input type="search" placeholder="Search..." class="catalog__search-input" />
      <img class="catalog__icon-search" src="/images/Icon-search.svg" alt="" />
    </div>
    <div class="catalog__sorting-list-border">
      <select id="sorting" class="catalog__sorted-catalog">
        <option disabled value="" selected>Sort by</option>
        <option value="price_asc">Cheaper first</option>
        <option value="price_desc">Cheaper end</option>
        <option value="popularity">By popularity</option>
      </select>
      <img src="/images/Icon sort.svg" class="catalog__sort-select" alt="Search" />
    </div>
    <div class="catalog__button-sorting">
      <div class="catalog__button-custom">
        <label class="catalog__text-label" for="sale-toggle">On sale</label>
        <label class="catalog__switch">
          <input type="checkbox" id="sale-toggle" />
          <span class="catalog__slider"></span>
        </label>
      </div>
      <div class="catalog__button-custom">
        <label class="catalog__text-label" for="sale-toggle-second">In stock</label>
        <label class="catalog__switch">
          <input type="checkbox" id="sale-toggle-second" />
          <span class="catalog__slider"></span>
        </label>
      </div>
    </div>
    <div class="catalog__mobile">
      <button class="catalog__button-filter-mobile">
        <img src="/images/filter mobile.svg" alt="Фильтровать" />
        Filters
      </button>
    </div>
  </div>
</template>
<style lang="scss" src="./styleFilter.scss"></style>
