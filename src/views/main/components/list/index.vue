<template>
  <div>
    <m-infinite
      v-model="loading"
      :isFinished="isFinished"
      @onload="getPexlesListData"
      ><m-waterfall
        class="px-1 w-full"
        :data="pexcelList"
        nodeKey="id"
        :colunm="isMoblieTerminal ? 2 : 5"
        :picturePreReading="true"
      >
        <template v-slot="{ item, width }">
          <item-vue :data="item" :width="width" @click="onToPins"></item-vue>
        </template> </m-waterfall
    ></m-infinite>
    <!-- 详情item -->
    <transition
      :css="false"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <pins-vue v-if="isVisablePins" :id="currentPins.id"></pins-vue>
    </transition>
  </div>
</template>
<script setup>
import { getPexlesList } from '@/api/pexcel.js'
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import itemVue from './item.vue'
import { isMoblieTerminal } from '@/utils/flexible'
import pinsVue from '@/views/main/pins/components/pins.vue'
import { useEventListener } from '@vueuse/core'
import gsap from 'gsap'
const loading = ref(false)
const isFinished = ref(false)
let query = {
  page: 1,
  size: 20
}
const store = useStore()
const pexcelList = ref([])
const getPexlesListData = async () => {
  if (isFinished.value) return
  if (pexcelList.value.length) {
    query.page += 1
  }
  const res = await getPexlesList(query)
  if (query.page === 1) {
    pexcelList.value = res.list
  } else {
    pexcelList.value.push(...res.list)
  }
  if (pexcelList.value.length === res.total) {
    isFinished.value = true
  }
  loading.value = false
}
const resetQuery = (newQuery) => {
  query = { ...query, ...newQuery }
  isFinished.value = false
  pexcelList.value = []
}
watch(
  () => store.getters.currentCategory,
  (currentCategory) => {
    resetQuery({
      page: 1,
      categoryId: currentCategory.id
    })
  }
)
watch(
  () => store.getters.searchText,
  (val) => {
    resetQuery({
      page: 1,
      searchText: val
    })
  }
)
const isVisablePins = ref(false)
const currentPins = ref({})
useEventListener(window, 'popstate', () => {
  isVisablePins.value = false
})
const onToPins = (item) => {
  console.log('item', item)
  // 修改浏览器的url
  history.pushState(null, null, `/pins/${item.id}`)
  isVisablePins.value = true
  currentPins.value = item
}
const beforeEnter = (el) => {
  gsap.set(el, {
    scaleX: 0,
    scaleY: 0,
    transformOrigin: '0 0',
    translateX: currentPins.value.location?.translateX,
    translateY: currentPins.value.location?.translateY,
    opacity: 0
  })
}
const enter = (el, done) => {
  gsap.to(el, {
    scaleX: 1,
    scaleY: 1,
    opacity: 1,
    duration: 0.5,
    translateX: 0,
    translateY: 0,
    onComplete: done
  })
}
const leave = (el, done) => {
  gsap.to(el, {
    scaleX: 0,
    scaleY: 0,
    opacity: 0,
    duration: 0.3,
    translateX: currentPins.value.location?.translateX,
    translateY: currentPins.value.location?.translateY,
    onComplete: done
  })
}
</script>
<style lang="scss" scoped></style>
