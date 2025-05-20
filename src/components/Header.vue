<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import ModeToggle from '@/components/ModeToggle.vue'
import { Button } from '@/components/ui/button'
import { useRouter } from 'vue-router'
import { Copy, Check } from 'lucide-vue-next'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { AnimatePresence, motion } from 'motion-v'
import { npm, yarn, pnpm, bun } from '@/components/icons'
import { toast } from 'vue-sonner'

const router = useRouter()

const packageManager = ref('npm')
const copied = ref(false)
const packageManagers = {
  npm: 'i vue-circular-gauge',
  yarn: 'add vue-circular-gauge',
  pnpm: 'add vue-circular-gauge',
  bun: 'add vue-circular-gauge',
}

const as = {
  npm,
  yarn,
  pnpm,
  bun,
}

watch(packageManager, (value) => {
  localStorage.setItem('packageManager', value)
})

onMounted(() => {
  const storage = localStorage.getItem('packageManager')
  if (storage) {
    packageManager.value = storage
  } else {
    localStorage.setItem('packageManager', packageManager.value)
  }
})

function openGitHub() {
  window.open('https://github.com/gokh4nozturk/gauge?ref=gauge-component', '_blank')
}

function openDocs() {
  if (router.currentRoute.value.name === 'docs') {
    router.push({ name: 'home' })
  } else {
    router.push({ name: 'docs' })
  }
}

function copy() {
  navigator.clipboard.writeText(
    packageManagers[packageManager.value as keyof typeof packageManagers],
  )
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)

  toast.success('Copied to clipboard')
}
</script>
<template>
  <header
    class="text-muted-foreground mb-10 h-52 rounded-lg bg-gradient-to-b from-[#f9f9f9] to-[#e2e8f0] p-4 dark:from-[#1c1917] dark:to-[#111827]"
  >
    <div class="flex h-full justify-between">
      <div class="grid grid-rows-[1fr_auto] gap-4">
        <div class="flex flex-col gap-2">
          <h1 class="text-foreground text-2xl font-bold">Gauge</h1>
          <p>A simple and customizable circular gauge component for Vue 3.</p>
        </div>
        <div class="flex items-center gap-2">
          <code
            class="bg-background hover:bg-accent hover:text-accent-foreground flex items-center rounded-md border pr-4 text-sm shadow-xs transition-[color,box-shadow] hover:shadow-md"
          >
            <Select v-model="packageManager">
              <SelectTrigger class="border-none shadow-none">
                <SelectValue
                  placeholder="Select a package manager"
                  class="flex items-center shadow-md"
                >
                  <component :is="as[packageManager as keyof typeof as]" />
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="pm in Object.keys(packageManagers)" :key="pm" :value="pm">
                  <div class="flex items-center gap-3">
                    <component :is="as[pm as keyof typeof as]" />
                    {{ pm }}
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            {{ packageManagers[packageManager as keyof typeof packageManagers] }}
          </code>
          <Button
            variant="outline"
            size="icon"
            class="!bg-background hover:!bg-accent p-2"
            @click="copy"
          >
            <AnimatePresence mode="popLayout">
              <motion.div
                v-if="!copied"
                :initial="{ opacity: 0, y: -10 }"
                :animate="{ opacity: 1, y: 0 }"
                :exit="{ opacity: 0, y: -10 }"
                :transition="{ duration: 0.2 }"
              >
                <Copy class="h-4 w-4" />
              </motion.div>
              <motion.div
                v-else
                :initial="{ opacity: 0, y: 10 }"
                :animate="{ opacity: 1, y: 0 }"
                :exit="{ opacity: 0, y: 10 }"
                :transition="{ duration: 0.2 }"
              >
                <Check class="h-4 w-4 text-emerald-500" />
              </motion.div>
            </AnimatePresence>
          </Button>
        </div>
      </div>
      <div class="grid grid-rows-[1fr_auto]">
        <div class="flex justify-end">
          <ModeToggle />
        </div>
        <div class="flex flex-col items-end">
          <Button variant="link" class="p-0 text-sm" @click="openGitHub"> View on GitHub </Button>
          <Button variant="link" class="p-0 text-sm" as-child>
            <RouterLink to="/#playground"> Playground </RouterLink>
          </Button>
          <Button variant="link" class="p-0 text-sm" @click="openDocs">
            {{ router.currentRoute.value.name === 'docs' ? 'Home' : 'Docs' }}
          </Button>
        </div>
      </div>
    </div>
  </header>
</template>
