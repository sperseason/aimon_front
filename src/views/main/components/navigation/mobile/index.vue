<template>
  <div class="bg-white dark:bg-zinc-900 sticky top-0 left-0 z-10 duration-500">
    <ul
      ref="ulTarget"
      class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden"
    >
      <!-- 滑块 -->
      <li
        ref="sliderTarget"
        :style="sliderStyle"
        class="absolute h-[22px] bg-zinc-900 dark:bg-zinc-800 rounded-lg duration-200"
      ></li>
      <!-- 汉堡按钮 -->
      <li
        class="fixed top-0 right-[-1px] h-4 px-1 flex items-center bg-white z-20 shadow-l-white dark:bg-zinc-900 dark:shadow-l-zinc"
        @click="onShowPopup"
      >
        <m-svg-icon name="hamburger" class="w-1.5 h-1.5"></m-svg-icon>
      </li>
      <li
        v-for="(item, index) in $store.getters.categorys"
        :key="item.id"
        class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4"
        :ref="setItemRef"
        @click="onClikItem(item)"
        :class="{
          'text-zinc-100': $store.getters.currentCategoryIndex === index
        }"
      >
        {{ item.name }}
      </li>
    </ul>
    <m-popup v-model="isVisable">
      <MenuVue @onItemClick="onClikItem"></MenuVue>
    </m-popup>
  </div>
</template>
<script setup>
import { ref, onBeforeMount, watch } from 'vue'
import { useStore } from 'vuex'
import { useScroll } from '@vueuse/core'
import MenuVue from '@/views/main/components/menu/index.vue'
const store = useStore()
const sliderStyle = ref({
  transform: 'translateX(0px)',
  width: '52px '
})
let itemRefs = []
const setItemRef = (el) => {
  if (el) {
    itemRefs.push(el)
  }
}
// 数据改变后，dOm 更新后
onBeforeMount(() => {
  itemRefs = []
})
const ulTarget = ref(null)
const { x: useScrollLeft } = useScroll(ulTarget)
watch(
  () => store.getters.currentCategoryIndex,
  (val) => {
    const { left, width } = itemRefs[val].getBoundingClientRect()
    sliderStyle.value = {
      transform: 'translateX(' + (left + useScrollLeft.value - 10) + 'px)',
      width: width + 'px'
    }
  }
)
const onClikItem = (item) => {
  store.commit('app/changeCurrentCategory', item)
  isVisable.value = false
}
const isVisable = ref(false)
const onShowPopup = () => {
  isVisable.value = true
}
</script>

<style lang="scss" scoped></style>
