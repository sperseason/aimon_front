<template>
  <button
    class="text-sm text-center rounded duration-150 flex justify-center items-center outline-none"
    :class="[
      typeEum[type],
      sizeEum[iconKey].button,
      {
        'actvie:scale-105': isAactiveAnim
      }
    ]"
    @click.stop="onBtnClick"
  >
    <m-svg-icon
      v-if="loading"
      name="loading"
      class="w-2 h-2 animate-spin mr-1"
    ></m-svg-icon>
    <m-svg-icon
      v-if="icon"
      :name="icon"
      class="m-auto"
      :class="sizeEum[iconKey].icon"
      :color="iconColor"
      :fillClass="iconClass"
    ></m-svg-icon>
    <slot v-else></slot>
  </button>
</template>
<script>
import mSvgIcon from '../svg-icon/index.vue'
const typeEum = {
  primary:
    'text-white dark:bg-zinc-900 bg-zinc-800 hover:bg-zinc-900 dark:hover:bg-zinc-700 active:bg-zinc-800 dark:active:bg-zinc-700',
  main: 'text-white bg-main dark:bg-zinc-900 hover:bg-hover-main dark:hover:bg-zinc-700  active:bg-main dark:active:bg-zinc-700',
  info: 'text-zinc-800 dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 active:bg-zinc-200 dark:active:bg-zinc-700'
}
const sizeEum = {
  // 文字按钮
  default: {
    button: 'w-8 h-4 text-base',
    icon: ''
  },
  // icon按钮
  'icon-default': {
    button: 'w-4 h-4',
    icon: 'w-1.5 h-1.5'
  },
  small: {
    button: 'w-7 h-3 text-base',
    icon: ''
  },
  'icon-small': {
    button: 'w-3 h-3',
    icon: 'w-1.5 h-1.5'
  }
}
const EMIT_CLICK = 'click'
</script>
<script setup>
import { computed } from 'vue'
const props = defineProps({
  // icon图标
  icon: {
    type: String,
    default: ''
  },
  iconColor: String,
  iconClass: String,
  type: {
    type: String,
    default: 'main',
    validator(val) {
      const keys = Object.keys(typeEum)
      const result = keys.includes(val)
      if (!result) {
        throw new Error(`你的 type 值必须是${keys.join('、')}中的一个`)
      }
      return result
    }
  },
  size: {
    type: String,
    default: 'default',
    validator(val) {
      const keys = Object.keys(sizeEum)
      const result = keys.filter((item) => !item.includes('icon')).includes(val)
      if (!result) {
        throw new Error(`你的 size 值必须是${keys.join('、')}中的一个`)
      }
      return result
    }
  },
  // 点击时是否需要动画
  isAactiveAnim: {
    type: Boolean,
    default: true
  },
  // 加载状态
  loading: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits([EMIT_CLICK])
const iconKey = computed(() => {
  return props.icon ? `icon-${props.size}` : `${props.size}`.replace('icon', '')
})
const onBtnClick = () => {
  if (props.loading) {
    return
  }
  emits(EMIT_CLICK)
}
</script>
<style lang="scss" scoped></style>
