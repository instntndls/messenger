<script setup lang="js">

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { ChevronLeft, MoreVertical, SearchIcon, PlusCircle, SendHorizonal, SmileIcon } from 'lucide-vue-next'
import MoreDropdown from '@/components/MoreDropdown.vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { inject, nextTick, onMounted, ref } from 'vue'
import { ScrollArea } from '@/components/ui/scroll-area'
import MessageCard from '@/components/MessageCard.vue'
import { useScroll } from '@vueuse/core'


import EmojiPicker from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'

const mobile = ref(inject('mobile'))

const menuOpened = ref(inject('menuOpened'))
const pickerOpen = ref(false)

const inputValue = ref('')

const onSelectEmoji = (emoji) => {
  inputValue.value += emoji.i
}

const scrollToBottom = () => {
  nextTick(() => {
    const scrollArea = document.getElementById('ScrollArea')
    scrollArea.scrollTop = scrollArea.scrollHeight
  })
}

onMounted(() => {
  scrollToBottom()
})
</script>

<template>
  <div :class="mobile && !menuOpened || !mobile && menuOpened  ? 'ChatContent' : 'hidden'">
    <header class="Header">
      <div class="ContactInfo flex flex-row gap-3 items-center">
        <Button v-if="mobile" variant="ghost" class="size-10 p-0" @click="menuOpened = !menuOpened">
          <ChevronLeft v-if="!menuOpened" class="size-1/2 hover:scale-110 transition"/>
        </Button>
        <Avatar class="size-8 cursor-pointer">
          <AvatarImage src=" " />
          <AvatarFallback>UN</AvatarFallback>
        </Avatar>
        <div class="ContactData flex flex-col gap-0.5">
          <Label class="font-bold cursor-pointer">User Name</Label>
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
    <div id="ScrollArea" class="Messages">
      <div class="h-14"/>
      <MessageCard v-for="i in 10" :key="i" :name="'name'" avatar-src="" image-src="https://parpol.ru/wp-content/uploads/2019/09/placeholder.png" :message-text="i.toString()" message-time="10:00"/>
    </div>
    <div class="TextInput">
      <Button variant="ghost" class="IconButton">
        <PlusCircle class="size-4/6"/>
      </Button>
      <input type="text" placeholder="Type your message..." class="InputField" v-model="inputValue"/>
      <Button variant="ghost" class="IconButton" @click="pickerOpen = !pickerOpen">
        <SmileIcon class="size-4/6"/>
      </Button>
      <transition-group>
        <div v-if="pickerOpen" class="bg-black/10 backdrop-blur-sm absolute right-0 bottom-0 w-full h-full" @click="pickerOpen = false"/>
        <EmojiPicker
          class="absolute right-10 bottom-20"
          v-if="pickerOpen"
          :native="true"
          :theme="'auto'"
          :disable-skin-tones="true"
          @select="onSelectEmoji">
        </EmojiPicker>
      </transition-group>
      <Button variant="ghost" class="IconButton" @click="scrollToBottom">
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
  @apply h-full w-full overflow-y-auto
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
  outline-none z-50
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>