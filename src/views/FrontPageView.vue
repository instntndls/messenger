<script setup lang="ts">

import Backdrop from '@/components/Backdrop.vue'
import { onMounted, provide, ref } from 'vue'

import { Button } from '@/components/ui/button'
import LoginDialog from '@/components/LoginDialog.vue'
import { LucideArrowRight } from 'lucide-vue-next'
import { PlusIcon  } from 'lucide-vue-next'
import { EqualIcon } from 'lucide-vue-next'
import { supabase } from '@/clients/supabase'
import router from '@/router'

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
  <Backdrop/>
  <transition>
    <div v-if="smoothIn" class="Main">
      <h1 class="text-4xl text-white font-black leading-relaxed">
        Vue3 Messenger
      </h1>
      <div class="flex gap-3 h-8 items-center justify-center">
        <img class="size-8 rounded-md" src="@/components/icons/VueLogo.png" alt="vuelogo">
        <PlusIcon/>
        <img class="size-8 rounded-md" src="@/components/icons/shadcnLogo.png" alt="shadcnlogo">
        <PlusIcon/>
        <img class="size-8 rounded-md" src="@/components/icons/supabaseLogo.png" alt="supabaselogo">
        <EqualIcon/>
        <p class="text-3xl">💖</p>
      </div>
      <p class="opacity-80">Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
      <login-dialog>
        <Button class="flex gap-2">
          Get started
          <LucideArrowRight class="size-6"/>
        </Button>
      </login-dialog>
    </div>
  </transition>
</template>

<style scoped>
.Main {
  @apply absolute top-0 left-0 z-10 w-screen h-screen flex flex-col items-center justify-center text-center gap-6
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