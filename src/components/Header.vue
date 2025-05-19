<script setup lang="ts">
import ModeToggle from '@/components/ModeToggle.vue'
import { Button } from '@/components/ui/button'

function openGitHub() {
  window.open('https://github.com/gokh4nozturk/gauge?ref=gauge-component', '_blank')
}
</script>
<template>
  <header
    class="p-4 h-52 text-muted-foreground container mx-auto bg-gradient-to-b rounded-lg from-[#f9f9f9] to-[#e2e8f0] dark:from-[#1c1917] dark:to-[#111827]"
  >
    <div class="flex justify-between h-full">
      <div class="grid grid-rows-[1fr_auto] gap-4">
        <div class="flex flex-col gap-2">
          <h1 class="text-2xl font-bold text-foreground">Gauge</h1>
          <p>A simple and customizable circular gauge component for Vue 3.</p>
        </div>
        <div class="flex flex-col gap-2">
          <p class="text-sm"><span class="font-bold">Version:</span> 0.0.1</p>
          <p class="text-sm"><span class="font-bold">License:</span> MIT</p>
          <p class="text-sm">
            <span class="font-bold">Credits:</span>
            <a href="https://gauge.onur.dev" target="_blank"> Onur Şuyalçınkaya</a>
          </p>
        </div>
      </div>
      <div class="flex items-end flex-col gap-2">
        <ModeToggle />
        <div class="flex flex-col items-end">
          <Button variant="link" class="text-sm p-0" @click="openGitHub"> View on GitHub </Button>
          <Button variant="link" class="text-sm p-0" as-child>
            <RouterLink to="#playground"> Playground </RouterLink>
          </Button>
        </div>
      </div>
    </div>
  </header>
</template>
