<template>
  <div>
    <div class="text-xs mb-1 text-zinc-400">热门精选</div>
    <div class="flex h-[140px]" v-if="themeData.list.length">
      <div
        class="relative rounded w-[260px] cursor-pointer"
        :style="{
          backgroundColor: randomRGB()
        }"
      >
        <img
          v-lazy
          class="w-full h-full object-cover rounded"
          :src="themeData.big.photo"
          alt=""
        />
        <p
          class="absolute bottom-0 left-0 w-full h-[45%] flex items-center backdrop-blur rounded px-1 text-white text-xs duration-300 hover:backdrop-blur-none"
        >
          #{{ themeData.big.title }}
        </p>
      </div>
      <div class="flex flex-wrap flex-1 max-w-[860px]">
        <div
          v-for="(item, index) in themeData.list"
          :key="item.id"
          class="h-[45%] w-[260px] text-white text-xs relative ml-1.5 mb-1.5 rounded"
        >
          <img
            v-lazy
            class="w-full h-full object-cover rounded"
            :src="item.photo"
            alt=""
          />
          <p
            class="backdrop-blur absolute left-0 top-0 w-full h-full flex items-center px-1 rounded cursor-pointer duration-300 hover:backdrop-blur-none"
          >
            #{{ item.title }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { getThemes } from '@/api/pexcel.js'
import { randomRGB } from '@/utils/color'
const themeData = ref({
  big: {},
  list: []
})
const getThemesData = async () => {
  const { themes } = await getThemes()
  themeData.value.big = themes[0]
  themeData.value.list = themes.splice(1, themes.length)
  console.log(themeData.value)
}
getThemesData()
</script>
<style lang="scss" scoped></style>
