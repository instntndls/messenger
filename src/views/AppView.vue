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
import { getUserData, getAllChats } from '@/api/api'

const menuOpened = ref(true)

const mobile = ref(window.innerWidth < 576)

const chats = ref()
const selectedChatId = ref()

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

onMounted(() => {
  window.addEventListener('resize', () => {
    menuOpened.value = window.innerWidth >= 576
    mobile.value = window.innerWidth < 576
  })
  checkAuth()
  getChats()
})

provide('mobile', mobile)
provide('menuOpened', menuOpened)
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
                <Card v-for="chat in chats" :key="chat.id"
                  class="w-full h-16 bg-accent/50 rounded-md my-4 p-4"
                  @click="mobile ? (menuOpened = !menuOpened) : null"
                >
                  <p v-if="chat.name">{{ chat.name }}</p>
                  <p v-else>{{ chat.second_user_first_name + ' ' + chat.second_user_last_name }}</p>
                </Card>
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
      <ChatContent />
    </div>
  </div>
</template>

<style scoped>
@media screen and (min-width: 576px) {
  /*DESKTOP*/
  .Sidebar {
    @apply relative py-6 gap-4 h-dvh flex flex-col
    items-start justify-start bg-background
    bg-opacity-[0.1] border-r border-foreground/10 rounded-sm min-w-64 max-w-96
    px-6 w-1/3;
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
