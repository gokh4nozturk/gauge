<script setup lang="ts">
import { motion, useAnimationControls } from 'motion-v'
import { useRouter } from 'vue-router'

const router = useRouter()
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

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  if (router.currentRoute.value.name === 'docs') {
    router.push({ name: 'docs' })
  } else {
    router.push({ name: 'home' })
  }
}

function handleMouseEnter() {
  controls.start('animate')
}

function handleMouseLeave() {
  controls.start('normal')
}
</script>
<template>
  <footer class="bg-background text-muted-foreground relative mt-10 h-44 border-t">
    <div class="flex h-full flex-col items-center justify-center gap-2">
      <p class="text-sm md:text-base">
        © {{ new Date().getFullYear() }} Gauge. All rights reserved.
      </p>
      <Button variant="link" class="p-0 text-xs md:text-sm" as-child>
        Made with ❤️ by
        <a href="https://github.com/gokh4nozturk?ref=vue-circular-gauge" target="_blank"
          >gokh4nozturk</a
        >
      </Button>
    </div>
    <button
      class="bg-accent hover:bg-accent/80 absolute top-1/2 right-2 -translate-y-1/2 rounded-full p-2 transition-colors md:right-0"
      @click="scrollToTop"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <!-- https://icons.pqoqubbw.dev/?q=arrowup -->
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
        <!-- <title>Arrow Up</title> -->
        <motion.path d="m5 12 7-7 7 7" :variants="pathVariants" :animate="controls" />
        <motion.path d="M12 19V5" :variants="secondPathVariants" :animate="controls" />
      </svg>
    </button>
  </footer>
</template>
