<template>
  <div>
    <transition name="down">
      <div
        v-show="isVisable"
        class="min-w-[420px] fixed top-[20px] left-[50%] translate-x-[-50%] z-50 flex items-center px-3 py-1.5 rounded-sm border cursor-pointer"
        :class="styles[type].containerClass"
      >
        <m-svg-icon
          :name="styles[type].icon"
          :fillClass="styles[type].fillClass"
          class="h-1.5 w-1.5 mr-1.5"
        ></m-svg-icon>
        <span class="text-sm" :class="styles[type].textClass">{{
          content
        }}</span>
      </div>
    </transition>
  </div>
</template>
<script>
const SUCCESS = 'success'
const WARN = 'warn'
const ERROR = 'error'
const typeEnum = [SUCCESS, WARN, ERROR]
</script>
<script setup>
import { ref, onMounted } from 'vue'
import mSvgIcon from '../svg-icon/index.vue'
const props = defineProps({
  type: {
    type: String,
    required: true,
    validator(val) {
      const result = typeEnum.includes(val)
      if (!result) {
        throw new Error(
          'type must be one of the following values: success, warn, error'
        )
      }
      return result
    }
  },
  content: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  destory: {
    type: Function
  }
})
const styles = {
  warn: {
    icon: 'warn',
    fillClass: 'fill-warn-300',
    textClass: 'text-warn-300',
    containerClass:
      'bg-warn-100 border-warn-200 hover:shadow-lg hover:shadow-warn-100'
  },

  error: {
    icon: 'error',
    fillClass: 'fill-error-300',
    textClass: 'text-error-300',
    containerClass:
      'bg-error-100 border-error-200 hover:shadow-lg hover:shadow-error-100'
  },
  success: {
    icon: 'success',
    fillClass: 'fill-success-300',
    textClass: 'text-success-300',
    containerClass:
      'bg-success-100 border-success-200 hover:shadow-lg hover:shadow-success-100'
  }
}
const isVisable = ref(true)
const aminateDuration = '0.5s'
onMounted(() => {
  isVisable.value = true
  setTimeout(() => {
    isVisable.value = false
    setTimeout(() => {
      if (props.destory) props.destory()
    }, parseInt(aminateDuration.replace('s', '').replace('0.', '') * 100))
  }, props.duration)
})
</script>
<style lang="scss" scoped>
.down-enter-active, 
.down-leave-active {
  transition: all v-bind(aminateDuration);
}
.down-enter-from,
.down-leave-to {
  opacity: 0;
  transform: translate3d(-50%, -100px, 0);
}
</style>
