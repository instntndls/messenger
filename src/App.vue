<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useDark } from '@vueuse/core'
import { onMounted } from 'vue'

const isDark = useDark()

onMounted( () => {
  isDark.value = true
})
</script>

<template>
  <RouterView />
</template>

<style scoped>
</style>
