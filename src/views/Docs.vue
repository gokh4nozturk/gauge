<script setup lang="ts">
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

const title = 'Gauge Documentation'

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
    default: 'red',
  },
  {
    property: 'secondary',
    description: 'The secondary color of the Gauge.',
    default: 'gray',
  },
  {
    property: 'props',
    description: 'Any other prop accepted by a Vue SVG element.',
    default: 'null',
  },
]
</script>

<template>
  <main class="space-y-8">
    <section>
      <h1 class="text-3xl font-bold">{{ title }}</h1>

      <p class="text-base text-gray-700 dark:text-gray-300 mt-2">
        The Gauge component only requires the
        <code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">value</code> prop and
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
              <TableHead class="text-right w-[120px]">Default</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="prop in api" :key="prop.property">
              <TableCell class="font-medium">{{ prop.property }}</TableCell>
              <TableCell>{{ prop.description }}</TableCell>
              <TableCell class="text-right">
                <code class="text-sm bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">
                  {{ prop.default }}
                </code>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>

    <Card class="mt-12">
      <CardHeader>
        <CardTitle class="text-2xl font-semibold mb-4">Basic Usage</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent class="[&_*]:text-foreground p-4 rounded-lg overflow-x-auto">
        <CodeBlock :code="basicUsageCode" language="vue" />
      </CardContent>
    </Card>

    <Card class="mt-8">
      <CardHeader>
        <CardTitle class="text-2xl font-semibold mb-4">Custom Example</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent class="[&_*]:text-foreground p-4 rounded-lg overflow-x-auto">
        <CodeBlock :code="customExampleCode" language="vue" />
      </CardContent>
    </Card>
  </main>
</template>
