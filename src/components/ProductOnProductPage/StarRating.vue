<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'
import { v7 as uuidv7 } from 'uuid'
const props = defineProps({
  modelValue: { type: Number, default: 0 },
  readonly: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue'])

const rating = ref(props.modelValue)
const hoverRating = ref(0)

watch(
  () => props.modelValue,
  (v) => {
    rating.value = v
  },
)

const handleMouseMove = (event: MouseEvent, index: number) => {
  if (props.readonly) return
  const el = event.currentTarget
  if (!(el instanceof HTMLElement)) return

  const { left, width } = el.getBoundingClientRect()
  const x = event.clientX - left
  hoverRating.value = x < width / 2 ? index + 0.5 : index + 1
}

const handleMouseLeave = () => {
  if (props.readonly) return
  hoverRating.value = 0
}

const uid = ref('')
onMounted(() => {
  uid.value = uuidv7()
})
const handleClick = (event: MouseEvent, index: number) => {
  if (props.readonly) return
  const el = event.currentTarget
  if (!(el instanceof HTMLElement)) return
  const { left, width } = el.getBoundingClientRect()
  const x = event.clientX - left
  rating.value = x < width / 2 ? index + 0.5 : index + 1
  emit('update:modelValue', rating.value)
}
const getStarFill = (index: number) => {
  const value = hoverRating.value || rating.value
  if (value >= index + 1) return 1
  if (value >= index + 0.5) return 0.5
  return 0
}
</script>

<template>
  <div class="star-container">
    <div
      class="star-wrapper"
      v-for="(star, index) in 5"
      :key="index"
      @mousemove="handleMouseMove($event, index)"
      @mouseleave="handleMouseLeave"
      @click="handleClick($event, index)"
      :style="props.readonly ? 'pointer-events:none;' : ''"
    >
      <svg viewBox="0 0 24 24" class="star">
        <polygon
          points="12,2 15,10 23,10 17,15 19,23 12,18 5,23 7,15 1,10 9,10"
          fill="#000"
          stroke="#000"
          stroke-width="1"
        />
        <clipPath :id="'clip-' + uid + '-' + index">
          <rect :width="getStarFill(index) * 24" height="24" />
        </clipPath>
        <polygon
          points="12,2 15,10 23,10 17,15 19,23 12,18 5,23 7,15 1,10 9,10"
          fill="#a18a68"
          stroke="#a18a68"
          stroke-width="1"
          :clip-path="'url(#clip-' + uid + '-' + index + ')'"
        />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.star-container {
  display: flex;
  gap: 5px;
}
.star-wrapper {
  width: 18px;
  height: 18px;
}
.star {
  width: 100%;
  height: 100%;
}
</style>
