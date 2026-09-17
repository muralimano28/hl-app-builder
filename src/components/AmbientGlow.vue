<script setup lang="ts">
import { type HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    variant?: 'default' | 'emerald' | 'orange' | 'minimal'
  }>(),
  {
    variant: 'default',
  }
)
</script>

<template>
  <div :class="cn('pointer-events-none absolute inset-0 overflow-hidden select-none', props.class)" aria-hidden="true">
    <template v-if="variant === 'default'">
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div class="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl" />
    </template>

    <template v-else-if="variant === 'emerald'">
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
      <div class="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
    </template>

    <template v-else-if="variant === 'orange'">
      <div class="absolute top-1/3 left-1/3 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />
      <div class="absolute bottom-1/3 right-1/3 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />
    </template>

    <template v-else-if="variant === 'minimal'">
      <div class="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
    </template>

    <!-- Custom slot in case specific glow circles are passed -->
    <slot />
  </div>
</template>
