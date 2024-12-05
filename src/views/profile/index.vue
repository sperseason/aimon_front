<template>
  <div
    class="h-full bg-zinc-200 dark:bg-zinc-800 duration-500 overflow-auto xl:pt-1"
  >
    <div
      class="relative max-w-screen-lg mx-auto bg-white dark:bg-zinc-900 duration-500 xl:rounded-sm xl:border-zinc-200 xl:dark:border-zinc-600 xl:border xl:px-4 xl:py-2"
    >
      <!-- 移动端navbar -->
      <m-navbar sticky v-if="isMoblieTerminal" :clickLeft="onNavbarLeftClick"
        >个人资料</m-navbar
      >
      <div v-else class="text-lg font-bold text-center mb-4 dark:text-zinc-300">
        个人资料
      </div>
      <div class="h-full w-full px-1 pb-4 text-sm mt-2 xl:text-center xl:w-2/3">
        <div class="py-1 xl:absolute xl:right-[16%] xl:text-center">
          <!-- 头像部分 -->
          <span
            class="w-8 h-2 inline-block mb-2 font-blod text-sm dark:text-zinc-300 xl:block xl:mx-auto"
            >我的头像</span
          >
          <div
            class="relative w-[80px] h-[80px] group xl:cursor-pointer xl:left-1/2 xl:translate-x-[-50%]"
            @click="onAvatarClick"
          >
            <!-- 头像 -->
            <img
              :src="$store.getters.userInfo.avatar"
              class="rounded-full w-full h-full xl:inline-block"
              alt=""
            />
            <!-- 鼠标移入 -->
            <div
              class="absolute left-0 top-0 rounded-full w-full h-full bg-black/40 hidden xl:group-hover:block duration-300"
            >
              <m-svg-icon
                name="change-header-image"
                class="w-2 h-2 m-auto mt-2"
              ></m-svg-icon>
              <div
                class="text-xs text-white dark:text-zinc-300 scale-90 mt-0.5"
              >
                点击更换头像
              </div>
            </div>
          </div>
          <!-- 隐藏域 -->
          <input
            type="file"
            v-show="false"
            ref="inputFileTarget"
            accept=".png,.jpeg,.jpg,.gif"
            @change="onSelectImgHander"
          />
          <p class="mt-1 text-zinc-500 dark:text-zinc-400 text-xs xl:w-10">
            支持.jpg,.png,.jpeg,.gif格式大小5M以内的图片
          </p>
        </div>
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
            >用户名</span
          >
          <m-input
            class="w-full"
            max="20"
            v-model="userInfo.nickname"
          ></m-input>
        </div>
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
            >职位</span
          >
          <m-input class="w-full" v-model="userInfo.title"></m-input>
        </div>
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
            >公司</span
          >
          <m-input class="w-full" v-model="userInfo.company"></m-input>
        </div>
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
            >个人主页</span
          >
          <m-input class="w-full" v-model="userInfo.homePage"></m-input>
        </div>
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
            >个人介绍</span
          >
          <m-input
            class="w-full"
            type="textarea"
            v-model="userInfo.introduction"
            max="50"
          ></m-input>
        </div>
        <m-button
          class="w-full mt-2 mb-4 dark:text-zinc-300 dark:bg-zinc-800 xl:w-[160px] xl:ml-[50%] xl:translate-x-[-50%]"
          :loading="loading"
          @click="onChangeProfile"
          >保存修改</m-button
        >
        <m-button
          v-if="isMoblieTerminal"
          class="w-full dark:text-zinc-300 dark:bg-zinc-800 xl:w-[160px] xl:ml-[50%] xl:translate-x-[-50%]"
          @click="onLogoutClick"
          >退出登录</m-button
        >
      </div>
    </div>
    <m-dialog
      title="裁剪头像"
      v-model="isDialogVisable"
      v-if="!isMoblieTerminal"
    >
      <change-avatar-vue
        :blob="currentBlob"
        @close="isDialogVisable = false"
      ></change-avatar-vue>
    </m-dialog>
    <m-popup
      v-else
      :class="{ 'h-screen': isDialogVisable }"
      v-model="isDialogVisable"
      ><change-avatar-vue
        :blob="currentBlob"
        @close="isDialogVisable = false"
      ></change-avatar-vue
    ></m-popup>
  </div>
</template>
<script setup>
import { isMoblieTerminal } from '@/utils/flexible.js'
import { confirm } from '@/libs/index.js'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import { putProfile } from '@/api/sys.js'
import { message } from '@/libs/index.js'
import changeAvatarVue from './components/change-avatar.vue'
const router = useRouter()
const store = useStore()
const isDialogVisable = ref(false)
// 选中的图片
const currentBlob = ref('')
const onNavbarLeftClick = () => {
  store.commit('app/changeRouterType', 'back')
  router.back()
}

const onLogoutClick = () => {
  confirm('确定要退出登录吗').then(() => {
    store.dispatch('user/logout')
  })
}
/**
 * 选中头像
 */
const inputFileTarget = ref(null)
const onAvatarClick = () => {
  inputFileTarget.value.click()
}
const onSelectImgHander = () => {
  const imgFile = inputFileTarget.value.files[0]
  const blob = URL.createObjectURL(imgFile)
  currentBlob.value = blob
  isDialogVisable.value = true
}
watch(
  () => isDialogVisable,
  (val) => {
    if (!val) {
      inputFileTarget.value.value = null
    }
  }
)
const loading = ref(false)
// 数据本地的双向同步
const changeStoreUserInfo = (key, value) => {
  store.commit('user/setUserInfo', {
    ...store.getters.userInfo,
    [key]: value
  })
}
const userInfo = ref(store.getters.userInfo)
/**
 * 修改个人信息
 */
const onChangeProfile = async () => {
  loading.value = true
  await putProfile(userInfo.value)
  message('success', '用户信息修改成功')
  store.commit('user/setUserInfo', userInfo.value)
  loading.value = false
}
</script>
<style lang="scss" scoped></style>
