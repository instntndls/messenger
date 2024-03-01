<script setup lang="ts">

import Backdrop from '@/components/Backdrop.vue'
import LoginCard from '@/components/LoginCard.vue'
import { onMounted, ref } from 'vue'

const smoothIn = ref(false)

onMounted(() => {
  setTimeout(() => {
    smoothIn.value = true
  }, 10)
})
</script>

<template>
  <Backdrop/>
  <transition>
    <div v-if="smoothIn" class="absolute top-0 left-0 w-screen h-screen flex z-[2]">
      <div class="flex w-full h-full justify-center items-center">
        <div class="text-white text-5xl font-bold  flex flex-col gap-6 pb-48 px-12">
          <p>
            Vue3 X shadcn-vue <br> messenger
          </p>
          <span class="text-white text-opacity-70 text-3xl font-normal break-words">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </span>
        </div>
      </div>
      <div class="bg-white w-full h-full bg-opacity-10 flex justify-center items-center">
        <LoginCard class="w-96"/>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.8s ;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>