<template>
  <div class="h-screen">
    <header-vue class="h-header"></header-vue>
    <div class="h-main"><main-vue></main-vue></div>
    <floating></floating>
  </div>
</template>
<script setup>
import HeaderVue from './components/Header/index.vue'
import mainVue from './components/main.vue'
import floating from './components/floating.vue'
</script>
<style lang="scss" scoped></style>
