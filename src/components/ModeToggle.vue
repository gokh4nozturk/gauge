<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Moon, Sun } from 'lucide-vue-next'
import { useColorMode } from '@vueuse/core'

// Pass { disableTransition: false } to enable transitions
const mode = useColorMode()

function toggleMode(t: 'light' | 'dark' | 'auto') {
  if (document.startViewTransition) {
    document.startViewTransition(() => {
      mode.value = t
    })
  } else {
    mode.value = t
  }
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline" size="icon">
        <Moon
          class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        />
        <Sun
          class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        />
        <span class="sr-only">Toggle theme</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="toggleMode('light')"> Light </DropdownMenuItem>
      <DropdownMenuItem @click="toggleMode('dark')"> Dark </DropdownMenuItem>
      <DropdownMenuItem @click="toggleMode('auto')"> System </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
