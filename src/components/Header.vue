<script setup lang="ts">
import ModeToggle from '@/components/ModeToggle.vue'
import { Button } from '@/components/ui/button'
import { useRouter } from 'vue-router'

const router = useRouter()

function openGitHub() {
  window.open('https://github.com/gokh4nozturk/gauge?ref=gauge-component', '_blank')
}

function openOnur() {
  window.open('https://gauge.onur.dev?ref=gauge-component', '_blank')
}

function openDocs() {
  if (router.currentRoute.value.name === 'docs') {
    router.push({ name: 'home' })
  } else {
    router.push({ name: 'docs' })
  }
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
