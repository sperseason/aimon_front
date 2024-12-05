<template>
  <div class="relative leading-none">
    <!-- 单行 -->
    <input
      type="text"
      v-if="type === TYPE_TEXT"
      v-model="text"
      :maxlength="max"
      class="border-gray-200 dark:border-zinc-600 dark:bg-zinc-800 duration-100 dark:text-zinc-400 border outline-0 py-0.5 px-1 text-sm rounded-sm focus:border-blue-400 w-full"
    />
    <!-- 多行 -->
    <textarea
      v-if="type === TYPE_TEXTAREA"
      v-model="text"
      class="border-gray-200 dark:border-zinc-600 dark:bg-zinc-800 duration-100 dark:text-zinc-400 border outline-0 py-0.5 px-1 text-sm rounded-sm focus:border-blue-400 w-full"
      rows="5"
      :maxlength="max"
    ></textarea>
    <span
      v-if="max"
      class="absolute right-1 bottom-0.5 text-zinc-400 text-xs"
      :class="{ 'text-red-700': currentNumber === parseInt(max) }"
    >
      {{ currentNumber }} /{{ max }}
    </span>
  </div>
</template>
<script>
const TYPE_TEXT = 'text'
const TYPE_TEXTAREA = 'textarea'
</script>
<script setup>
import { useVModel } from '@vueuse/core'
import { computed } from 'vue'
const props = defineProps({
  modelValue: {
    type: String,
    reuqired: true
  },
  type: {
    type: String,
    default: TYPE_TEXT,
    validator(value) {
      const validTypes = [TYPE_TEXT, TYPE_TEXTAREA]
      const res = validTypes.includes(value)
      if (!res) {
        throw new Error(`type must be one of ${validTypes.join(',')}`)
      }
      return res
    }
  },
  max: {
    type: [Number, String]
  }
})
defineEmits(['update:modelValue'])
const text = useVModel(props)
const currentNumber = computed(() => {
  return text.value.length
})
</script>
<style lang="scss" scoped></style>
