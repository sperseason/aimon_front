<template>
  <div
    class="fixed top-[20%] left-[50%] translate-x-[-50%] w-[340px] h-[270px] text-sm bg-white dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-200 shadow-2xl"
  >
    <div class="flex items-center h-5 text-left px-1 mb-1">
      <span class="flex-grow dark:text-zinc-200">请完成安全验证</span>
      <m-svg-icon
        name="refresh"
        fillClass="fill-zinc-900 dark:fill-zinc-200"
        class="w-3 h-3 p-0.5 rounded-sm duration-300 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-900"
        @click="onReset"
      ></m-svg-icon>
      <m-svg-icon
        name="close"
        fillClass="fill-zinc-900 dark:fill-zinc-200"
        class="ml-2 w-3 h-3 p-0.5 rounded-sm duration-300 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-900"
        @click="onClose"
      ></m-svg-icon>
    </div>
    <div id="captcha"></div>
  </div>
</template>
<script setup>
import '@/vendor/SliderCaptcha/longbow.slidercaptcha.min.js'
import '@/vendor/SliderCaptcha/slidercaptcha.min.css'
import { onMounted } from 'vue'
import { getCaptcha } from '@/api/sys.js'
const emits = defineEmits(['close', 'success'])
/**
 * 使用人类行为验证
 * 1.创建captcha实例
 */
let captcha = null
onMounted(() => {
  captcha = sliderCaptcha({
    // 渲染位置
    id: 'captcha',
    // 用户拼图成功后的回调
    async onSuccess(arr) {
      const res = await getCaptcha({
        behavior: arr
      })
      if (res) {
        // TODO:人类验证通过
        emits('success')
      }
    },
    // 用户拼图失败后的回调
    onFail(arr) {
      console.log('onFail')
    },
    // 默认的验证方法
    verify() {
      console.log('verify')
      return true
    }
  })
})
const onReset = () => {
  captcha.reset()
}
const onClose = () => {
  emits('close')
}
</script>
<style lang="scss" scoped></style>
