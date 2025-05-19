<script setup lang="ts">
import { ref, onMounted } from 'vue'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

interface Props {
  code: string
  language?: string
}

const props = defineProps<Props>()
const renderedCode = ref('')

onMounted(() => {
  // Helper function to escape HTML entities
  const escapeHtml = (unsafe: string) => {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
  }

  // Process the code with highlight.js
  try {
    const highlighted = hljs.highlight(props.code, {
      language: props.language || 'vue',
    }).value

    renderedCode.value = `<pre class="hljs"><code>${highlighted}</code></pre>`
  } catch (error) {
    // Fallback if highlighting fails
    renderedCode.value = `<pre class="hljs"><code>${escapeHtml(props.code)}</code></pre>`
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

.code-block :deep(pre) {
  margin: 0;
  padding: 0;
  border-radius: 0.5rem;
  overflow-x: auto;
  background-color: transparent;
  font-size: 0.875rem;
  line-height: 1.5;
}

.code-block :deep(code) {
  font-family:
    ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
    monospace;
}

/* Syntax highlighting customizations */
:deep(.hljs-keyword),
:deep(.hljs-attr) {
  color: #9333ea;
}

:deep(.hljs-string) {
  color: #16a34a;
}

:deep(.hljs-title),
:deep(.hljs-function) {
  color: #2563eb;
}

html.dark :deep(.hljs-keyword),
html.dark :deep(.hljs-attr) {
  color: #c084fc;
}

html.dark :deep(.hljs-string) {
  color: #4ade80;
}

html.dark :deep(.hljs-title),
html.dark :deep(.hljs-function) {
  color: #60a5fa;
}
</style>
