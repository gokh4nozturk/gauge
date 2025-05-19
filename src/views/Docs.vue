<script setup lang="ts">
const title = 'Gauge Documentation'
</script>

<template>
  <main class="p-6 container mx-auto space-y-8">
    <h1 class="text-3xl font-bold">{{ title }}</h1>

    <section>
      <p class="text-lg">
        Gauge is a simple and customizable circular gauge component for Vue 3. The Gauge component
        only requires the <code>value</code> prop and supports many props to customize it according
        to your needs.
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-4">Properties</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th class="px-4 py-2 bg-gray-100 border-b">Property</th>
              <th class="px-4 py-2 bg-gray-100 border-b">Description</th>
              <th class="px-4 py-2 bg-gray-100 border-b">Default</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="px-4 py-2 border-b font-medium">value</td>
              <td class="px-4 py-2 border-b">
                The value of the Gauge. It should be a number between 0 and 100.
              </td>
              <td class="px-4 py-2 border-b">-</td>
            </tr>
            <tr>
              <td class="px-4 py-2 border-b font-medium">size</td>
              <td class="px-4 py-2 border-b">
                Width and height of the Gauge. It can be one of the following sizes: xs, sm, md, lg,
                xl, 2xl, or a numeric value as number or string.
              </td>
              <td class="px-4 py-2 border-b">md</td>
            </tr>
            <tr>
              <td class="px-4 py-2 border-b font-medium">gapPercent</td>
              <td class="px-4 py-2 border-b">
                Percentage of the total circumference that represents a gap between primary and
                secondary arcs.
              </td>
              <td class="px-4 py-2 border-b">5</td>
            </tr>
            <tr>
              <td class="px-4 py-2 border-b font-medium">strokeWidth</td>
              <td class="px-4 py-2 border-b">Stroke width of the Gauge.</td>
              <td class="px-4 py-2 border-b">10</td>
            </tr>
            <tr>
              <td class="px-4 py-2 border-b font-medium">variant</td>
              <td class="px-4 py-2 border-b">Direction of the Gauge's animation.</td>
              <td class="px-4 py-2 border-b">ascending</td>
            </tr>
            <tr>
              <td class="px-4 py-2 border-b font-medium">showValue</td>
              <td class="px-4 py-2 border-b">
                Option to display the numeric value inside the Gauge.
              </td>
              <td class="px-4 py-2 border-b">false</td>
            </tr>
            <tr>
              <td class="px-4 py-2 border-b font-medium">showAnimation</td>
              <td class="px-4 py-2 border-b">Option to animate the Gauge's progress.</td>
              <td class="px-4 py-2 border-b">false</td>
            </tr>
            <tr>
              <td class="px-4 py-2 border-b font-medium">primary</td>
              <td class="px-4 py-2 border-b">
                Primary color or set of colors for the Gauge, with optional threshold values to
                determine color changes. Default primary color scale goes as red (0-25) → amber
                (26-50) → blue (51-75) → green (76-100).
              </td>
              <td class="px-4 py-2 border-b">-</td>
            </tr>
            <tr>
              <td class="px-4 py-2 border-b font-medium">secondary</td>
              <td class="px-4 py-2 border-b">
                Secondary color or set of colors for the Gauge, similar to primary. Default
                secondary color is gray.
              </td>
              <td class="px-4 py-2 border-b">-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-4">Basic Usage</h2>
      <pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto"><code>&lt;template&gt;
  &lt;Gauge :value="75" /&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import { Gauge } from '@/components/Gauge'
&lt;/script&gt;</code></pre>
    </section>

    <section>
      <h2 class="text-2xl font-semibold mb-4">Custom Example</h2>
      <pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto"><code>&lt;template&gt;
  &lt;Gauge
    :value="42"
    size="xl"
    :strokeWidth="15"
    :showValue="true"
    :showAnimation="true"
  /&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import { Gauge } from '@/components/Gauge'
&lt;/script&gt;</code></pre>
    </section>

    <footer class="mt-12 pt-6 border-t border-gray-200 text-sm text-gray-600">
      <p>Inspired by Geist Design System from the Vercel team and by geist-gauge from Ajay.</p>
    </footer>
  </main>
</template>
