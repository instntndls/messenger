<script setup>

import { supabase } from '@/clients/supabase'
import { Button } from '@/components/ui/button'
import { onMounted, ref, provide } from 'vue'
import router from '@/router'
import { SettingsIcon, LogOutIcon } from 'lucide-vue-next'
import { Card } from '@/components/ui/card'
import SettingsDialog from '@/components/SettingsDialog.vue'
import LogoutAlert from '@/components/LogoutAlert.vue'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ChatContent from '@/components/ChatContent.vue'
import { ScrollArea } from '@/components/ui/scroll-area'

const menuOpened = ref(true)

const mobile = ref(window.innerWidth < 576)

const currentUser = ref()
const seeCurrentUser = async () => {
  const { data, error } = await supabase.auth.getSession()
  if (error) {
    currentUser.value = null
  }
  else {
    currentUser.value = data.session?.user
    console.log(currentUser.value)
  }
}

const checkAuth = async () => {
  console.log('checkAuth')
  await seeCurrentUser()
  if (currentUser.value) {
    await router.push('/app')
  }
  else {
    await router.push('/')
  }
}

const logout = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.log(error)
  }
  else {
    console.log('logged out')
  }
  await checkAuth()
}

onMounted(() => {
  window.addEventListener("resize", () => {
    menuOpened.value = window.innerWidth >= 576;
    mobile.value = window.innerWidth < 576;
  });
  checkAuth()
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
          <Tabs default-value="all" class="w-full">
            <TabsList class="w-full gap-1">
              <TabsTrigger value="all" class="w-full">
                All
              </TabsTrigger>
              <TabsTrigger value="unread" class="w-full">
                Unread
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <ScrollArea class="MessageList">
                <Card class="w-full h-16 bg-accent/50 rounded-md my-4" @click="mobile ? menuOpened = !menuOpened: null"></Card>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="unread" class="flex flex-col items-center ">
              <p class="py-8 font-bold opacity-80">No unread messages</p>
            </TabsContent>
          </Tabs>
          <div class="Pusher h-full min-h-0"/>
          <div class="BottomMenu">
            <logout-alert @logout="logout">
              <Button variant="destructive" class="LogoutButton">
                <LogOutIcon class="size-4 mr-2"/>
                Logout
              </Button>
            </logout-alert>
            <settings-dialog>
              <Button variant="outline" class="SettingsButton">
                <SettingsIcon class="size-4 mr-2"/>
                Settings
              </Button>
            </settings-dialog>
          </div>
        </div>
      </transition>
      <ChatContent/>
    </div>
  </div>
</template>

<style scoped>
@media screen and (min-width: 576px) {
  /*DESKTOP*/
  .Sidebar {
    @apply relative py-6 gap-4 h-screen flex flex-col
    items-start justify-start bg-black
    bg-opacity-[0.1] border border-gray-700
    border-opacity-30 min-w-64 max-w-96
    px-6 w-1/3
  }
}

@media screen and (max-width: 576px) {
  /*MOBILE*/
  .Sidebar {
    @apply absolute top-0 left-0 gap-2 px-6 py-6 h-screen flex flex-col
    items-start justify-start bg-background
    overflow-auto w-screen
  }
}
.LogoutButton {
  @apply w-max
}
.SettingsButton {
  @apply w-max
}
.Main {
  @apply h-full w-full flex flex-row items-start justify-start bg-background
}
.BottomMenu {
  @apply py-4 w-full flex flex-row justify-between bg-background/80 backdrop-blur-md
}
.MessageList {
  @apply w-full h-[65vh] min-h-64 px-2
}

.slide-enter-active {
  transition: all 0.05s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>