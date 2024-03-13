<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Switch } from '@/components/ui/switch'
import { BellIcon, BellOffIcon, Trash2Icon } from 'lucide-vue-next'
import { ref } from 'vue'

const notifications = ref(true)
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <slot />
    </DropdownMenuTrigger>
    <DropdownMenuContent class="mx-4">
      <DropdownMenuItem
        class="cursor-pointer flex flex-row gap-2"
        @click="notifications = !notifications"
      >
        <BellIcon v-if="notifications" class="size-4" />
        <BellOffIcon v-else class="size-4" />
        <p v-if="notifications">Disable notifications</p>
        <p v-else>Enable notifications</p>
      </DropdownMenuItem>
      <DropdownMenuItem
        class="text-destructive font-bold cursor-pointer dark:hover:bg-destructive hover:bg-destructive flex flex-row gap-2"
      >
        <Trash2Icon class="size-4" />
        Delete chat
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<style scoped></style>
