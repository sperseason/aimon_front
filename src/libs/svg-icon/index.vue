<template>
  <svg aria-hidden="true">
    <use :xlink:href="symbolId" :class="fillClass" :fill="color"></use>
  </svg>
</template>
<script setup>
import { computed } from 'vue'
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String
  },
  fillClass: {
    type: String
  }
})
const symbolId = computed(() => {
  return `#icon-${props.name}`
})
</script>
<style lang="scss" scoped></style>
