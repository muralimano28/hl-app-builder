<script setup lang="ts">
import { ref, computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import {
  Sparkles,
  Layers,
  Flame,
  CheckCircle2,
  Code2,
  Terminal,
  Database,
  ShieldCheck,
  Zap,
  ExternalLink,
  ChevronRight,
  PartyPopper
} from 'lucide-vue-next'
import { firebaseConfig, isFirebaseConfigured } from '@/firebase/config'
import { useAuth } from '@/firebase/auth'

const count = ref(0)
const activeTab = ref('overview')
const testInput = ref('Hello Firebase!')

const { user, loading: authLoading } = useAuth()
const isConfigured = computed(() => isFirebaseConfigured())

const incrementCount = () => {
  count.value++
}
</script>

<template>
  <div class="relative min-h-screen flex flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
    <!-- Ambient Background Glow -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />
      <div class="absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
      <div class="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
    </div>

    <!-- Top Navigation Bar -->
    <header class="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div class="container mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div class="flex items-center gap-2.5 font-semibold tracking-tight text-foreground">
          <div class="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <Layers class="size-4" />
          </div>
          <span>HL App Builder</span>
          <Badge variant="outline" class="ml-1 text-[11px] font-mono border-primary/30 text-primary">
            v1.0.0
          </Badge>
        </div>

        <div class="flex items-center gap-2">
          <Badge variant="secondary" class="gap-1 font-mono text-xs">
            <Flame class="size-3 text-orange-500" />
            {{ firebaseConfig.projectId }}
          </Badge>
          <a
            href="https://shadcn-vue.com"
            target="_blank"
            rel="noopener noreferrer"
            class="hidden sm:inline-flex"
          >
            <Button variant="ghost" size="sm" class="gap-1 text-muted-foreground hover:text-foreground">
              <span>Docs</span>
              <ExternalLink class="size-3" />
            </Button>
          </a>
        </div>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="container mx-auto flex-1 max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
      <div class="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto mb-12">
        <div class="inline-flex items-center gap-2 rounded-full border border-border/80 bg-muted/40 px-3.5 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
          <Sparkles class="size-3.5 text-amber-500" />
          <span>Vue 3 + TypeScript + ShadCN UI + Firebase</span>
        </div>

        <h1 class="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-balance">
          Hello, <span class="bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-500 bg-clip-text text-transparent">World!</span>
        </h1>

        <p class="text-base sm:text-lg text-muted-foreground text-balance max-w-2xl">
          Your project is fully scaffolded and ready. Built with modern Vue 3 composition API, shadcn-vue design components, and scalable Firebase backend services.
        </p>

        <!-- Primary Interactive Button -->
        <div class="pt-4 flex flex-wrap items-center justify-center gap-3">
          <Button
            size="lg"
            class="cursor-pointer gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform active:scale-95"
            @click="incrementCount"
          >
            <PartyPopper class="size-4" />
            <span>Interactive Counter: <span class="font-mono font-bold">{{ count }}</span></span>
          </Button>

          <Button
            variant="outline"
            size="lg"
            class="cursor-pointer gap-2"
            @click="activeTab = 'backend'"
          >
            <Database class="size-4" />
            <span>Explore Backend</span>
          </Button>
        </div>
      </div>

      <!-- Feature Grid / Tabs Section -->
      <div class="max-w-4xl mx-auto">
        <Tabs v-model="activeTab" class="w-full">
          <div class="flex justify-center mb-6">
            <TabsList class="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="overview" class="gap-1.5 cursor-pointer">
                <Code2 class="size-3.5" />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger value="backend" class="gap-1.5 cursor-pointer">
                <Flame class="size-3.5 text-orange-500" />
                <span>Firebase</span>
              </TabsTrigger>
              <TabsTrigger value="commands" class="gap-1.5 cursor-pointer">
                <Terminal class="size-3.5" />
                <span>Commands</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <!-- Tab 1: Overview -->
          <TabsContent value="overview" class="space-y-4">
            <div class="grid gap-4 sm:grid-cols-2">
              <Card class="border-border/60 bg-card/60 backdrop-blur-sm shadow-sm transition-all hover:border-border hover:shadow-md">
                <CardHeader>
                  <div class="flex items-center justify-between">
                    <div class="size-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                      <Zap class="size-5" />
                    </div>
                    <Badge variant="secondary" class="font-mono">Frontend</Badge>
                  </div>
                  <CardTitle class="mt-3">Vue 3 + ShadCN UI</CardTitle>
                  <CardDescription>
                    Modern reactive architecture powered by Vite 6 and Tailwind CSS v4 design tokens.
                  </CardDescription>
                </CardHeader>
                <CardContent class="space-y-2 text-sm text-muted-foreground">
                  <div class="flex items-center gap-2">
                    <CheckCircle2 class="size-4 text-emerald-500 shrink-0" />
                    <span>Vue 3.5 & Composition API</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <CheckCircle2 class="size-4 text-emerald-500 shrink-0" />
                    <span>Radix Vue UI primitives + ShadCN</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <CheckCircle2 class="size-4 text-emerald-500 shrink-0" />
                    <span>TypeScript strict typechecking</span>
                  </div>
                </CardContent>
              </Card>

              <Card class="border-border/60 bg-card/60 backdrop-blur-sm shadow-sm transition-all hover:border-border hover:shadow-md">
                <CardHeader>
                  <div class="flex items-center justify-between">
                    <div class="size-9 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500">
                      <Flame class="size-5" />
                    </div>
                    <Badge variant="secondary" class="font-mono">Backend</Badge>
                  </div>
                  <CardTitle class="mt-3">Firebase Suite</CardTitle>
                  <CardDescription>
                    End-to-end backend foundation ready for authentication, real-time data, and serverless logic.
                  </CardDescription>
                </CardHeader>
                <CardContent class="space-y-2 text-sm text-muted-foreground">
                  <div class="flex items-center gap-2">
                    <CheckCircle2 class="size-4 text-orange-500 shrink-0" />
                    <span>Firebase Auth & Reactive Composable</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <CheckCircle2 class="size-4 text-orange-500 shrink-0" />
                    <span>Cloud Firestore & Security Rules</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <CheckCircle2 class="size-4 text-orange-500 shrink-0" />
                    <span>Cloud Functions (TypeScript v2)</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <!-- Tab 2: Firebase Backend -->
          <TabsContent value="backend" class="space-y-4">
            <Card class="border-border/60 bg-card/60 backdrop-blur-sm shadow-sm">
              <CardHeader>
                <CardTitle class="flex items-center gap-2 text-lg">
                  <ShieldCheck class="size-5 text-orange-500" />
                  <span>Firebase Integration Status</span>
                </CardTitle>
                <CardDescription>
                  Configuration status and client SDK connectivity overview.
                </CardDescription>
              </CardHeader>
              <CardContent class="space-y-4">
                <div class="grid gap-3 sm:grid-cols-3">
                  <div class="rounded-lg border border-border/60 bg-muted/30 p-3.5">
                    <div class="text-xs font-medium text-muted-foreground">Auth State</div>
                    <div class="mt-1 flex items-center gap-1.5 font-semibold text-sm">
                      <span class="size-2 rounded-full" :class="user ? 'bg-emerald-500' : 'bg-amber-500'" />
                      <span>{{ authLoading ? 'Checking...' : user ? user.email || 'Authenticated' : 'Guest (Ready)' }}</span>
                    </div>
                  </div>

                  <div class="rounded-lg border border-border/60 bg-muted/30 p-3.5">
                    <div class="text-xs font-medium text-muted-foreground">Firestore Instance</div>
                    <div class="mt-1 flex items-center gap-1.5 font-semibold text-sm">
                      <span class="size-2 rounded-full bg-emerald-500" />
                      <span>Initialized</span>
                    </div>
                  </div>

                  <div class="rounded-lg border border-border/60 bg-muted/30 p-3.5">
                    <div class="flex items-center justify-between text-xs font-medium text-muted-foreground">
                      <span>Project Target</span>
                      <Badge :variant="isConfigured ? 'default' : 'outline'" class="text-[10px] font-mono">
                        {{ isConfigured ? 'Live Config' : 'Demo Config' }}
                      </Badge>
                    </div>
                    <div class="mt-1 font-mono text-sm truncate font-semibold">
                      {{ firebaseConfig.projectId }}
                    </div>
                  </div>
                </div>

                <Separator class="my-2" />

                <div class="space-y-2">
                  <label class="text-xs font-medium text-muted-foreground">Test Client Input Binding</label>
                  <div class="flex gap-2">
                    <Input v-model="testInput" placeholder="Enter message..." class="font-mono text-sm" />
                    <Button variant="secondary" size="default" class="shrink-0">
                      Echo
                    </Button>
                  </div>
                  <p class="text-[12px] text-muted-foreground">
                    Connected to module <code class="rounded bg-muted px-1.5 py-0.5 font-mono text-foreground">@/firebase/index.ts</code>
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <!-- Tab 3: CLI Commands -->
          <TabsContent value="commands" class="space-y-4">
            <Card class="border-border/60 bg-card/60 backdrop-blur-sm shadow-sm">
              <CardHeader>
                <CardTitle class="flex items-center gap-2 text-lg">
                  <Terminal class="size-5 text-primary" />
                  <span>Developer Workflow Commands</span>
                </CardTitle>
                <CardDescription>
                  Standard development and deployment commands.
                </CardDescription>
              </CardHeader>
              <CardContent class="space-y-3 font-mono text-xs">
                <div class="rounded-lg bg-muted/50 p-3 flex items-center justify-between">
                  <div>
                    <span class="text-muted-foreground"># Run Vite frontend dev server</span>
                    <div class="text-foreground font-semibold mt-1">npm run dev</div>
                  </div>
                  <Badge variant="outline">Frontend</Badge>
                </div>

                <div class="rounded-lg bg-muted/50 p-3 flex items-center justify-between">
                  <div>
                    <span class="text-muted-foreground"># Build Cloud Functions (TypeScript)</span>
                    <div class="text-foreground font-semibold mt-1">npm --prefix functions run build</div>
                  </div>
                  <Badge variant="outline">Functions</Badge>
                </div>

                <div class="rounded-lg bg-muted/50 p-3 flex items-center justify-between">
                  <div>
                    <span class="text-muted-foreground"># Start local Firebase emulators (Auth, Firestore, Functions)</span>
                    <div class="text-foreground font-semibold mt-1">npx firebase-tools emulators:start</div>
                  </div>
                  <Badge variant="outline">Emulators</Badge>
                </div>
              </CardContent>
              <CardFooter class="border-t border-border/40 text-xs text-muted-foreground">
                <div class="flex items-center gap-1.5">
                  <ChevronRight class="size-3.5 text-primary" />
                  <span>Configure live credentials in <code class="rounded bg-muted px-1.5 py-0.5 font-mono text-foreground">.env</code> anytime</span>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>

    <!-- Footer -->
    <footer class="border-t border-border/40 py-6 text-center text-xs text-muted-foreground">
      <div class="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 max-w-6xl">
        <p>HL App Builder &bull; Vue 3 &bull; TypeScript &bull; ShadCN UI &bull; Firebase</p>
        <p class="font-mono">Ready for development</p>
      </div>
    </footer>
  </div>
</template>
