<script setup lang="js">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { onMounted, ref } from 'vue'
import { Card } from '@/components/ui/card'
import { AppConfig } from '@/config'

const props = defineProps({
  name: String,
  avatarSrc: String,
  imageSrc: String,
  messageText: String,
  messageTime: String,
  status: String,
  authorId: Number
})

const isMyMessage = ref()

const formatDateTime = (date) => {
  const dateObj = new Date(date)
  const hours = dateObj.getHours().toString().padStart(2, '0')
  const minutes = dateObj.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
}

const nameFallback = props.name?.charAt(0)

onMounted(() => {
  isMyMessage.value = props.authorId === JSON.parse(localStorage.getItem('user')).id
})
</script>

<template>
  <div v-if="status !== 'NOTIFICATION'" class="w-full flex">
    <div v-if="isMyMessage" class="Pusher"/>
    <div id="Main" class="Main" :class="isMyMessage ? 'flex-row-reverse xl:flex-row' : 'flex-row'">
      <Avatar class="size-8">
        <AvatarImage :src="AppConfig.fileAPI + '/images/' + avatarSrc" class="blur-[0.5px]"/>
        <AvatarFallback>{{ nameFallback }}</AvatarFallback>
      </Avatar>
      <div class="Message">
        <img :src="imageSrc" :class="imageSrc !== '' ? 'MessageImage' : 'hidden'" alt="" />
        <p class="text-primary text-sm break-words">{{ messageText }}</p>
        <div class="MessageTime">
          <span class="w-full"></span>
          {{ formatDateTime(messageTime) }}
        </div>
      </div>
    </div>
  </div>

  <Card v-else class="mx-auto w-fit p-2 my-4 bg-foreground/90">
    <div v-if="JSON.parse(messageText).type === 1" class="Notification"> Chat created </div>
    <div v-else class="Notification">
      <span class="font-bold">
        {{ JSON.parse(messageText).user.first_name + ' ' + JSON.parse(messageText).user.last_name }}
      </span>
      joined the chat
    </div>
  </Card>
</template>

<style scoped>
.Main {
  @apply flex gap-2 mx-2 my-4;
}
.Message {
  @apply h-min px-2 py-1 min-w-24 rounded-sm max-w-64 bg-accent;
}
.Pusher {
  @apply w-full xl:w-0
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
.Name {
  @apply font-bold text-accent-foreground text-sm;
}
</style>
