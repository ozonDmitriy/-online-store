<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { fetchPromos } from '@/usePromo'
import useIsMobile from '@/useIsMobileSlider'
import TheOnePromoSlide from './TheOnePromoSlide.vue'
import { onMounted } from 'vue'

const promos = ref([])
const isMobile = useIsMobile()

const swiperOptions = {
  modules: [Navigation, Pagination, Autoplay],
  loop: promos.value.length > 1,
  autoplay: { delay: 5000 },
  pagination: {
    clickable: true,
    bulletClass: 'my-bullet',
    bulletActiveClass: 'my-bullet-active',
  },
  slidesPerView: 1,
  spaceBetween: 20,
}
onMounted(async () => {
  try {
    promos.value = await fetchPromos()
    swiperOptions.loop = promos.value.length > 1
  } catch (error) {
    console.error('Ошибка при загрузке промо:', error)
    promos.value = []
  }
})
</script>

<template>
  <Swiper v-bind="swiperOptions" class="swiper-promos">
    <SwiperSlide v-for="(promo, i) in promos" :key="promo.id">
      <TheOnePromoSlide :promo="promo" :index="i" :isMobile="isMobile" />
    </SwiperSlide>
  </Swiper>
</template>
