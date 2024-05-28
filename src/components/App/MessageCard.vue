<script setup lang="js">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { onMounted, ref } from 'vue'
import { Card } from '@/components/ui/card'

defineProps({
  name: String,
  avatarSrc: String,
  imageSrc: String,
  messageText: String,
  messageTime: String,
  status: String
})

const formatDateTime = (date) => {
  const dateObj = new Date(date)
  const hours = dateObj.getHours().toString().padStart(2, '0')
  const minutes = dateObj.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
}

const nameFallback = ref('UN')

onMounted(() => {})
</script>

<template>
  <div v-if="status !== 'NOTIFICATION'" id="Main" class="Main">

    <Avatar class="size-8">
      <AvatarImage :src="avatarSrc" />
      <AvatarFallback>{{ nameFallback }}</AvatarFallback>
    </Avatar>
    <div class="Message">
      <img :src="imageSrc" :class="imageSrc !== '' ? 'MessageImage' : 'hidden'" alt="" />
      <p class="text-primary/90 text-sm font-light break-all">{{ messageText }}</p>
      <div class="MessageTime">
        <div class="w-full"></div>
        {{ formatDateTime(messageTime) }}
      </div>
    </div>
  </div>
  <Card v-else class="mx-auto w-fit p-2 my-4 bg-foreground/90">
    <p v-if="JSON.parse(messageText).type === 1" class="Notification"> Chat created </p>
    <p v-else class="Notification">{{ JSON.parse(messageText).user.first_name + ' ' + JSON.parse(messageText).user.last_name + ' joined the chat' }}</p>
  </Card>
</template>

<style scoped>
.Main {
  @apply flex flex-row gap-2 mx-2 my-4;
}
.Message {
  @apply h-min px-2 py-1 min-w-24 rounded-sm max-w-64 bg-accent/50;
}
.MessageImage {
  @apply min-w-24 min-h-24 max-w-48 max-h-48 rounded-md p-[1px] mb-3;
}
.MessageTime {
  @apply text-[12px] text-primary/60 font-light flex flex-row items-center select-none;
}
.Notification {
  @apply text-background font-medium text-sm break-all;
}
</style>
