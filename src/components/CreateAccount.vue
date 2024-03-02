<script setup lang="ts">
import { EyeIcon, EyeOff, GithubIcon } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import GoogleIcon from '@/components/icons/GoogleIcon.vue'
import { ref } from 'vue'

const email = ref('')
const password = ref('')

const showPassword = ref(false)
const inputType = ref('password')

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value
  inputType.value = showPassword.value ? 'text' : 'password'
}

const createAccount = async () => {
  console.log(email.value + ' ' + password.value)
}
</script>

<template>
  <Card class="absolute">
    <CardHeader class="space-y-1">
      <CardTitle class="text-2xl">
        Create an account
      </CardTitle>
      <CardDescription>
        Enter your email below to create your account
      </CardDescription>
    </CardHeader>
    <CardContent class="space-y-3 flex flex-col">
      <div class="grid grid-cols-2 gap-6">
        <Button variant="outline">
          <GithubIcon class=" pr-2"/>
          Github
        </Button>
        <Button variant="outline">
          <GoogleIcon/>
          Google
        </Button>
      </div>
      <div class="relative">
        <div class="relative flex justify-center text-xs uppercase">
          <span class="px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div class="grid gap-3">
        <Label for="email">Email</Label>
        <Input id="email" type="email" placeholder="m@example.com" v-model="email"/>
      </div>
      <div class="grid gap-3">
        <Label for="password">Password</Label>
        <div class="flex items-center">
          <Input id="password" :type="inputType" v-model="password"/>
          <div @click="toggleShowPassword" class="absolute right-10 cursor-pointer opacity-30 hover:opacity-70">
            <EyeIcon v-if="!showPassword" />
            <EyeOff v-else/>
          </div>
        </div>
      </div>
    </CardContent>
    <CardFooter class="flex flex-col gap-6">
      <Button class="w-full" @click="createAccount">
        Create account
      </Button>
      <Label class="flex gap-1">
        Already have an account?
        <router-link class="text-blue-500 cursor-pointer hover:underline" to="/">Log In</router-link>
      </Label>
    </CardFooter>
  </Card>
</template>

<style scoped>

</style>