<script setup lang="ts">
import { motion, useAnimationControls } from 'motion-v'

const controls = useAnimationControls()

const pathVariants = {
  normal: { d: 'm5 12 7-7 7 7', translateY: 0 },
  animate: {
    d: 'm5 12 7-7 7 7',
    translateY: [0, 3, 0],
    transition: {
      duration: 0.4,
    },
  },
}

const secondPathVariants = {
  normal: { d: 'M12 19V5' },
  animate: {
    d: ['M12 19V5', 'M12 19V10', 'M12 19V5'],
    transition: {
      duration: 0.4,
    },
  },
}

function openGitHub() {
  window.open('https://github.com/gokh4nozturk?ref=gauge-component', '_blank')
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function handleMouseEnter() {
  controls.start('animate')
}

function handleMouseLeave() {
  controls.start('normal')
}
</script>
<template>
  <footer class="bg-background h-44 text-muted-foreground container mx-auto relative">
    <div class="flex flex-col justify-center items-center h-full gap-2">
      <p>© {{ new Date().getFullYear() }} Gauge. All rights reserved.</p>
      <Button variant="link" class="text-sm p-0" @click="openGitHub">
        Made with ❤️ by <a href="https://github.com/gokh4nozturk" target="_blank">Gökhan Öztürk</a>
      </Button>
    </div>
    <button
      class="absolute top-1/2 -translate-y-1/2 right-0 bg-accent rounded-full p-2 hover:bg-accent/80 transition-colors"
      @click="scrollToTop"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-arrow-up-icon lucide-arrow-up"
      >
        <title>Arrow Up</title>
        <motion.path d="m5 12 7-7 7 7" :variants="pathVariants" :animate="controls" />
        <motion.path d="M12 19V5" :variants="secondPathVariants" :animate="controls" />
      </svg>
    </button>
  </footer>
</template>
