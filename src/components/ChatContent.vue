<script setup lang="ts">

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { ChevronLeft, MoreVertical, SearchIcon, PlusCircle, SendHorizonal, SmileIcon } from 'lucide-vue-next'
import MoreDropdown from '@/components/MoreDropdown.vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { inject, ref } from 'vue'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import MessageCard from '@/components/MessageCard.vue'

const mobile = ref(inject('mobile'))

const menuOpened = ref(inject('menuOpened'))

</script>

<template>
  <div :class="mobile && !menuOpened || !mobile && menuOpened  ? 'ChatContent' : 'hidden'">
    <header class="Header">
      <div class="ContactInfo flex flex-row gap-3 items-center">
        <Button v-if="mobile" variant="ghost" class="size-10 p-0" @click="menuOpened = !menuOpened">
          <ChevronLeft v-if="!menuOpened" class="size-1/2 hover:scale-110 transition"/>
        </Button>
        <Avatar class="size-8">
          <AvatarImage src=" " />
          <AvatarFallback>UN</AvatarFallback>
        </Avatar>
        <div class="ContactData flex flex-col gap-0.5">
          <Label class="font-bold">User Name</Label>
          <Label class="text-neutral-500">hour ago</Label>
        </div>
      </div>
      <div class="ContactSettings">
        <Button variant="ghost" class="MoreButton">
          <SearchIcon class="size-1/2"/>
        </Button>
        <more-dropdown>
          <Button variant="ghost" class="MoreButton">
            <MoreVertical class="size-1/2"/>
          </Button>
        </more-dropdown>
      </div>
    </header>
    <ScrollArea class="Messages">
      <div class="h-14"/>
      <MessageCard :name="'name'" avatar-src="" image-src="" :message-text="''" message-time="10:00"/>
    </ScrollArea>
    <div class="TextInput">
      <Button variant="ghost" class="IconButton">
        <PlusCircle class="size-4/6"/>
      </Button>
      <input type="text" placeholder="Type your message..." class="InputField"/>
      <Button variant="ghost" class="IconButton ">
        <SmileIcon class="size-4/6"/>
      </Button>
      <Button variant="ghost" class="IconButton">
        <SendHorizonal class="size-4/6"/>
      </Button>
    </div>
  </div>
</template>

<style scoped>
@media screen and (min-width: 576px) {
  /*DESKTOP*/
  .Header {
    @apply -mb-14 w-full h-14 bg-accent/60 backdrop-blur-md rounded-md flex flex-row items-center justify-between py-2 px-3 z-50
  }
  .IconButton {
    @apply h-10 w-10 p-0 flex flex-row items-center justify-center
  }
}

@media screen and (max-width: 576px) {
  /*MOBILE*/
  .Header {
    @apply -mb-14 w-full h-16 bg-accent/60 backdrop-blur-md rounded-md flex flex-row items-center justify-between py-2 px-3 z-50
  }
  .IconButton {
    @apply h-10 w-16 p-0 flex flex-col items-center justify-center
  }
}
.Messages {
  @apply h-full w-full
}
.ChatContent {
  @apply h-[95vh] w-full m-4 overflow-y-auto flex flex-col
}
.MoreButton {
  @apply size-10 p-0 hover:scale-110 transition
}
.TextInput {
  @apply p-1 w-full h-12 bg-background rounded-md border-[1px] border-accent flex flex-row items-center justify-evenly px-2 gap-3
}
.InputField {
  @apply w-full h-full bg-transparent
  placeholder:text-sm placeholder:text-primary/50 placeholder:font-light
  outline-none
}
</style>