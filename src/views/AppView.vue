<script setup>

import { supabase } from '@/clients/supabase'
import { Button } from '@/components/ui/button'
import { ref } from 'vue'
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
  checkAuth()
}
</script>

<template>
  app
  <Button @click="logout">Logout</Button>
</template>

<style scoped>

</style>
