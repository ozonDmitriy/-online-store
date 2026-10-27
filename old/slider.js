import Swiper from 'swiper'
import { Navigation, Pagination, Autoplay, Manipulation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const SLIDE_CHANGE_DELAY_MS = 5000 // задержка между слайдами (мс)
const MOBILE_BREAKPOINT_PX = 660 // ширина экрана для мобильного режима
const PROMOS_API_URL = 'https://api.dev.cwe.su/api/promos/?populate=*'

let swiper = null // глобально, чтобы можно было пересоздать

// --- Функции --- //

// Получение данных с API
export async function fetchPromos() {
  try {
    const res = await fetch(PROMOS_API_URL)
    if (!res.ok) throw new Error(`Ошибка запроса: ${res.status}`)
    return await res.json()
  } catch (err) {
    console.error('Ошибка при загрузке промо:', err)
    return null
  }
}

// Создание HTML-шаблона для слайда
function createPromoSlide(promo) {
  const isMobile = window.innerWidth <= MOBILE_BREAKPOINT_PX && promo.mobileImage
  const imageToShow = isMobile ? promo.mobileImage : promo.desktopImage

  return `
    <div class="swiper-slide">
      <div class="promos__girl">
        <img class="promos__girlContent ${isMobile ? 'promos__mobile' : 'promos__desktop'}"
             src="${imageToShow}"
             alt="${promo.product.title}" />
        <div class="promos__text-on-border">
          <div class="promos__Text-content">
            <p class="promos__Text-on-content">${promo.product.title}</p>
            <p class="promos__cost-content">$ ${promo.product.price}</p>
          </div>
          <div class="promos__Button-border">
            <button class="promos__ViewButton">
              <span class="promos__buttonText">View Product</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `
}

// Рендер слайдов и инициализация Swiper
export function renderAndInitSwiper(promos) {
  const wrapper = document.querySelector('.swiper-promos .swiper-wrapper')
  if (!wrapper) return

  // Очистка слайдов
  wrapper.innerHTML = ''

  promos.forEach((promo, index) => {
    wrapper.insertAdjacentHTML('beforeend', createPromoSlide(promo))
  })

  // Уничтожение старого Swiper (если был)
  if (swiper) swiper.destroy(true, true)

  // Инициализация нового Swiper
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

  // Настройка object-position для мобильных картинок
  const slides = document.querySelectorAll('.swiper-slide .promos__mobile')
  slides.forEach((img, i) => {
    if (i < 2) {
      img.style.objectPosition = 'left'
    } else {
      img.style.objectPosition = 'center'
    }
  })
}

// --- Загрузка промо и рендер --- //
async function loadPromos() {
  const data = await fetchPromos()
  if (data && Array.isArray(data.data)) {
    const promosArray = data.data
    renderAndInitSwiper(promosArray)

    // Сохраняем для ресайза
    window.promosArray = promosArray
  }
}

// --- Обновление при ресайзе --- //
window.addEventListener('resize', () => {
  if (window.promosArray) {
    renderAndInitSwiper(window.promosArray)
  }
})

// Запуск
loadPromos()
