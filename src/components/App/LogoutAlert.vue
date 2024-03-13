<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { LogOutIcon } from 'lucide-vue-next'

const emit = defineEmits(['logout'])
</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger as-child>
      <slot />
    </AlertDialogTrigger>
    <AlertDialogContent class="min-w-56 w-96">
      <AlertDialogHeader>
        <AlertDialogTitle class="text-center">Do you really want to logout?</AlertDialogTitle>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <div class="flex flex-row items-center justify-evenly w-full gap-8 px-8">
          <Button variant="destructive" class="w-1/2" @click="emit('logout')">
            <LogOutIcon class="size-4 mr-2" />
            Logout
          </Button>
          <AlertDialogCancel variant="ghost" class="w-1/2">Cancel</AlertDialogCancel>
        </div>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<style scoped></style>
