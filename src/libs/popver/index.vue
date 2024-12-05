<template>
  <div class="relative" @mouseenter="onMouseenter" @mouseleave="onMouseleave">
    <div ref="referenceTarget">
      <!-- 具名插槽：触发弹层的视图 -->
      <slot name="reference"></slot>
    </div>
    <transition name="slide">
      <div
        v-show="isVisable"
        class="absolute p-1 z-20 bg-white dark:bg-zinc-900 dark:border-zinc-700 border rounded-md"
        ref="containerTarget"
        :style="contentStyle"
      >
        <!-- 匿名插槽：弹出层视图 -->
        <slot />
      </div>
    </transition>
  </div>
</template>
<script>
const DELY_TIME = 100
const PROP_TOP_LEFT = 'top-left'
const PROP_TOP_RIGHT = 'top-right'
const PROP_BOTTOM_LEFT = 'bottom-left'
const PROP_BOTTOM_RIGHT = 'bottom-right'
const placementEnum = [
  PROP_TOP_LEFT,
  PROP_TOP_RIGHT,
  PROP_BOTTOM_LEFT,
  PROP_BOTTOM_RIGHT
]
</script>
<script setup>
import { ref, watch, nextTick } from 'vue'
const props = defineProps({
  placement: {
    type: String,
    default: PROP_BOTTOM_LEFT,
    validator(val) {
      const result = placementEnum.includes(val)
      if (!result) {
        console.error(
          `placement属性值错误，可选值：${placementEnum.join('、')}中的一个`
        )
      }
      return result
    }
  }
})
const isVisable = ref('')
let timeout = null
const onMouseenter = () => {
  isVisable.value = true
  if (timeout) clearTimeout(timeout)
}
const onMouseleave = () => {
  timeout = setTimeout(() => {
    isVisable.value = false
    timeout = null
  }, DELY_TIME)
}
const referenceTarget = ref(null)
const containerTarget = ref(null)
const useElementSize = (target) => {
  if (!target) return
  return {
    width: target.offsetWidth,
    height: target.offsetHeight
  }
}
const contentStyle = ref({
  top: 0,
  left: 0
})
watch(isVisable, () => {
  nextTick(() => {
    switch (props.placement) {
      case PROP_TOP_LEFT:
        contentStyle.value = {
          top: 0,
          left: -useElementSize(containerTarget.value).width + 'px'
        }
        break
      case PROP_TOP_RIGHT:
        contentStyle.value = {
          top: 0,
          left: useElementSize(referenceTarget.value).width + 'px'
        }
        break
      case PROP_BOTTOM_LEFT:
        contentStyle.value = {
          top: useElementSize(referenceTarget.value).height + 'px',
          left: -useElementSize(containerTarget.value).width + 'px'
        }
        break
      case PROP_BOTTOM_RIGHT:
        contentStyle.value = {
          top: useElementSize(referenceTarget.value).height + 'px',
          left: useElementSize(referenceTarget.value).width + 'px'
        }
        break
    }
  })
})
</script>
<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
