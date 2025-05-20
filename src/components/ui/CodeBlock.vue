<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { codeToHtml } from 'shiki'

interface Props {
  code: string
  language?: string
}

const props = defineProps<Props>()
const renderedCode = ref('')
const isDarkMode = ref(document.documentElement.classList.contains('dark'))

// Function to render code with Shiki
async function renderCode() {
  try {
    renderedCode.value = await codeToHtml(props.code, {
      lang: props.language || 'vue',
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      defaultColor: isDarkMode.value ? 'dark' : 'light',
    })
  } catch (error) {
    console.error('Syntax highlighting error:', error)
    // Fallback if highlighting fails
    renderedCode.value = `<pre class="shiki"><code>${escapeHTML(props.code)}</code></pre>`
  }
}

// Helper function to escape HTML entities
const escapeHTML = (unsafe: string) => {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// Watch for dark mode changes
watch(
  () => document.documentElement.classList.contains('dark'),
  (isDark) => {
    isDarkMode.value = isDark
    renderCode()
  },
)

onMounted(() => {
  // Set up MutationObserver to detect theme changes
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.attributeName === 'class') {
        isDarkMode.value = document.documentElement.classList.contains('dark')
        renderCode()
        break
      }
    }
  })

  observer.observe(document.documentElement, { attributes: true })

  // Initial render
  renderCode()

  // Cleanup observer on component unmount
  return () => {
    observer.disconnect()
  }
})
</script>

<template>
  <div class="code-block" v-html="renderedCode"></div>
</template>

<style scoped>
.code-block {
  border-radius: 0.5rem;
  overflow: hidden;
}

.code-block :deep(pre.shiki) {
  margin: 0;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  font-size: 0.875rem;
  line-height: 1.5;
}

.code-block :deep(code) {
  font-family:
    ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
    monospace;
}
</style>
