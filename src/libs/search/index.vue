<template>
  <div
    class="relative p-0.5 rounded-xl border-white dark:border-zinc-200 duration-500 hover:bg-red-100/40 group"
    ref="containerTarget"
  >
    <div>
      <m-svg-icon
        class="w-1.5 h-1.5 absolute translate-y-[-50%] left-2 top-[50%]"
        name="search"
        color="#707070"
      ></m-svg-icon>
      <input
        class="block w-full h-[44px] pl-4 outline-0 bg-zinc-100 caret-zinc-400 rounded-xl text-zinc-900 tracking-wide font-semibold border border-zinc-100 text-sm focus:border-red-300 duration-500 group-hover:bg-white group-hover:border-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700 dark:group-hover:bg-zinc-900 dark:group-hover:border-zinc-700"
        type="text"
        placeholder="搜索"
        v-model="inputValue"
        @keyup.enter="onSearchHandler"
        @focus="onFocusHandler"
        @blur="onBlurHandler"
      />
      <m-svg-icon
        v-show="inputValue"
        name="input-delete"
        class="h-1.5 w-1.5 absolute translate-y-[-50%] right-9 top-[50%] cursor-pointer duration-500"
        @click="onClearClick"
      ></m-svg-icon>
      <div
        class="opacity-0 h-1.5 w-[1px] absolute translate-y-[-50%] top-[50%] right-[62px] duration-500 bg-zinc-200 group-hover:opacity-100"
      ></div>
      <m-button
        icon="search"
        iconColor="#fff"
        class="absolute translate-y-[-50%] top-[50%] right-1 rounded-full opacity-0 group-hover:opacity-100 duration-500"
        @click="onSearchHandler"
      ></m-button>
    </div>
    <transition name="slide">
      <div
        v-if="$slots.dropdown"
        v-show="isFocus"
        class="max-h-[368px] w-full text-base overflow-auto bg-white dark:bg-zinc-800 absolute z-20 left-0 top-[56px] p-2 rounded border border-zinc-200 dark:border-zinc-600 duration-200 hover:shadow-2xl scrollbar-thin scrollbar-thumb-transparent xl:scrollbar-thumb-zinc-200 xl:dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent"
      >
        <slot name="dropdown"></slot>
      </div>
    </transition>
  </div>
</template>
<script>
const EMIT_UPDATE_MODELVALUE = 'update:modelValue'
const EMIT_SERACH = 'search'
// 删除所有文本
const EMIT_CLEAR = 'clear'
// 输入事件
const EMIT_INPUT = 'input'
// 获取焦点
const EMIT_FOCUS = 'focus'
// 失去焦点
const EMIT_BLUR = 'blur'
</script>
<script setup>
import { ref, watch } from 'vue'
import { useVModel, onClickOutside } from '@vueuse/core'
const props = defineProps({
  modelValue: {
    required: true,
    type: String
  }
})
const inputValue = useVModel(props)
const emits = defineEmits([
  EMIT_UPDATE_MODELVALUE,
  EMIT_SERACH,
  EMIT_CLEAR,
  EMIT_INPUT,
  EMIT_FOCUS,
  EMIT_BLUR
])
//监听用户输入行为
watch(inputValue, (val) => {
  console.log('val', val)
  emits(EMIT_INPUT, val)
})
const onClearClick = () => {
  inputValue.value = ''
  emits(EMIT_CLEAR, '')
}
const onSearchHandler = () => {
  emits(EMIT_SERACH, inputValue.value)
}
const isFocus = ref(false)
const containerTarget = ref(null)
const onFocusHandler = () => {
  isFocus.value = true
  emits(EMIT_FOCUS)
}
const onBlurHandler = () => {
  emits(EMIT_BLUR)
}
onClickOutside(containerTarget, () => {
  isFocus.value = false
})
</script>
<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease-in-out;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(40px);
}
</style>
