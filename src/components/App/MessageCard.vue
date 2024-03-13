<script setup lang="js">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { onMounted, ref } from 'vue'

defineProps({
  name: String,
  avatarSrc: String,
  imageSrc: String,
  messageText: String,
  messageTime: String
})

const nameFallback = ref('UN')

onMounted(() => {})
</script>

<template>
  <div v-if="messageText" id="Main" class="Main">

    <Avatar class="size-8">
      <AvatarImage :src="avatarSrc" />
      <AvatarFallback>{{ nameFallback }}</AvatarFallback>
    </Avatar>
    <div class="Message">
      <img :src="imageSrc" :class="imageSrc !== '' ? 'MessageImage' : 'hidden'" alt="" />
      <p class="text-primary/90 text-sm font-light break-all">{{ messageText }}</p>
      <div class="MessageTime">
        <div class="w-full"></div>
        {{ messageTime }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.Main {
  @apply flex flex-row gap-2 mx-2 my-4;
}
.Message {
  @apply h-min px-2 min-w-24 rounded-sm max-w-64;
}
.MessageImage {
  @apply min-w-24 min-h-24 max-w-48 max-h-48 rounded-md p-[1px] mb-3;
}
.MessageTime {
  @apply text-[12px] text-primary/60 font-light flex flex-row items-center select-none;
}
</style>
