<template>
  <m-popver class="flex items-center" placement="bottom-left">
    <template #reference>
      <div
        class="guide-my relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none hover:bg-zinc-100 dark:bg-zinc-900"
        v-if="$store.getters.token"
      >
        <img
          v-lazy
          :src="$store.getters.userInfo.avatar"
          alt=""
          class="w-3 h-3 rounded-sm"
        />
        <m-svg-icon
          class="h-1.5 w-1.5 ml-0.5"
          name="down-arrow"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></m-svg-icon>
        <m-svg-icon
          class="h-1.5 w-1.5 absolute right-[16px] bottom-0"
          name="vip"
          fillClass="fill-zinc-900"
          v-if="$store.getters.userInfo.vipLevel"
        ></m-svg-icon>
      </div>
      <div v-else>
        <m-button
          icon="profile"
          iconColor="#fff"
          @click="onToLogin"
          class="guide-my"
        ></m-button>
      </div>
    </template>
    <div class="w-[140px] overflow-hidden" v-if="$store.getters.token">
      <div
        class="flex items-center p-1 cursor-pointer roundsm hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
        v-for="item in menuArr"
        :key="item.id"
        @click="onItemClick(item)"
      >
        <m-svg-icon
          :name="item.icon"
          class="w-1.5 h-1.5 mr-1"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></m-svg-icon>
        <span class="text-zinc-800 text-sm dark:text-zinc-300">{{
          item.title
        }}</span>
      </div>
    </div>
  </m-popver>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { confirm } from '@/libs/index.js'
const router = useRouter()
const store = useStore()
const menuArr = [
  {
    id: 0,
    title: '个人资料',
    icon: 'profile',
    path: '/profile'
  },
  {
    id: 1,
    title: '升级vip',
    icon: 'vip-profile',
    path: '/member'
  },
  {
    id: 2,
    title: '退出登录',
    icon: 'logout',
    path: ''
  }
]
const onToLogin = () => {
  store.commit('app/changeRouterType', 'push')
  router.push('/login')
}
const onItemClick = (item) => {
  if (item.id === 2) {
    confirm('您确定要退出登录吗？').then(() => {
      store.dispatch('user/logout')
    })
  }
  store.commit('app/changeRouterType', 'push')
  router.push(item.path)
}
</script>
<style lang="scss" scoped></style>
