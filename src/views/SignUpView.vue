<script setup lang="ts">

import CreateAccount from '@/components/CreateAccount.vue'
import { onMounted, ref } from 'vue'
import Backdrop from '@/components/Backdrop.vue'

const smoothIn = ref(false)

onMounted(() => {
  setTimeout(() => {
    smoothIn.value = true
  })
})
</script>

<template>

  <Backdrop/>
  <transition>
    <div v-if="smoothIn" class="Main">
      <CreateAccount/>
    </div>
  </transition>
</template>

<style scoped>
.Main {
  @apply absolute top-0 left-0 z-10 w-screen h-screen flex flex-col items-center justify-center gap-6
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.8s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>