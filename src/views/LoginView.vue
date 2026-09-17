<script setup lang="ts">
import { watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import LoginForm from '@/components/LoginForm.vue'
import AmbientGlow from '@/components/AmbientGlow.vue'
import { useAuth } from '@/firebase/auth'

const router = useRouter()
const { user, loading } = useAuth()

watchEffect(() => {
  if (!loading.value && user.value) {
    router.replace('/')
  }
})
</script>

<template>
  <div class="relative min-h-[calc(100vh-3.5rem)] flex items-center justify-center p-6 md:p-10">
    <!-- Ambient Background Glow -->
    <AmbientGlow variant="default" />

    <div class="w-full max-w-sm relative z-10">
      <LoginForm />
    </div>
  </div>
</template>
