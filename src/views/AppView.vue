<script setup>

import { supabase } from '@/clients/supabase'
import { Button } from '@/components/ui/button'
import { onMounted, ref } from 'vue'
import router from '@/router'

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
  checkAuth()
})
</script>

<template>
  <div class="w-screen h-screen flex flex-col items-center justify-center text-3xl gap-6">
    Nothing here yet!

    <p class="text-sm w-2/3">{{ currentUser}}</p>

  </div>
  <Button @click="logout" class="absolute right-4 top-4">Logout</Button>
</template>

<style scoped>

</style>
