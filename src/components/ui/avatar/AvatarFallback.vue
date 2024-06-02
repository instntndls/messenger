<script setup lang="ts">
import { AvatarFallback, type AvatarFallbackProps } from 'radix-vue'

const props = defineProps<AvatarFallbackProps>()
</script>

<template>
  <AvatarFallback class="capitalize font-bold" v-bind="props">
    <slot />
  </AvatarFallback>
</template>
