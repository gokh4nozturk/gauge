<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useSeoMeta, useHead } from '@unhead/vue'

type OgType =
  | 'website'
  | 'article'
  | 'book'
  | 'profile'
  | 'music.song'
  | 'music.album'
  | 'music.playlist'
  | 'music.radio_status'
  | 'video.movie'
  | 'video.episode'
  | 'video.tv_show'
  | 'video.other'

interface Props {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: OgType
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Vue Gauge Component',
  description: 'An aesthetic and customizable circular visual component for Vue.',
  image: '/og-image.png',
  url: 'https://gauge.gokhanozturk.io',
  type: 'website',
})

const route = useRoute()

const pageUrl = computed(() => {
  const baseUrl = props.url.endsWith('/') ? props.url.slice(0, -1) : props.url
  return `${baseUrl}${route?.path || '/'}`
})

useSeoMeta({
  title: props.title,
  ogTitle: props.title,
  twitterTitle: props.title,

  description: props.description,
  ogDescription: props.description,
  twitterDescription: props.description,

  ogImage: props.image,
  twitterImage: props.image,

  ogUrl: pageUrl,
  ogType: props.type,

  twitterCard: 'summary_large_image',
})

// Add canonical URL
useHead({
  link: [
    {
      rel: 'canonical',
      href: pageUrl,
    },
  ],
  // Add structured data for the component
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Vue Gauge Component',
        description: props.description,
        applicationCategory: 'WebApplication',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        operatingSystem: 'Any',
        author: {
          '@type': 'Person',
          name: 'Gökhan Öztürk',
        },
      }),
    },
  ],
})
</script>

<template>
  <!-- This component doesn't render anything -->
</template>
