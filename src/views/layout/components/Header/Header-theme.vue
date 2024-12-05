<template>
  <div>
    <m-popver placement="bottom-left">
      <template #reference>
        <m-svg-icon
          :name="svgIconName"
          class="w-4 h-4 p-1 cursor-pointer rounded-sm duration-200 outline-none hover:bg-zinc-100/60 dark:hover:bg-zinc-900 guide-theme"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></m-svg-icon>
      </template>
      <div class="w-[140px] overflow-hidden">
        <div
          class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
          v-for="item in themeArr"
          :key="item.id"
          @click="onItemClick(item)"
        >
          <m-svg-icon
            :name="item.icon"
            class="w-1.5 h-1.5 mr-1"
            fillClass="fill-zinc-900 dark:fill-zinc-300"
          ></m-svg-icon>
          <span class="text-zinc-800 text-sm dark:text-zinc-300">{{
            item.name
          }}</span>
        </div>
      </div>
    </m-popver>
  </div>
</template>
<script setup>
import { THEME_LIGHT, THEME_DRAK, THEME_SYSTEM } from '@/constants/index.js'
import { useStore } from 'vuex'
import { computed } from 'vue'
const themeArr = [
  {
    id: '0',
    type: THEME_LIGHT,
    icon: 'theme-light',
    name: '极简白'
  },
  {
    id: '1',
    type: THEME_DRAK,
    icon: 'theme-dark',
    name: '暗黑'
  },
  {
    id: '2',
    type: THEME_SYSTEM,
    icon: 'theme-system',
    name: '系统默认'
  }
]
const store = useStore()
const onItemClick = (themeItem) => {
  store.commit('theme/changeThemeType', themeItem.type)
}
const svgIconName = computed(() => {
  const findTheme = themeArr.find(
    (item) => item.type === store.getters.themeType
  )
  return findTheme?.icon
})
</script>
<style lang="scss" scoped></style>
