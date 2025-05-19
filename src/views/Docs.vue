<script setup lang="ts">
import CodeBlock from '@/components/ui/CodeBlock.vue'
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
</script>

<template>
  <main class="space-y-8">
    <h1 class="text-3xl font-bold">{{ title }}</h1>

    <section>
      <p class="text-lg text-gray-700 my-6">
        The Gauge component only requires the
        <code class="bg-gray-100 px-1 py-0.5 rounded">value</code> prop and supports many props to
        customize it according to your needs.
      </p>
    </section>

    <section>
      <div class="overflow-x-auto">
        <Table>
          <TableCaption>Gauge Component Properties</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Property</TableHead>
              <TableHead>Description</TableHead>
              <TableHead class="text-right">Default</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell class="font-medium">value</TableCell>
              <TableCell>
                The value of the Gauge. It should be a number between 0 and 100.
              </TableCell>
              <TableCell class="text-right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell class="font-medium">size</TableCell>
              <TableCell>
                Width and height of the Gauge. It can be one of the following sizes:
                <code class="bg-gray-100 px-1 py-0.5 rounded">xs</code>,
                <code class="bg-gray-100 px-1 py-0.5 rounded">sm</code>,
                <code class="bg-gray-100 px-1 py-0.5 rounded">md</code>,
                <code class="bg-gray-100 px-1 py-0.5 rounded">lg</code>,
                <code class="bg-gray-100 px-1 py-0.5 rounded">xl</code>,
                <code class="bg-gray-100 px-1 py-0.5 rounded">2xl</code>, or a numeric value as
                <code class="bg-gray-100 px-1 py-0.5 rounded">number</code> or
                <code class="bg-gray-100 px-1 py-0.5 rounded">string</code>.
              </TableCell>
              <TableCell class="text-right">
                <span class="bg-gray-100 px-2 py-1 rounded">md</span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell class="font-medium">gapPercent</TableCell>
              <TableCell>
                Percentage of the total circumference that represents a gap between primary and
                secondary arcs.
              </TableCell>
              <TableCell class="text-right">
                <span class="bg-gray-100 px-2 py-1 rounded">5</span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell class="font-medium">strokeWidth</TableCell>
              <TableCell>Stroke width of the Gauge.</TableCell>
              <TableCell class="text-right">
                <span class="bg-gray-100 px-2 py-1 rounded">10</span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell class="font-medium">variant</TableCell>
              <TableCell>Direction of the Gauge's animation.</TableCell>
              <TableCell class="text-right">
                <span class="bg-gray-100 px-2 py-1 rounded">ascending</span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell class="font-medium">showValue</TableCell>
              <TableCell> Option to display the numeric value inside the Gauge. </TableCell>
              <TableCell class="text-right">
                <span class="bg-gray-100 px-2 py-1 rounded">false</span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell class="font-medium">showAnimation</TableCell>
              <TableCell> Option to animate the Gauge's progress. </TableCell>
              <TableCell class="text-right">
                <span class="bg-gray-100 px-2 py-1 rounded">false</span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell class="font-medium">primary</TableCell>
              <TableCell>
                Primary color or set of colors for the Gauge, with optional threshold values to
                determine color changes. Default primary color scale goes as
                <span class="inline-flex items-center">
                  <span class="w-4 h-4 inline-block bg-red-500 rounded-full mr-1"></span> red (0-25)
                </span>
                →
                <span class="inline-flex items-center">
                  <span class="w-4 h-4 inline-block bg-amber-500 rounded-full mr-1"></span> amber
                  (26-50)
                </span>
                →
                <span class="inline-flex items-center">
                  <span class="w-4 h-4 inline-block bg-blue-500 rounded-full mr-1"></span> blue
                  (51-75)
                </span>
                →
                <span class="inline-flex items-center">
                  <span class="w-4 h-4 inline-block bg-green-500 rounded-full mr-1"></span> green
                  (76-100) </span
                >.
              </TableCell>
              <TableCell class="text-right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell class="font-medium">secondary</TableCell>
              <TableCell>
                Secondary color or set of colors for the Gauge, similar to
                <code class="bg-gray-100 px-1 py-0.5 rounded">primary</code>. Default secondary
                color is gray.
              </TableCell>
              <TableCell class="text-right">
                <span class="w-4 h-4 inline-block bg-gray-200 rounded-full"></span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell class="font-medium">props</TableCell>
              <TableCell> Any other prop accepted by a Vue SVG element. </TableCell>
              <TableCell class="text-right"></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </section>

    <section class="mt-12">
      <h2 class="text-2xl font-semibold mb-4">Basic Usage</h2>
      <div class="bg-gray-100 dark:bg-gray-300 p-4 rounded-lg overflow-x-auto">
        <CodeBlock :code="basicUsageCode" language="vue" />
      </div>
    </section>

    <section class="mt-8">
      <h2 class="text-2xl font-semibold mb-4">Custom Example</h2>
      <div class="bg-gray-100 dark:bg-gray-300 p-4 rounded-lg overflow-x-auto">
        <CodeBlock :code="customExampleCode" language="vue" />
      </div>
    </section>
  </main>
</template>
