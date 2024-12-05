<template>
  <div>
    <teleport to="body">
      <transition name="fade">
        <div
          class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0"
          v-if="modelValue"
          @click="emits('update:modelValue', false)"
        ></div>
      </transition>
      <transition name="popup-down-up">
        <div
          v-bind="$attrs"
          class="w-screen bg-white dark:bg-zinc-800 z-50 fixed bottom-0"
          v-if="modelValue"
        >
          <slot></slot>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script setup>
import { useScrollLock } from '@vueuse/core'
import { watch } from 'vue'
const props = defineProps({
  modelValue: {
    required: true,
    type: Boolean
  }
})
const emits = defineEmits(['update:modelValue'])
const isLocked = useScrollLock(document.body)
watch(
  () => props.modelValue,
  (val) => {
    isLocked.value = val
  },
  {
    immediate: true
  }
)
</script>
<style lang="scss" scoped>
.fade-enter-active {
  transition: all 0.3s;
}
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.popup-down-up-enter-active {
  transition: all 0.3s;
}
.popup-down-up-leave-active {
  transition: all 0.3s;
}
.popup-down-up-enter-from,
.popup-down-up-leave-to {
  transform: translateY(100%);
}
</style>
