<script setup>
import { ref } from 'vue'
</script>

<template>
  <div class="h-screen w-screen fixed top-0 left-0">
    <!-- <router-view></router-view> -->
    <m-transition-router-view
      :routerType="$store.getters.routerType"
      mainComponentName="home"
    >
    </m-transition-router-view>
  </div>
</template>

<style scoped></style>
