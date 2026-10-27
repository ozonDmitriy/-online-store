<template>
  <div class="swiper-promos swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(promo, i) in promos" :key="promo.id">
        <div class="promos__girl">
          <img
            class="promos__girlContent"
            :class="isMobile ? 'promos__mobile' : 'promos__desktop'"
            :src="chooseImage(promo)"
            :alt="promo.product.title"
            :style="imageStyle(i)"
          />

          <div class="promos__text-on-border">
            <div class="promos__Text-content">
              <p class="promos__Text-on-content">{{ promo.product.title }}</p>
              <p class="promos__cost-content">$ {{ promo.product.price.toFixed(2) }}</p>
            </div>

            <div class="promos__Button-border">
              <button class="promos__ViewButton">
                <span class="promos__buttonText">View Product</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="swiper-pagination"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import Swiper from 'swiper'
import { Navigation, Pagination, Autoplay, Manipulation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const PROMOS_API_URL = 'https://api.dev.cwe.su/api/promos/?populate=*'
const SLIDE_CHANGE_DELAY_MS = 5000
const MOBILE_BREAKPOINT_PX = 660
const MOBILE_BREAKPOINT_SECOND_PX = 500

let swiper = null

const promos = ref([])

const isMobile = computed(() => window.innerWidth <= MOBILE_BREAKPOINT_PX)

async function loadPromos() {
  try {
    const res = await fetch(PROMOS_API_URL)
    if (!res.ok) throw new Error('Ошибка загрузки')
    const data = await res.json()

    promos.value = data.data || []
  } catch (err) {
    console.error('Ошибка API:', err)
  }
}

function chooseImage(promo) {
  return isMobile.value ? promo.mobileImage : promo.desktopImage
}

function imageStyle(index) {
  if (!isMobile.value) return {}

  if (window.innerWidth <= MOBILE_BREAKPOINT_SECOND_PX && index === 3) {
    return {
      objectPosition: '20% center',
    }
  }

  return {
    objectPosition: index < 2 ? 'left' : 'center',
  }
}

function initSwiper() {
  if (swiper) swiper.destroy(true, true)

  swiper = new Swiper('.swiper-promos', {
    modules: [Navigation, Pagination, Autoplay, Manipulation],
    loop: true,
    autoplay: { delay: SLIDE_CHANGE_DELAY_MS },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      bulletClass: 'my-bullet',
      bulletActiveClass: 'my-bullet-active',
    },
  })
}

function handleResize() {
  initSwiper()
}

onMounted(async () => {
  await loadPromos()
  initSwiper()

  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  if (swiper) swiper.destroy()
})
</script>
