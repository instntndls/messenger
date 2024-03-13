<script setup lang="js">
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  PlusCircle,
  SendHorizonal,
  SmileIcon
} from 'lucide-vue-next'
import { inject, nextTick, onMounted, ref } from 'vue'
import MessageCard from '@/components/App/MessageCard.vue'

import EmojiPicker from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'
import ChatHeader from '@/components/App/ChatHeader.vue'

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
  <div :class="(mobile && !menuOpened) || (!mobile && menuOpened) ? 'ChatContent' : 'hidden'">
    <ChatHeader/>
    <div id="ScrollArea" class="Messages">
      <div class="h-14" />
      <MessageCard
        v-for="i in 10"
        :key="i"
        :name="'name'"
        avatar-src=""
        image-src="https://parpol.ru/wp-content/uploads/2019/09/placeholder.png"
        :message-text="i.toString()"
        message-time="10:00"
      />
    </div>
    <div class="TextInput z-50">
      <Button variant="ghost" class="IconButton">
        <PlusCircle class="size-4/6" />
      </Button>
      <input
        type="text"
        placeholder="Type your message..."
        class="InputField"
        v-model="inputValue"
      />
      <Button variant="ghost" class="IconButton" @click="pickerOpen = !pickerOpen">
        <SmileIcon class="size-4/6" />
      </Button>
      <transition-group>
        <div
          v-if="pickerOpen"
          class="absolute right-0 bottom-0 w-full h-full"
          @click="pickerOpen = false"
        />
        <EmojiPicker
          class="absolute right-10 bottom-20"
          v-if="pickerOpen"
          :native="true"
          :theme="'auto'"
          :disable-skin-tones="true"
          @select="onSelectEmoji"
        >
        </EmojiPicker>
      </transition-group>
      <Button variant="ghost" class="IconButton" @click="scrollToBottom">
        <SendHorizonal class="size-4/6" />
      </Button>
    </div>
  </div>
</template>

<style scoped>
@media screen and (min-width: 576px) {
  /*DESKTOP*/
  .IconButton {
    @apply h-10 w-10 p-0 flex flex-row items-center justify-center z-50;
  }
}
@media screen and (max-width: 576px) {
  /*MOBILE*/
  .IconButton {
    @apply h-10 w-16 p-0 flex flex-col items-center justify-center z-50;
  }
}

.Messages {
  @apply h-full w-[99%] overflow-y-auto;
}
.ChatContent {
  @apply h-[95vh] w-full m-4 overflow-y-auto flex flex-col items-center justify-center;
}
.TextInput {
  @apply p-1 w-full h-12 bg-background/50 rounded-md border-[1px] border-accent flex flex-row items-center justify-evenly px-2 gap-3;
}
.InputField {
  @apply w-full h-full bg-transparent
  placeholder:text-sm placeholder:text-primary/50 placeholder:font-light
  outline-none;
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
