<script setup lang="ts">

import Backdrop from '@/components/Backdrop.vue'
import { onMounted, provide, ref } from 'vue'

import { Button } from '@/components/ui/button'
import LoginDialog from '@/components/LoginDialog.vue'
import { CalendarDays, LucideArrowRight, PlusIcon, GithubIcon } from 'lucide-vue-next'
import { supabase } from '@/clients/supabase'
import router from '@/router'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'


const smoothIn = ref(false)

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
      <div class="Title flex flex-col items-center gap-8 h-5/6 justify-center">
        <h1 class="text-4xl text-white font-black leading-relaxed">
          Vue3 Messenger
        </h1>
        <div class="flex gap-3 h-8 items-center justify-center">
          <img class="size-8 rounded-md" src="@/components/icons/VueLogo.png" alt="vuelogo">
          <PlusIcon/>
          <img class="size-8 rounded-md" src="@/components/icons/shadcnLogo.png" alt="shadcnlogo">
          <PlusIcon/>
          <img class="size-8 rounded-md" src="@/components/icons/supabaseLogo.png" alt="supabaselogo">

        </div>
        <p class="opacity-80">Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
        <login-dialog>
          <Button class="flex gap-2">
            Get started
            <LucideArrowRight class="size-6"/>
          </Button>
        </login-dialog>
      </div>
      <div class="Footer flex flex-col justify-center items-center h-1/6 bg-black bg-opacity-50">
        <div class="text-md">
          Made with ❤️ by
          <HoverCard>
            <HoverCardTrigger as-child>
              <Button variant="link" class="text-md -mx-3">
                <a href="https://github.com/instntndls">
                  @instntndls
                </a>

              </Button>
            </HoverCardTrigger>
            <HoverCardContent class="w-80">
              <div class="flex justify-between space-x-4">
                <Avatar>
                  <AvatarImage src="https://avatars.githubusercontent.com/u/42333829?v=4" />
                  <AvatarFallback>IN</AvatarFallback>
                </Avatar>
                <div class="space-y-1">
                  <h4 class="text-sm font-semibold">
                    InstantNoodles
                  </h4>
                  <p class="text-sm">
                    Frontend developer specializing in Vue.js. Passionate about crafting pixel-perfect UI/UX experiences.
                  </p>
                  <Button variant="link" class="text-sm font-bold -m-4 text-blue-500">
                    <a href="https://github.com/instntndls">
                      Visit my github page!
                    </a>
                  </Button>
                </div>

              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>

    </div>
  </transition>

</template>

<style scoped>
.Main {
  @apply absolute top-0 left-0 z-10 w-screen h-screen
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