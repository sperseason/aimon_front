<template>
  <div
    class="bg-white dark:bg-zinc-800 sticky top-0 left-0 w-full z-10 duration-500"
  >
    <ul
      class="w-[800px] relative flex flex-wrap justify-center overflow-x-auto px-[10px] py-1 text-xs text-zinc-600 duration-300 overflow-hidden mx-auto"
      :class="[isOpenCategory ? 'h-[206px]' : 'h-[56px]']"
    >
      <div
        class="absolute right-1 bottom-1 z-20 p-1 rounded cursor-pointer duration-200 hover:bg-zinc-200 dark:hover:bg-zinc-900"
        @click="triggerState"
      >
        <m-svg-icon
          :name="isOpenCategory ? 'fold' : 'unfold'"
          class="w-1 h-1"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></m-svg-icon>
      </div>
      <div
        v-for="(item, index) in $store.getters.categorys"
        :key="item.id"
        class="shrink-0 px-1.5 py-0 z-10 duration-200 text-zinc-900 text-base font-blod h-4 leading-4 cursor-pointer hover:bg-zinc-200 rounded mr-1 mb-1 dark:text-zinc-500 dark:hover:text-zinc-300 dark:hover:bg-zinc-900"
        :class="{
          'text-zinc-900 bg-zinc-200 dark:text-zinc-300 dark:bg-zinc-900':
            $store.getters.currentCategoryIndex === index
        }"
        @click="onItemClick(item)"
      >
        {{ item.name }}
      </div>
    </ul>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
const isOpenCategory = ref(false)
const store = useStore()
const triggerState = () => {
  isOpenCategory.value = !isOpenCategory.value
}
const currentCategoryIndex = ref(0)
const onItemClick = (item) => {
  store.commit('app/changeCurrentCategory', item)
}
</script>
<style lang="scss" scoped></style>
