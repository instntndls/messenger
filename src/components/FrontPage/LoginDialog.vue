<script setup>
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { EyeIcon, EyeOff, Loader2 } from 'lucide-vue-next'
import { getJWT, getUserData } from '@/api'

import { ref } from 'vue'
import router from '@/router'

const email = ref('')
const password = ref('')

const showPassword = ref(false)
const inputType = ref('password')

const emailValid = ref(false)

const loading = ref(false)

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value
  inputType.value = showPassword.value ? 'text' : 'password'
}

const login = async () => {
  loading.value = true
  await getJWT({
    username: email.value,
    password: password.value
  }).then( () => {
    router.push('/app')
    loading.value = false
    getUserData().then( (response) => {
      localStorage.setItem('user', JSON.stringify(response))
    })
  }).catch( () => {
    alert('Wrong email or password')
    loading.value = false
  })

}



const validateEmail = (text) => {
  emailValid.value = !!text
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  console.log(emailValid.value)
}
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <slot></slot>
    </DialogTrigger>
    <DialogTitle />
    <DialogContent class="sm:max-w-[425px] p-0 bg-transparent">
      <Card>
        <CardHeader>
          <CardTitle>Log in</CardTitle>
          <CardDescription> Enter your email and password below to log in. </CardDescription>
        </CardHeader>
        <CardContent class="space-y-3 flex flex-col bg-transparent">
          <div class="grid gap-3">
            <Label for="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="mail@example.com"
              v-model="email"
              @keydown.enter="login"
              @input="validateEmail(email)"
            />
          </div>
          <div class="grid gap-3">
            <Label for="password">Password</Label>
            <div class="flex items-center">
              <Input id="password" :type="inputType" v-model="password" @keydown.enter="login" />
              <div
                @click="toggleShowPassword"
                class="absolute right-10 cursor-pointer opacity-30 hover:opacity-70"
              >
                <EyeIcon v-if="!showPassword" />
                <EyeOff v-else />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter class="flex flex-col gap-4">
          <Button
            :disabled="!emailValid || password.length < 6 || loading"
            class="w-full"
            @click="login"
          >
            <Loader2 v-if="loading" class="mr-2 size-4 animate-spin" />
            Log In
          </Button>
          <Label> Forgot your username or password? </Label>
          <Label class="flex gap-1">
            New here?
            <router-link class="text-blue-500 cursor-pointer hover:underline" to="signup"
              >Sign Up</router-link
            >
          </Label>
        </CardFooter>
      </Card>
    </DialogContent>
  </Dialog>
</template>

<style scoped></style>
