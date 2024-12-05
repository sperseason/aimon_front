<template>
  <moblieNavigation v-if="isMoblieTerminal"></moblieNavigation>
  <pcNavigation v-else></pcNavigation>
</template>
<script setup>
import { isMoblieTerminal } from '@/utils/flexible'
import moblieNavigation from './mobile/index.vue'
import pcNavigation from './pc/index.vue'
import { useStore } from 'vuex'
import { ref } from 'vue'
const store = useStore()
store.dispatch('category/useCategoryData')
</script>
<style lang="scss" scoped></style>
