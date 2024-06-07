<script setup lang="js">

import { ChevronLeft, MoreVertical, SearchIcon } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Label } from '@/components/ui/label'
import MoreDropdown from '@/components/App/MoreDropdown.vue'
import { inject, onMounted, ref, watch } from 'vue'
import { AppConfig } from '@/config'

const mobile = ref(inject('mobile'))
const menuOpened = ref(inject('menuOpened'))

const selectedChatName = inject('selectedChatName')
const selectedChatAvatar = inject('selectedChatAvatar')
</script>

<template>
  <header class="Header">
    <div class="ContactInfo flex flex-row gap-1 items-center">
      <Button v-if="mobile" variant="ghost" class="size-10 p-0" @click="menuOpened = !menuOpened">
        <ChevronLeft v-if="!menuOpened" class="size-6 hover:scale-110 transition" />
      </Button>
      <div class="flex gap-3 items-center">
        <Avatar>
          <AvatarFallback class="font-bold">
            {{ selectedChatName.charAt(0) }}
          </AvatarFallback>
          <AvatarImage :src="`${AppConfig.fileAPI + '/images/' + selectedChatAvatar}`" />
        </Avatar>

        <div class="ContactData flex flex-col gap-0.5">
          <Label class="w-min line-clamp-1 font-bold cursor-pointer truncate text-ellipsis">
            {{ selectedChatName }}
          </Label>
        </div>
      </div>
    </div>
    <div class="ContactSettings">
      <Button variant="ghost" class="MoreButton">
        <SearchIcon class="size-1/2" />
      </Button>
      <more-dropdown>
        <Button variant="ghost" class="MoreButton">
          <MoreVertical class="size-1/2" />
        </Button>
      </more-dropdown>
    </div>
  </header>
</template>

<style scoped>
@media screen and (min-width: 576px) {
  /*DESKTOP*/
  .Header {
    @apply z-10 -mb-14 w-full h-14 bg-accent/80 border border-accent/50 backdrop-blur-md rounded-md flex flex-row items-center justify-between py-2 px-3;
  }
}

@media screen and (max-width: 576px) {
  /*MOBILE*/
  .Header {
    @apply z-10 -mb-14 w-full h-16 bg-accent/80 border border-foreground/5 backdrop-blur-md rounded-md flex flex-row items-center justify-between py-2 px-1;
  }
}

.ContactSettings {
  @apply flex flex-row items-center gap-2;
}

.MoreButton {
  @apply size-10 p-0 hover:scale-110 transition;
}
</style>