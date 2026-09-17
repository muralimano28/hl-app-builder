<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Layers, LogIn, LogOut, User as UserIcon } from 'lucide-vue-next'
import { useAuth } from '@/firebase/auth'

const router = useRouter()
const { user, loading: authLoading, logout } = useAuth()

const handleLogout = async () => {
  await logout()
  router.push('/login')
}
</script>

<template>
  <div class="relative min-h-screen flex flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
    <!-- Top Navigation Bar -->
    <header class="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div class="container mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <RouterLink to="/" class="flex items-center gap-2.5 font-semibold tracking-tight text-foreground hover:opacity-90 transition-opacity">
          <div class="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <Layers class="size-4" />
          </div>
          <span>HL App Builder</span>
          <Badge variant="outline" class="ml-1 text-[11px] font-mono border-primary/30 text-primary">
            v1.0.0
          </Badge>
        </RouterLink>

        <!-- Right Header Auth Controls -->
        <div class="flex items-center gap-2">
          <template v-if="!authLoading">
            <div v-if="user" class="flex items-center gap-2">
              <div class="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-md border border-border/50">
                <UserIcon class="size-3.5 text-primary" />
                <span class="max-w-[150px] truncate font-medium text-foreground">{{ user.email }}</span>
              </div>
              <Button variant="ghost" size="sm" class="gap-1.5 cursor-pointer text-muted-foreground hover:text-foreground" @click="handleLogout">
                <LogOut class="size-3.5" />
                <span class="hidden sm:inline">Sign Out</span>
              </Button>
            </div>
            <div v-else class="flex items-center gap-2">
              <RouterLink to="/login">
                <Button variant="ghost" size="sm" class="gap-1.5 cursor-pointer">
                  <LogIn class="size-3.5" />
                  <span>Login</span>
                </Button>
              </RouterLink>
              <RouterLink to="/sign-up">
                <Button size="sm" class="cursor-pointer">
                  <span>Sign Up</span>
                </Button>
              </RouterLink>
            </div>
          </template>
        </div>
      </div>
    </header>

    <!-- Routed View Content -->
    <main class="flex-1 flex flex-col">
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="border-t border-border/40 py-6 text-center text-xs text-muted-foreground">
      <div class="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 max-w-6xl">
        <p>HL App Builder &bull; {{ new Date().getFullYear() }} &bull; All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>
