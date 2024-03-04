<script setup lang="ts">
import { EyeIcon, EyeOff, GithubIcon, Loader2 } from 'lucide-vue-next'
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
import { onMounted, ref } from 'vue'
import { supabase } from '@/clients/supabase'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

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

const createAccount = async () => {
  loading.value = true
  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      emailRedirectTo: window.location.origin + '/messenger'
    }
  })
  if (error) {
    alert(error)
    loading.value = false
  }
  else {
    console.log(data)
  }
}

const validateEmail = (text: string) => {
  emailValid.value = !!text.toLowerCase().match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
  console.log(emailValid.value)
}
</script>

<template>
  <Card class="absolute bg-background/60 backdrop-blur-xl">
    <CardHeader class="space-y-1">
      <CardTitle class="text-2xl">
        Create an account
      </CardTitle>
      <CardDescription>
        Enter your email below to create your account
      </CardDescription>
    </CardHeader>
    <CardContent class="space-y-3 flex flex-col">
<!--      <div class="grid grid-cols-2 gap-6">-->
<!--        <Button variant="outline">-->
<!--          <GithubIcon class=" pr-2"/>-->
<!--          Github-->
<!--        </Button>-->
<!--        <Button variant="outline">-->
<!--          <GoogleIcon/>-->
<!--          Google-->
<!--        </Button>-->
<!--      </div>-->
<!--      <div class="relative">-->
<!--        <div class="relative flex justify-center text-xs uppercase">-->
<!--          <span class="px-2 text-muted-foreground">-->
<!--            Or continue with-->
<!--          </span>-->
<!--        </div>-->
<!--      </div>-->
      <div class="grid gap-3">
        <Label for="email">Email</Label>
        <Input id="email" type="email" placeholder="m@example.com" v-model="email" @input="validateEmail(email)"/>
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
        <CardDescription >
          Password must be at least 6 characters
        </CardDescription>
      </div>
    </CardContent>
    <CardFooter class="flex flex-col gap-6">
      <AlertDialog>
        <AlertDialogTrigger class="w-full">
          <Button :disabled="!emailValid || password.length < 6 || loading"  class="w-full" @click="createAccount">
            <Loader2 v-if="loading" class="size-4 mr-2 animate-spin"/>
            Create account
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <p v-if="!emailValid || password.length < 6" class="text-center text-red-500">
              Fill all the fields and make sure the password is at least 6 characters
            </p>
            <p v-else class="text-center text-green-500">
              Verification link was sent to your email
            </p>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel class="w-full">Ok</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Label class="flex gap-1">
        Already have an account?
        <router-link class="text-blue-500 cursor-pointer hover:underline" to="/">Log In</router-link>
      </Label>
    </CardFooter>
  </Card>
</template>

<style scoped>

</style>