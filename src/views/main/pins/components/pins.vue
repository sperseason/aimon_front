<template>
  <div
    class="fixed top-0 left-0 w-screen h-screen text-xl z-20 backdrop-blur-4xl bg-transparent pb-2 overflow-y-auto xl:p-2"
  >
    <m-navbar v-if="isMoblieTerminal" :sticky="true"
      >{{ pexcelData.title }}
      <template #right>
        <m-svg-icon
          name="share"
          class="w-3 h-3"
          fillClass="fill-zinc-900 dark:fill-zinc-200"
        ></m-svg-icon>
      </template>
    </m-navbar>
    <m-svg-icon
      v-else
      name="close"
      class="w-3 h-3 ml-1 p-0.3 cursor-pointer duration-200 rounded-sm hover:bg-zinc-100 absolute right-2 top-2"
      fillClass="fill-zinc-400"
      @click="onPop"
    ></m-svg-icon>
    <!-- 内容 -->
    <div
      class="xl:w-[80%] xl:h-full xl:m-auto xl:rounded xl:flex"
      v-if="pexcelData"
    >
      <img
        :src="pexcelData.photo"
        alt=""
        class="w-screen mb-2 xl:w-3/5 xl:h-full xl:rounded-tl-lg xl:rounded-bl-lg"
      />
      <div
        class="xl:w-2/5 xl:h-full xl:bg-white xl:dark:bg-zinc-900 xl:rounded-tr-lg xl:rounded-br-lg xl:p-3"
      >
        <div v-if="!isMoblieTerminal" class="flex justify-between mb-2">
          <m-svg-icon
            name="share"
            class="w-4 h-4 p-1 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800 duration-300 rounded"
          ></m-svg-icon>
          <m-button
            type="info"
            icon="heart"
            iconClass="fill-zinc-900 dark:fill-zinc-200"
          ></m-button>
        </div>
        <p
          class="text-base text-zinc-900 dark:text-zinc-200 ml-1 font-blod xl:text-xl xl:mb-5"
        >
          {{ pexcelData.title }}
        </p>
        <div class="flex items-center mt-1 px-1">
          <img
            :src="pexcelData.avatar"
            alt=""
            class="w-3 h-3 rounded-full"
            v-lazy
          />
          <span class="text-base text-zinc-900 dark:text-zinc-200 ml-1">{{
            pexcelData.author
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { isMoblieTerminal } from '@/utils/flexible'
import { ref } from 'vue'
import { getPexelsFromId } from '@/api/pexcel.js'
import { useRouter } from 'vue-router'
const pexcelData = ref({})
const router = useRouter()
const getPexcelData = async (id) => {
  const res = await getPexelsFromId(id)
  pexcelData.value = res
}
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
getPexcelData(props.id)
const onPop = () => {
  store.commit('app/changeRouterType','back')
  router.back()
}
</script>
<style lang="scss" scoped></style>
