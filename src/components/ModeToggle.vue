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
          class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
        />
        <Sun
          class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
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
