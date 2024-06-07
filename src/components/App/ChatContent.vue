<script setup lang="js">
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  PlusCircle,
  SendHorizonal,
  SmileIcon
} from 'lucide-vue-next'
import { inject, nextTick, onMounted, ref, watch } from 'vue'
import MessageCard from '@/components/App/MessageCard.vue'

import EmojiPicker from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'
import ChatHeader from '@/components/App/ChatHeader.vue'
import { initSocket, onMessageCreated, notifyMessageCreated } from '@/websocket'
import { createMessage, getAllChatMessages, getMessage } from '@/api'
import LoadingScreen from '@/components/App/LoadingScreen.vue'

const selectedChatId = inject('selectedChatId')

const messages = inject('messages')

const mobile = ref(inject('mobile'))

const loading = ref()

const menuOpened = ref(inject('menuOpened'))
const pickerOpen = ref(false)

const inputValue = ref('')

const onSelectEmoji = (emoji) => {
  inputValue.value += emoji.i
}

const scrollToBottom = () => {
  nextTick(() => {
    var scrollArea = document.getElementById('ScrollArea')
    if (scrollArea) scrollArea.scrollTop = scrollArea?.scrollHeight
  })
}

const sendMessage = async () => {
  if (inputValue.value) {
    const response = await createMessage(inputValue.value, selectedChatId.value)
    notifyMessageCreated(JSON.parse(localStorage.getItem('user')).id, selectedChatId.value, response.id)
    messages.value = await getAllChatMessages(selectedChatId.value)
    inputValue.value = ''
    scrollToBottom()
    
  }
}

const startSocket = () => {
  initSocket(localStorage.getItem('token'), JSON.parse(localStorage.getItem('user')).id)

  onMessageCreated((data) => {
    getMessage(data.message_id).then((response) => {
      messages.value.push(response)
      scrollToBottom()
    })
  })
}

onMounted(async () => {

  loading.value = true

  scrollToBottom()

  startSocket()

})

watch(messages, () => {
  if (messages.value) {
    loading.value = false
  }
  else {
    loading.value = true
  }
  scrollToBottom()
})

watch(selectedChatId, () => {
  startSocket()
})

</script>

<template>
  <div :class="(mobile && !menuOpened) || (!mobile && menuOpened) ? 'ChatContent' : 'hidden'">
    <ChatHeader/>
    <LoadingScreen v-if="loading"/>
    <div v-else id="ScrollArea" class="Messages">
      <div class="h-14"/>
      <MessageCard
        v-for="message in messages"
        :author-id="message.author_id"
        :key="message.id"
        :name="message.author_first_name"
        :avatar-src="message.author_avatar"
        image-src=""
        :message-text="message.text"
        :message-time="message.created_at"
        :status="message.status"
        v-auto-animate
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
        @keydown.enter="sendMessage"
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
      <Button variant="ghost" class="IconButton" @click="sendMessage">
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
  @apply h-[95dvh] w-full m-3 overflow-y-auto flex flex-col items-center justify-center;
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
