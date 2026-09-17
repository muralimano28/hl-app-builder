<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, AlertCircle } from 'lucide-vue-next'
import AmbientGlow from '@/components/AmbientGlow.vue'
import { useAuth } from '@/firebase/auth'

const router = useRouter()
const { registerWithEmail, user, loading: authLoading } = useAuth()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const isLoading = ref(false)
const errorMessage = ref<string | null>(null)

watchEffect(() => {
  if (!authLoading.value && user.value) {
    router.replace('/')
  }
})

const handleSignUp = async () => {
  if (!email.value || !password.value) return

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match.'
    return
  }

  if (password.value.length < 6) {
    errorMessage.value = 'Password must be at least 6 characters.'
    return
  }

  isLoading.value = true
  errorMessage.value = null

  try {
    await registerWithEmail(email.value, password.value)
    router.push('/')
  } catch (err: any) {
    const code = err?.code || ''
    if (code === 'auth/email-already-in-use') {
      errorMessage.value = 'An account with this email already exists.'
    } else if (code === 'auth/invalid-email') {
      errorMessage.value = 'Please enter a valid email address.'
    } else if (code === 'auth/weak-password') {
      errorMessage.value = 'Password should be at least 6 characters.'
    } else {
      errorMessage.value = err?.message || 'Failed to create account.'
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="relative min-h-[calc(100vh-3.5rem)] flex items-center justify-center p-6 md:p-10">
    <!-- Ambient Background Glow -->
    <AmbientGlow variant="emerald" />

    <div class="w-full max-w-sm relative z-10">
      <Card>
        <CardHeader>
          <CardTitle class="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Enter your email and create a password to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form @submit.prevent="handleSignUp">
            <div class="flex flex-col gap-6">
              <div class="grid gap-2">
                <Label for="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="m@example.com"
                  v-model="email"
                  autocomplete="email"
                  required
                  :disabled="isLoading"
                />
              </div>
              <div class="grid gap-2">
                <Label for="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  v-model="password"
                  autocomplete="new-password"
                  required
                  :disabled="isLoading"
                />
              </div>
              <div class="grid gap-2">
                <Label for="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  v-model="confirmPassword"
                  autocomplete="new-password"
                  required
                  :disabled="isLoading"
                />
              </div>

              <Alert v-if="errorMessage" variant="destructive" class="py-2.5">
                <AlertCircle class="size-4" />
                <AlertDescription class="text-xs">
                  {{ errorMessage }}
                </AlertDescription>
              </Alert>

              <Button type="submit" class="w-full cursor-pointer" :disabled="isLoading">
                <Loader2 v-if="isLoading" class="mr-2 size-4 animate-spin" />
                <span>{{ isLoading ? 'Creating account...' : 'Sign Up' }}</span>
              </Button>
            </div>

            <div class="mt-4 text-center text-sm">
              Already have an account?
              {{ ' ' }}
              <RouterLink to="/login" class="underline underline-offset-4 hover:text-primary font-medium">
                Login
              </RouterLink>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
