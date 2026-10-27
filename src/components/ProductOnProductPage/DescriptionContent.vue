<script lang="ts" setup>
type Description = { description: string }
const props = defineProps<{ product: Description }>()
</script>

<template>
  <div class="meaningСharacteristic">
    {{ product.description }}
  </div>
</template>
