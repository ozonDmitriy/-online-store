<script lang="ts" setup>
import { ref } from 'vue'
import DescriptionContent from './DescriptionContent.vue'
import AdditionalContent from './AdditionalContent.vue'
import ReviewsContent from './ReviewsContent.vue'
type Product = {
  reviews: string
}
const props = defineProps<{ product: Product }>()

const isActive = ref<string | null>('description')

const toggle = (tab: string) => {
  isActive.value = isActive.value === tab ? null : tab
}

const tabs = [
  { key: 'description', label: 'Description', component: DescriptionContent },
  { key: 'aditional', label: 'Aditional Information', component: AdditionalContent },
  { key: 'reviews', label: `Reviews (${props.product.reviews.length})`, component: ReviewsContent },
]
</script>

<template>
  <div class="info">
    <div class="tabs desktop-only">
      <p
        v-for="tab in tabs"
        :key="tab.key"
        @click="isActive = tab.key"
        :class="{ active: isActive === tab.key }"
      >
        {{ tab.label }}
      </p>
    </div>

    <hr class="tab-line desktop-only" />

    <div class="tab-content desktop-only">
      <component :is="tabs.find((tab) => tab.key === isActive)?.component" :product="product" />
    </div>
    <div class="mobile-only">
      <div v-for="tab in tabs" :key="tab.key" class="accordion-item">
        <div class="accordion-head" @click="toggle(tab.key)">
          <span>{{ tab.label }}</span>
          <img
            src="/images/Icon sort.svg"
            class="accordion-icon"
            :class="{ rotate: isActive === tab.key }"
          />
        </div>
        <div class="accordion-body" v-if="isActive === tab.key">
          <component :is="tab.component" :product="product" />
        </div>
      </div>
    </div>

    <hr class="tab-line mobile-only" />
  </div>
</template>

<style scoped lang="scss" src="./styleCartReviews.scss"></style>
