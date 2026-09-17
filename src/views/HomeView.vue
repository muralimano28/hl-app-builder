<script setup lang="ts">
import { useAuth } from '@/firebase/auth'
import AmbientGlow from '@/components/AmbientGlow.vue'

const { user } = useAuth()
</script>

<template>
  <div class="relative container mx-auto max-w-6xl px-4 py-16 sm:px-6 flex flex-col items-center justify-center text-center min-h-[calc(100vh-10rem)]">
    <!-- Ambient Glow Background -->
    <AmbientGlow variant="minimal" />

    <div class="relative z-10 space-y-4">
      <h1 class="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
        Hello, <span class="bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-500 bg-clip-text text-transparent">World!</span>
      </h1>
      <p v-if="user" class="text-muted-foreground text-lg">
        Logged in as <span class="font-medium text-foreground">{{ user.email }}</span>
      </p>
      <p v-else class="text-muted-foreground text-lg">
        Welcome to HL App Builder.
      </p>
    </div>
  </div>
</template>
