<template>
  <div>
    <!-- 蒙版 -->
    <transition name="fade">
      <div
        v-if="isVisable"
        @click="close"
        class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0"
      ></div>
    </transition>
    <!-- 内容 -->
    <transition name="up">
      <div
        v-if="isVisable"
        class="max-w-[80%] max-h-[80%] overflow-auto fixed top-[10%] left-[50%] translate-x-[-50%] z-50 px-2 py-1.5 rounded-sm border dark:border-zinc-600 cursor-pointer bg-white dark:bg-zinc-800 xl:min-w-[35%]"
      >
        <!-- 标题 -->
        <div
          class="text-lg font-blod text-zinc-900 dark:text-zinc-200 mb-2"
          v-if="title"
        >
          {{ title }}
        </div>
        <!-- 内容 -->
        <div class="text-base text-zinc-900 dark:text-zinc-200 mb-2">
          <slot></slot>
        </div>
        <!-- 按钮 -->
        <div class="flex justify-end" v-if="cancelHandler || confirmHandler">
          <m-button type="info" class="mr-2" @click="onCancelClick">{{
            cancelText
          }}</m-button>
          <m-button type="primary" @click="onConfirmClick">{{
            confirmText
          }}</m-button>
        </div>
      </div>
    </transition>
  </div>
</template>
<script setup>
import { useVModel } from '@vueuse/core'
import { ref } from 'vue'
const props = defineProps({
  // 控制开关
  modelValue: {
    type: Boolean,
    required: true
  },
  // 标题
  title: {
    type: String
  },
  // 确定按钮文本
  cancelText: {
    type: String,
    default: '取消'
  },
  // 取消按钮文本
  confirmText: {
    type: String,
    default: '确定'
  },
  // 确定按钮点击事件
  confirmHandler: {
    type: Function
  },
  // 取消按钮点击事件
  cancelHandler: {
    type: Function
  },
  // 关闭的回调
  close: {
    type: Function
  }
})
defineEmits(['update:modelValue'])
const isVisable = useVModel(props)
const duration = '0.5s'
const onCancelClick = () => {
  if (props.cancelHandler) {
    props.cancelHandler()
  }
  close()
}
const onConfirmClick = () => {
  if (props.confirmHandler) {
    props.confirmHandler()
  }
  close()
}
const close = () => {
  isVisable.value = false
  if (props.close) {
    props.close()
  }
}
</script>
<style lang="scss" scoped>
.fade-enter-active {
  transition: all v-bind(duration);
}
.fade-leave-active {
  transition: all v-bind(duration);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.up-enter-active {
  transition: all v-bind(duration);
}
.up-leave-active {
  transition: all v-bind(duration);
}
.up-enter-from,
.up-leave-to {
  opacity: 0;
  transform: translate3d(-50%, 100px, 0);
}
</style>
