<template>
  <div>
    <div
      v-for="(item, index) in hintData"
      :key="index"
      class="py-1 pl-1 text-base font-bold text-zinc-500 rounded cursor-pointer duration-300 hover:bg-zinc-200 dark:hover:bg-zinc-900"
      @click="onItemClick(item)"
      v-html="highlightText(item)"
    ></div>
  </div>
</template>
<script>
const EMIT_ITEM_CLICK = 'itemClick'
</script>
<script setup>
import { ref, watch } from 'vue'
import { getHint } from '@/api/pexcel'
import { watchDebounced } from '@vueuse/core'
const props = defineProps({
  searchText: {
    type: String,
    required: true
  }
})
const emits = defineEmits([EMIT_ITEM_CLICK])
const hintData = ref([])
const getHintData = async () => {
  if (!props.searchText) return
  console.log(props.searchText)
  const { result } = await getHint(props.searchText)
  hintData.value = result
}
watchDebounced(() => props.searchText, getHintData, {
  immediate: true,
  debounce: 500
})
const onItemClick = (item) => {
  emits(EMIT_ITEM_CLICK, item)
}
const highlightText = (text) => {
  const hightlightStr = `<span class="text-red-400 dark:text-red-200">${props.searchText}</span>`
  const reg = new RegExp(props.searchText, 'gi')
  return text.replace(reg, hightlightStr)
}
</script>
<style lang="scss" scoped></style>
