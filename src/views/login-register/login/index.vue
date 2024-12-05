<template>
  <div
    class="relative h-screen bg-white dark:bg-zinc-800 text-center xl:bg-zinc-200"
  >
    <header-vue></header-vue>
    <div
      class="block px-3 mt-4 dark:bg-zinc-800 xl:bg-white xl:w-[388px] xl:dark:bg-zinc-900 xl:m-auto xl:mt-8 xl:rounded-sm xl:shadow-lg xl:py-4"
    >
      <h3
        class="hidden mb-2 font-semibold text-base text-main dark:text-zinc-300 xl:block"
      >
        账号登录
      </h3>
      <vee-form @submit="onLoginHandler">
        <!-- 用户名 -->
        <VeeField
          type="text"
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b w-full outline-none pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:default:bg-zinc-900"
          name="username"
          placeholder="请输入用户名"
          autocomplete="off"
          :rules="validateUsername"
          v-model="loginForm.username"
        />
        <vee-error-message
          class="text-sm text-red-600 block mt-0.5 text-left"
          name="username"
        ></vee-error-message>
        <!-- 密码 -->
        <VeeField
          type="password"
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b w-full outline-none pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:default:bg-zinc-900"
          name="password"
          placeholder="请输入密码"
          autocomplete="off"
          :rules="validatePassword"
          v-model="loginForm.password"
        />
        <vee-error-message
          class="text-sm text-red-600 block mt-0.5 text-left"
          name="password"
        ></vee-error-message>
        <div class="pt-1 pb-3 leading-[0px] text-right">
          <a
            class="inline-block p-1 text-zinc-400 text-right dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-300 cursor-pointer"
            @click="onRegisterHandler"
            >去注册</a
          >
        </div>
        <m-button
          class="w-full dark:bg-zinc-900 xl:dark:bg-zinc-800"
          :loading="loading"
          >登录</m-button
        >
      </vee-form>
      <!-- 第三方登录 -->
      <div class="flex justify-around mt-4">
        <!-- qq -->
        <qq-login-vue></qq-login-vue>
        <!-- 微信 -->
        <weixin-login-vue> </weixin-login-vue>
      </div>
    </div>
    <slider-captcha-vue
      v-if="isSliderCaptchaVisable"
      @close="isSliderCaptchaVisable = false"
      @success="onCaptchaSuccess"
    ></slider-captcha-vue>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import headerVue from '../components/header.vue'
import sliderCaptchaVue from './slider-captcha.vue'
import { validateUsername, validatePassword } from '../validate.js'
import qqLoginVue from './qq-login.vue'
import weixinLoginVue from './weixin-login.vue'
import {
  Form as VeeForm,
  Field as VeeField,
  ErrorMessage as VeeErrorMessage
} from 'vee-validate'
import { LOGIN_TYPE_USERNAME } from '@/constants/index.js'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const store = useStore()
const router = useRouter()
// 控制slidercaptcha展示
const isSliderCaptchaVisable = ref(false)
const onLoginHandler = () => {
  isSliderCaptchaVisable.value = true
}
const onCaptchaSuccess = () => {
  isSliderCaptchaVisable.value = false
  onLogin()
}
const loading = ref(false)
const loginForm = ref({
  username: 'LGD_Sunday',
  password: '123123'
})
const onLogin = async () => {
  loading.value = true
  try {
    await store.dispatch('user/login', {
      ...loginForm.value,
      loginType: LOGIN_TYPE_USERNAME
    })
  } finally {
    loading.value = false
  }
  router.push('/')
}
const onRegisterHandler = () => {
  store.commit('app/changeRouterType', 'push')
  router.push('/register')
}
</script>
<style lang="scss" scoped></style>
