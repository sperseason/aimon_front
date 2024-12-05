<template>
  <div class="py-2 h-[80vh] flex flex-col">
    <h2 class="text-xl text-zinc-900 dark:text-zinc-200 font-blod mb-2 px-1">
      所有分类
    </h2>
    <ul class="overflow-y-auto">
      <li
        v-for="(item, index) in $store.getters.categorys"
        :key="item.id"
        class="text-lg text-zinc-900 dark:text-zinc-300 py-1.5 duration-100 active:bg-zinc-100 px-1 dark:active:bg-zinc-900"
        @click="$emit('onItemClick', item)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>
<script setup>
defineEmits(['onItemClick'])
</script>
<style lang="scss" scoped></style>
