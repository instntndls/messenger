<script setup>
import { Button } from '@/components/ui/button'
import { onMounted, ref, provide } from 'vue'
import router from '@/router'
import { SettingsIcon, LogOutIcon } from 'lucide-vue-next'
import { Card } from '@/components/ui/card'
import SettingsDialog from '@/components/App/SettingsDialog.vue'
import LogoutAlert from '@/components/App/LogoutAlert.vue'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ChatContent from '@/components/App/ChatContent.vue'
import { getUserData, getAllChats, getAllChatMessages, getMessage } from '@/api'
import {
  initSocket,
  closeSocket,
  onMessageCreated,
  onMessageUpdated,
  onMessageDeleted,
  onUserWriting,
  onUserWrote,
  notifyMessageCreated,
  notifyMessageChanged,
  notifyMessageDeleted,
  notifyUserWriting,
  notifyUserWrote
} from '@/websocket'
import { watch } from 'vue'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const menuOpened = ref(true)

const mobile = ref(window.innerWidth < 576)

const chats = ref()
const messages = ref()
const selectedChatId = ref()
const selectedChatName = ref('')

const currentUser = ref()
const seeCurrentUser = async () => {
  await getUserData()
    .then((response) => {
      currentUser.value = response
    })
    .catch((error) => {
      console.log(error)
    })
}

const checkAuth = async () => {
  await seeCurrentUser()
  if (currentUser.value) {
    await router.push('/app')
  } else {
    await router.push('/')
  }
}

const logout = async () => {
  localStorage.removeItem('token')
  localStorage.removeItem('refresh_token')
  await router.push('/')
  closeSocket()
}

const getChats = async () => {
  await getAllChats()
    .then((response) => {
      console.log(response)
      chats.value = response
    })
    .catch((error) => {
      console.log(error)
    })
}

onMounted(async () => {
  window.addEventListener('resize', () => {
    menuOpened.value = window.innerWidth >= 576
    mobile.value = window.innerWidth < 576
  })
  await checkAuth()
  await getChats()
  messages.value = await getAllChatMessages(selectedChatId.value)

})

watch(selectedChatId, async () => {
  messages.value = await getAllChatMessages(selectedChatId.value)
})

provide('mobile', mobile)
provide('menuOpened', menuOpened)
provide('messages', messages)
provide('selectedChatId', selectedChatId)
provide('selectedChatName', selectedChatName)
</script>

<template>
  <div v-if="currentUser" class="w-full h-full flex">
    <div class="Main">
      <transition name="slide">
        <div v-if="menuOpened" class="Sidebar">
          <p class="text-2xl font-bold">Chats</p>
          <Tabs default-value="all" class="w-full h-full">
            <TabsList class="w-full gap-1">
              <TabsTrigger value="all" class="w-full"> All </TabsTrigger>
              <TabsTrigger value="unread" class="w-full"> Unread </TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <div class="MessageList">
                <Button :variant=" selectedChatId === chat.id ? 'secondary' : 'outline' " v-for="chat in chats" :key="chat.id"
                  class="w-full h-16 rounded-md my-4 p-4 flex gap-4 justify-start items-center cursor-pointer"
                  @click="mobile ? (menuOpened = !menuOpened) : null; selectedChatId = chat.id; messages = null;
                  selectedChatName = chat.name ? chat.name : chat.second_user_first_name + ' ' + chat.second_user_last_name"
                >
                  <Avatar>
                    <AvatarFallback class="font-bold">
                      <span v-if="chat.name">{{ chat.name.charAt(0) }}</span>
                      <span v-else>{{ chat.second_user_first_name.charAt(0) }}</span>
                    </AvatarFallback>
                  </Avatar>

                  <div class="h-full truncate text-ellipsis">
                    <span v-if="chat.name">{{ chat.name }}</span>
                    <span v-else>{{ chat.second_user_first_name + ' ' + chat.second_user_last_name }}</span>
                  </div>

                </Button>
              </div>
            </TabsContent>
            <TabsContent value="unread" class="flex flex-col items-center">
              <p class="py-8 font-bold opacity-80">No unread messages</p>
            </TabsContent>
          </Tabs>
          <div class="Pusher h-full min-h-0" />
          <div class="BottomMenu">
            <logout-alert @logout="logout">
              <Button variant="destructive" class="LogoutButton">
                <LogOutIcon class="size-4 mr-2" />
                Logout
              </Button>
            </logout-alert>
            <settings-dialog>
              <Button variant="outline" class="SettingsButton">
                <SettingsIcon class="size-4 mr-2" />
                Settings
              </Button>
            </settings-dialog>
          </div>
        </div>
      </transition>
      <ChatContent v-if="selectedChatId"/>
    </div>
  </div>
</template>

<style scoped>
@media screen and (min-width: 576px) {
  /*DESKTOP*/
  .Sidebar {
    @apply relative py-6 gap-4 h-dvh flex flex-col w-full
    items-start justify-start bg-background
    bg-opacity-[0.1] border-r border-foreground/10 rounded-sm min-w-64 max-w-96
    px-6;
  }
}

@media screen and (max-width: 576px) {
  /*MOBILE*/
  .Sidebar {
    @apply absolute top-0 left-0 gap-2 px-6 py-6 h-dvh flex flex-col
    items-start justify-start bg-background
    overflow-auto w-screen;
  }
}
.LogoutButton {
  @apply w-max;
}
.SettingsButton {
  @apply w-max;
}
.Main {
  @apply h-full w-full flex flex-row items-start justify-start bg-background;
}
.BottomMenu {
  @apply py-4 w-full flex flex-row justify-between;
}
.MessageList {
  @apply w-full h-[60dvh] px-2 overflow-y-auto;
}

.slide-enter-active {
  transition: all 0.05s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
