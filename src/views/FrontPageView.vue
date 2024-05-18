<script setup lang="ts">
import Backdrop from '@/components/FrontPage/Backdrop.vue'
import { onMounted, provide, ref } from 'vue'

import { Button } from '@/components/ui/button'
import LoginDialog from '@/components/FrontPage/LoginDialog.vue'
import { LucideArrowRight, PlusIcon } from 'lucide-vue-next'
import router from '@/router'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getUserData } from '@/api/api'

const smoothIn = ref(false)

const currentUser = ref()

const seeCurrentUser = async () => {
  if (localStorage.getItem('token')) {
    currentUser.value = await getUserData()
  }
}

const checkAuth = async () => {
  await seeCurrentUser()
  if (currentUser.value) {
    await router.push('/app')
  } else {
    await router.push('/')
  }
}

onMounted(() => {
  setTimeout(() => {
    smoothIn.value = true
  })
  checkAuth()
})

provide('checkAuth', checkAuth)
</script>

<template>
  <Backdrop />
  <transition>
    <div v-if="smoothIn" class="Main">
      <div class="Title flex flex-col items-center gap-8 h-[90%] justify-center">
        <h1 class="text-4xl text-white font-black leading-relaxed">Vue3 Messenger</h1>
        <div class="flex gap-3 h-8 items-center justify-center">
          <img class="size-8 rounded-md" src="@/components/icons/vueLogo.png" alt="vuelogo" />
          <PlusIcon class="text-white" />
          <img class="size-8 rounded-md" src="@/components/icons/shadcnLogo.png" alt="shadcnlogo" />
          <PlusIcon class="text-white" />
          <img
            class="w-8 rounded-md"
            src="@/components/icons/tailwindLogo.png"
            alt="tailwindcsslogo"
          />
        </div>
        <p class="opacity-80 text-center text-white">
          Stay connected with ease! <br />
          Enjoy real-time messaging and a clean <br />
          interface for effortless communication.💬✨
        </p>
        <login-dialog>
          <Button class="flex gap-2">
            Get started
            <LucideArrowRight class="size-6" />
          </Button>
        </login-dialog>
      </div>
      <div class="Footer flex flex-col justify-center items-center h-[10%] bg-black bg-opacity-30 text-white">
        <div class="text-md opacity-80">
          Made with ❤️ by
          <HoverCard>
            <HoverCardTrigger as-child>
              <Button variant="link" class="text-md -mx-3 text-white">
                <a href="https://github.com/instntndls"> @instntndls </a>
              </Button>
            </HoverCardTrigger>
            <HoverCardContent class="w-80">
              <div class="flex justify-between space-x-4">
                <Avatar>
                  <AvatarImage src="https://avatars.githubusercontent.com/u/42333829?v=4" />
                  <AvatarFallback>IN</AvatarFallback>
                </Avatar>
                <div class="space-y-1">
                  <h4 class="text-sm font-semibold">InstantNoodles</h4>
                  <p class="text-sm">
                    Frontend developer specializing in Vue.js. Passionate about crafting
                    pixel-perfect UI/UX experiences.
                  </p>
                  <Button variant="link" class="text-sm font-bold -m-4 text-blue-500">
                    <a href="https://github.com/instntndls"> Visit my github page! </a>
                  </Button>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
        <div class="flex text-sm opacity-80">
          Backdrop by
          <Button variant="link" class="text-md -m-2.5 text-white">
            <a href="https://ericaofanderson.tumblr.com/"> Erica Anderson </a>
          </Button>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.Main {
  @apply absolute top-0 left-0 z-10 w-screen h-screen;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.8s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
