<template>
  <div>
    <slot></slot>
    <div ref="loadingTarget" class="h-6 py-4">
      <!-- 加载更多 -->
      <m-svg-icon
        v-show="loading"
        class="w-4 h-4 mx-auto animate-spin"
        name="infinite-load"
      ></m-svg-icon>
      <!-- 没有更多数据 -->
      <p v-if="isFinished" class="text-center text-base text-zinc-400">
        没有更多数据了！
      </p>
    </div>
  </div>
</template>
<script setup>
import { useVModel, useIntersectionObserver } from '@vueuse/core'
import { ref, watch } from 'vue'
const props = defineProps({
  // 是否处于加载状态
  modelValue: {
    type: Boolean,
    required: true
  },
  // 数据是否加载完成
  isFinished: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['onload', 'update:modelValue'])
// 处理 loading 状态
const loading = useVModel(props)
const loadingTarget = ref(null)
const targetIsIntersecting = ref(false)
useIntersectionObserver(loadingTarget, ([{ isIntersecting }]) => {
  targetIsIntersecting.value = isIntersecting
  emitLoad()
})
const emitLoad = () => {
  setTimeout(() => {
    if (targetIsIntersecting.value && !loading.value && !props.isFinished) {
      loading.value = true
      emits('onload')
    }
  }, 200)
}
watch(loading, () => {
  emitLoad()
})
</script>
<style lang="scss" scoped></style>
