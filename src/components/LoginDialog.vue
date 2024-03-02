<script setup>
import { Button } from '@/components/ui/button'
import {
  Dialog, DialogClose,
  DialogContent, DialogTitle,
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
  CardTitle,
} from '@/components/ui/card'
import { GithubIcon, EyeIcon, EyeOff } from 'lucide-vue-next'

import { supabase } from '@/clients/supabase'
import { inject, provide, ref } from 'vue'
import GoogleIcon from '@/components/icons/GoogleIcon.vue'

const email = ref('')
const password = ref('')

const showPassword = ref(false)
const inputType = ref('password')

const checkAuth = inject('checkAuth')

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value
  inputType.value = showPassword.value ? 'text' : 'password'
}

const login = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })
  if (error) {
    console.log(error)
  }
  else {
    console.log(data)
  }
  await checkAuth()
}

</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <slot></slot>
    </DialogTrigger>
    <DialogTitle/>
    <DialogContent class="sm:max-w-[425px] p-0">
      <Card>
        <CardHeader>
          <CardTitle>Log in</CardTitle>
          <CardDescription>
            Enter your email and password below to log in.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-3 flex flex-col">
          <div class="grid gap-3">
            <Label for="email">Email</Label>
            <Input id="email" type="email" placeholder="mail@example.com" v-model="email" @keydown.enter="login"/>
          </div>
          <div class="grid gap-3">
            <Label for="password">Password</Label>
            <div class="flex items-center">
              <Input id="password" :type="inputType" v-model="password" @keydown.enter="login"/>
              <div @click="toggleShowPassword" class="absolute right-10 cursor-pointer opacity-30 hover:opacity-70">
                <EyeIcon v-if="!showPassword" />
                <EyeOff v-else/>
              </div>
            </div>
          </div>
<!--          <div class="relative py-2">-->
<!--            <div class="absolute inset-0 flex items-center">-->
<!--              <span class="w-full border-t" />-->
<!--            </div>-->
<!--            <div class="relative flex justify-center text-xs uppercase">-->
<!--                  <span class="bg-background text-muted-foreground">-->
<!--                    Or continue with-->
<!--                  </span>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="grid grid-cols-2 gap-6">-->
<!--            <Button variant="outline">-->
<!--              <GithubIcon class=" pr-2"/>-->
<!--              Github-->
<!--            </Button>-->
<!--            <Button variant="outline">-->
<!--              <GoogleIcon/>-->
<!--              Google-->
<!--            </Button>-->
<!--          </div>-->
        </CardContent>
        <CardFooter class="flex flex-col gap-4">
          <Button class="w-full" @click="login">Log In</Button>
          <Label>
            Forgot your username or password?
          </Label>
          <Label class="flex gap-1">
            New here?
            <router-link class="text-blue-500 cursor-pointer hover:underline" to="signup">Sign Up</router-link>
          </Label>
        </CardFooter>
      </Card>
    </DialogContent>
  </Dialog>
</template>

<style scoped>

</style>