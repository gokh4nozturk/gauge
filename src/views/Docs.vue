<script setup lang="ts">
import { ref, watch } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import CodeBlock from '@/components/ui/CodeBlock.vue'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Check, Copy } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { AnimatePresence, motion } from 'motion-v'
import { toast } from 'vue-sonner'

const title = 'Gauge Documentation'
const copiedBasicUsage = ref(false)
const copiedCustomExample = ref(false)

const basicUsageCode = `<script setup lang="ts">
import { Gauge } from '@/components/Gauge'
<\/script>

<template>
  <Gauge :value="75" />
</template>`

const customExampleCode = `<script setup lang="ts">
import { Gauge } from '@/components/Gauge'
<\/script>

<template>
  <Gauge
    :value="42"
    size="xl"
    :strokeWidth="15"
    :showValue="true"
    :showAnimation="true"
  />
</template>`

const api = [
  {
    property: 'value*',
    description: 'The value of the Gauge.',
    default: '0',
  },
  {
    property: 'size',
    description: 'The size of the Gauge.',
    default: 'md',
  },
  {
    property: 'gapPercent',
    description:
      'Percentage of the total circumference that represents a gap between primary and secondary arcs.',
    default: '5',
  },
  {
    property: 'strokeWidth',
    description: 'The width of the stroke of the Gauge.',
    default: '10',
  },
  {
    property: 'variant',
    description: 'The variant of the Gauge.',
    default: 'ascending',
  },
  {
    property: 'showValue',
    description: 'Whether to show the value of the Gauge.',
    default: 'false',
  },
  {
    property: 'showAnimation',
    description: 'Whether to show the animation of the Gauge.',
    default: 'false',
  },
  {
    property: 'primary',
    description: 'The primary color of the Gauge.',
    default: '#10b981',
  },
  {
    property: 'secondary',
    description: 'The secondary color of the Gauge.',
    default: '#e5e7eb',
  },
  {
    property: 'props',
    description: 'Any other prop accepted by a Vue SVG element.',
    default: 'null',
  },
]

watch(copiedBasicUsage, (value) => {
  if (value) {
    setTimeout(() => {
      copiedBasicUsage.value = false
    }, 3000)
  }
})

watch(copiedCustomExample, (value) => {
  if (value) {
    setTimeout(() => {
      copiedCustomExample.value = false
    }, 3000)
  }
})

function copyBasicUsage() {
  navigator.clipboard.writeText(basicUsageCode)
  copiedBasicUsage.value = true
  toast.success('Copied to clipboard')
}

function copyCustomExample() {
  navigator.clipboard.writeText(customExampleCode)
  copiedCustomExample.value = true
  toast.success('Copied to clipboard')
}
</script>

<template>
  <main class="space-y-8">
    <section>
      <h1 class="text-3xl font-bold">{{ title }}</h1>

      <p class="mt-2 text-base text-gray-700 dark:text-gray-300">
        The Gauge component only requires the
        <code class="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-800">value</code> prop and
        supports many props to customize it according to your needs.
      </p>
    </section>

    <section>
      <div class="w-full overflow-x-auto">
        <Table class="w-full">
          <TableCaption>Gauge Component Properties</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead class="w-[140px]">Property</TableHead>
              <TableHead>Description</TableHead>
              <TableHead class="w-[120px] text-right">Default</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="prop in api" :key="prop.property">
              <TableCell class="font-medium">{{ prop.property }}</TableCell>
              <TableCell>{{ prop.description }}</TableCell>
              <TableCell class="text-right">
                <code class="rounded bg-gray-100 px-1 py-0.5 text-sm dark:bg-gray-800">
                  {{ prop.default }}
                </code>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>

    <Card>
      <CardHeader>
        <div class="flex items-center justify-between">
          <CardTitle class="text-2xl font-semibold">Basic Usage</CardTitle>
          <Button variant="outline" size="icon" @click="copyBasicUsage">
            <AnimatePresence mode="popLayout">
              <motion.div
                v-if="!copiedBasicUsage"
                key="copy"
                :initial="{ opacity: 0, y: -10 }"
                :animate="{ opacity: 1, y: 0 }"
                :exit="{ opacity: 0, y: -10 }"
                :transition="{ duration: 0.2 }"
              >
                <Copy class="h-4 w-4" />
              </motion.div>
              <motion.div
                v-else
                key="check"
                :initial="{ opacity: 0, y: 10 }"
                :animate="{ opacity: 1, y: 0 }"
                :exit="{ opacity: 0, y: 10 }"
                :transition="{ duration: 0.2 }"
              >
                <Check class="h-4 w-4 text-emerald-500" />
              </motion.div>
            </AnimatePresence>
          </Button>
        </div>
      </CardHeader>
      <Separator />
      <CardContent class="[&_*]:text-foreground rounded-lg">
        <CodeBlock :code="basicUsageCode" language="vue" />
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <div class="flex items-center justify-between">
          <CardTitle class="text-2xl font-semibold">Custom Example</CardTitle>
          <Button variant="outline" size="icon" @click="copyCustomExample">
            <AnimatePresence mode="popLayout">
              <motion.div
                v-if="!copiedCustomExample"
                key="copy"
                :initial="{ opacity: 0, y: -10 }"
                :animate="{ opacity: 1, y: 0 }"
                :exit="{ opacity: 0, y: -10 }"
                :transition="{ duration: 0.2 }"
              >
                <Copy class="h-4 w-4" />
              </motion.div>
              <motion.div
                v-else
                key="check"
                :initial="{ opacity: 0, y: 10 }"
                :animate="{ opacity: 1, y: 0 }"
                :exit="{ opacity: 0, y: 10 }"
                :transition="{ duration: 0.2 }"
              >
                <Check class="h-4 w-4 text-emerald-500" />
              </motion.div>
            </AnimatePresence>
          </Button>
        </div>
      </CardHeader>
      <Separator />
      <CardContent class="[&_*]:text-foreground rounded-lg">
        <CodeBlock :code="customExampleCode" language="vue" />
      </CardContent>
    </Card>
  </main>
</template>
