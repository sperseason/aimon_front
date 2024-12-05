<template>
  <div
    class="w-full bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 px-2 py-1 duration-200"
  >
    <div class="flex items-center mr-2">
      <img
        v-lazy
        class="h-4 cursor-pointer mr-1 guide-home"
        src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
        @click="onToHome"
      />
      <header-search class="mr-1"></header-search>
      <header-theme class="mr-1"></header-theme>
      <header-my></header-my>
    </div>
  </div>
</template>
<script setup>
import headerSearch from './Header-search/index.vue'
import HeaderMy from './Header-my.vue'
import HeaderTheme from './Header-theme.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const onToHome = () => {
  router.push('/')
}
</script>
<style lang="scss" scoped></style>
