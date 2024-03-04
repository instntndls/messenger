<script setup lang="ts">

import { Avatar } from '@/components/ui/avatar'
import { ref } from 'vue'

defineProps({
  name: String,
  avatarSrc: String,
  imageSrc: String,
  messageText: String,
  messageTime: String
})

const nameFallback = ref('UN')



</script>

<template>
  <div v-if="messageText" class="Main">
    <Avatar class="size-8">
      <AvatarImage :src="avatarSrc" />
      <AvatarFallback>{{ nameFallback }}</AvatarFallback>
    </Avatar>
    <div class="Message">
      <img :src="imageSrc" :class="imageSrc!==''  ? 'MessageImage' : 'hidden'" alt="">
      <p class="text-primary/90 text-sm px-1 font-light">{{ messageText }}</p>
      <div class="MessageTime">
        <div class="w-full"></div>
        {{ messageTime }}
      </div>
    </div>
  </div>

</template>

<style scoped>
.Main {
  @apply flex flex-row gap-2 mx-2 my-4
}
.Message {
  @apply h-min px-2 min-w-24 rounded-sm max-w-64
}
.MessageImage {
  @apply min-w-24 min-h-24 max-w-48 max-h-48 border-[1px] border-primary/50 rounded-md p-[1px] mb-1
}
.MessageTime {
  @apply text-[12px] text-primary/60 font-light flex flex-row items-center
}
</style>