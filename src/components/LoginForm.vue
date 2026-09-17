<script setup lang="ts">
import { ref, type HTMLAttributes } from 'vue'
import { useRouter } from 'vue-router'
import { cn } from '@/lib/utils'
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
import { useAuth } from '@/firebase/auth'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const router = useRouter()
const { loginWithEmail } = useAuth()

const email = ref('')
const password = ref('')
const isLoading = ref(false)
const errorMessage = ref<string | null>(null)

const handleLogin = async () => {
  if (!email.value || !password.value) return

  isLoading.value = true
  errorMessage.value = null

  try {
    await loginWithEmail(email.value, password.value)
    router.push('/')
  } catch (err: any) {
    // Format Firebase Auth error messages to be user friendly
    const code = err?.code || ''
    if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
      errorMessage.value = 'Invalid email or password. Please try again.'
    } else if (code === 'auth/invalid-email') {
      errorMessage.value = 'Please enter a valid email address.'
    } else if (code === 'auth/user-disabled') {
      errorMessage.value = 'This user account has been disabled.'
    } else if (code === 'auth/too-many-requests') {
      errorMessage.value = 'Too many failed attempts. Please try again later.'
    } else {
      errorMessage.value = err?.message || 'Failed to sign in. Please check your credentials.'
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div :class="cn('flex flex-col gap-6', props.class)">
    <Card>
      <CardHeader>
        <CardTitle class="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="handleLogin">
          <div class="flex flex-col gap-6">
            <div class="grid gap-2">
              <Label for="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                v-model="email"
                autocomplete="email"
                required
                :disabled="isLoading"
              />
            </div>
            <div class="grid gap-2">
              <div class="flex items-center">
                <Label for="password">Password</Label>
                <a
                  href="#"
                  class="ml-auto inline-block text-sm underline-offset-4 hover:underline text-muted-foreground hover:text-foreground"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                v-model="password"
                autocomplete="current-password"
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
              <span>{{ isLoading ? 'Logging in...' : 'Login' }}</span>
            </Button>
          </div>

          <div class="mt-4 text-center text-sm">
            Don't have an account?
            {{ ' ' }}
            <RouterLink to="/sign-up" class="underline underline-offset-4 hover:text-primary font-medium">
              Sign up
            </RouterLink>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
