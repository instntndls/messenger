<script setup lang="js">

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import SettingsDialog from '@/components/App/SettingsDialog.vue'
import { LogOutIcon, SettingsIcon } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import LogoutAlert from '@/components/App/LogoutAlert.vue'

const props = defineProps({
  menuOpened: {
    type: Boolean,
    default: true
  },
  mobile: {
    type: Boolean,
    default: false
  },
  selectedChatId: {
    type: String
  },
  chats: {
    type: Array
  }
})

const emits = defineEmits(['logout'])

const logout = () => {
  emits('logout')
}
</script>

<template>
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
                  @click="mobile ? (menuOpened = !menuOpened) : null; selectedChatId = chat.id"
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
</template>

<style scoped>

</style>