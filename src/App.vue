<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Toaster } from '@/components/ui/sonner'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import SEO from '@/components/SEO.vue'
import { Analytics } from '@vercel/analytics/vue'
</script>

<template>
  <SEO />
  <Toaster />
  <Header />
  <RouterView />
  <Footer />
  <Analytics />
</template>
