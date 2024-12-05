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
        注册账号
      </h3>
      <vee-form @submit="onRegHandler">
        <!-- 用户名 -->
        <VeeField
          type="text"
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b w-full outline-none pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:default:bg-zinc-900"
          name="username"
          placeholder="请输入用户名"
          autocomplete="off"
          :rules="validateUsername"
          v-model="registerForm.username"
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
          v-model="registerForm.password"
        />
        <vee-error-message
          class="text-sm text-red-600 block mt-0.5 text-left"
          name="password"
        ></vee-error-message>
        <!-- 确认密码 -->
        <VeeField
          type="password"
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b w-full outline-none pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:default:bg-zinc-900"
          name="confirmPassword"
          placeholder="请输入确认密码"
          autocomplete="off"
          rules="validateConfirmPassword:@password"
          v-model="registerForm.confirmPassword"
        />
        <vee-error-message
          class="text-sm text-red-600 block mt-0.5 text-left"
          name="confirmPassword"
        ></vee-error-message>
        <div class="pt-1 pb-3 leading-[0px] text-right">
          <a
            class="inline-block p-1 text-zinc-400 text-right dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-300 cursor-pointer"
            >去登录</a
          >
        </div>
        <!-- 注册协议 -->
        <div class="text-center">
          <a
            href="https://m.imooc.com/newfaq?id=89"
            class="text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-300"
            target="_black"
          >
            注册即同意《慕课网用户协议》
          </a>
        </div>
        <m-button
          class="w-full dark:bg-zinc-900 xl:dark:bg-zinc-800"
          :loading="loading"
          >立即注册</m-button
        >
      </vee-form>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import headerVue from '../components/header.vue'
import {
  validateUsername,
  validatePassword,
  validateConfirmPassword
} from '../validate.js'
import {
  Form as VeeForm,
  Field as VeeField,
  ErrorMessage as VeeErrorMessage,
  defineRule
} from 'vee-validate'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
defineRule('validateConfirmPassword', validateConfirmPassword)
const store = useStore()
const router = useRouter()
const route = useRoute()
const registerForm = ref({
  username: '',
  password: '',
  confirmPassword: ''
})
const loading = ref(false)
const onRegHandler = async () => {
  loading.value = true
  try {
    const payload = {
      username: registerForm.value.username,
      password: registerForm.value.password
    }
    store.dispatch('user/register', {
      ...payload,
      ...route.query
    })
    store.dispatch('user/login', {
      ...payload,
      loginType: 'username'
    })
  } finally {
    loading.value = false
  }
  router.push('/')
}
</script>
<style lang="scss" scoped></style>
