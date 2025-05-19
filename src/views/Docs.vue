<script setup lang="ts">
const title = 'Gauge Documentation'
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
        <table class="min-w-full border-collapse">
          <thead>
            <tr class="border-b">
              <th class="py-3 px-4 text-left font-medium text-gray-700">Property</th>
              <th class="py-3 px-4 text-left font-medium text-gray-700">Description</th>
              <th class="py-3 px-4 text-right font-medium text-gray-700">Default</th>
            </tr>
          </thead>
          <tbody class="divide-y">
            <tr class="hover:bg-gray-50">
              <td class="py-4 px-4 align-top font-medium">value</td>
              <td class="py-4 px-4 align-top text-gray-700">
                The value of the Gauge. It should be a number between 0 and 100.
              </td>
              <td class="py-4 px-4 text-right align-top"></td>
            </tr>
            <tr class="hover:bg-gray-50">
              <td class="py-4 px-4 align-top font-medium">size</td>
              <td class="py-4 px-4 align-top text-gray-700">
                Width and height of the Gauge. It can be one of the following sizes:
                <code class="bg-gray-100 px-1 py-0.5 rounded">xs</code>,
                <code class="bg-gray-100 px-1 py-0.5 rounded">sm</code>,
                <code class="bg-gray-100 px-1 py-0.5 rounded">md</code>,
                <code class="bg-gray-100 px-1 py-0.5 rounded">lg</code>,
                <code class="bg-gray-100 px-1 py-0.5 rounded">xl</code>,
                <code class="bg-gray-100 px-1 py-0.5 rounded">2xl</code>, or a numeric value as
                <code class="bg-gray-100 px-1 py-0.5 rounded">number</code> or
                <code class="bg-gray-100 px-1 py-0.5 rounded">string</code>.
              </td>
              <td class="py-4 px-4 text-right align-top">
                <span class="bg-gray-100 px-2 py-1 rounded">md</span>
              </td>
            </tr>
            <tr class="hover:bg-gray-50">
              <td class="py-4 px-4 align-top font-medium">gapPercent</td>
              <td class="py-4 px-4 align-top text-gray-700">
                Percentage of the total circumference that represents a gap between primary and
                secondary arcs.
              </td>
              <td class="py-4 px-4 text-right align-top">
                <span class="bg-gray-100 px-2 py-1 rounded">5</span>
              </td>
            </tr>
            <tr class="hover:bg-gray-50">
              <td class="py-4 px-4 align-top font-medium">strokeWidth</td>
              <td class="py-4 px-4 align-top text-gray-700">Stroke width of the Gauge.</td>
              <td class="py-4 px-4 text-right align-top">
                <span class="bg-gray-100 px-2 py-1 rounded">10</span>
              </td>
            </tr>
            <tr class="hover:bg-gray-50">
              <td class="py-4 px-4 align-top font-medium">variant</td>
              <td class="py-4 px-4 align-top text-gray-700">Direction of the Gauge's animation.</td>
              <td class="py-4 px-4 text-right align-top">
                <span class="bg-gray-100 px-2 py-1 rounded">ascending</span>
              </td>
            </tr>
            <tr class="hover:bg-gray-50">
              <td class="py-4 px-4 align-top font-medium">showValue</td>
              <td class="py-4 px-4 align-top text-gray-700">
                Option to display the numeric value inside the Gauge.
              </td>
              <td class="py-4 px-4 text-right align-top">
                <span class="bg-gray-100 px-2 py-1 rounded">false</span>
              </td>
            </tr>
            <tr class="hover:bg-gray-50">
              <td class="py-4 px-4 align-top font-medium">showAnimation</td>
              <td class="py-4 px-4 align-top text-gray-700">
                Option to animate the Gauge's progress.
              </td>
              <td class="py-4 px-4 text-right align-top">
                <span class="bg-gray-100 px-2 py-1 rounded">false</span>
              </td>
            </tr>
            <tr class="hover:bg-gray-50">
              <td class="py-4 px-4 align-top font-medium">primary</td>
              <td class="py-4 px-4 align-top text-gray-700">
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
              </td>
              <td class="py-4 px-4 text-right align-top"></td>
            </tr>
            <tr class="hover:bg-gray-50">
              <td class="py-4 px-4 align-top font-medium">secondary</td>
              <td class="py-4 px-4 align-top text-gray-700">
                Secondary color or set of colors for the Gauge, similar to
                <code class="bg-gray-100 px-1 py-0.5 rounded">primary</code>. Default secondary
                color is gray.
              </td>
              <td class="py-4 px-4 text-right align-top">
                <span class="w-4 h-4 inline-block bg-gray-200 rounded-full"></span>
              </td>
            </tr>
            <tr class="hover:bg-gray-50">
              <td class="py-4 px-4 align-top font-medium">props</td>
              <td class="py-4 px-4 align-top text-gray-700">
                Any other prop accepted by a Vue SVG element.
              </td>
              <td class="py-4 px-4 text-right align-top"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="mt-12">
      <h2 class="text-2xl font-semibold mb-4">Basic Usage</h2>
      <pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm"><code>&lt;template&gt;
  &lt;Gauge :value="75" /&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import { Gauge } from '@/components/Gauge'
&lt;/script&gt;</code></pre>
    </section>

    <section class="mt-8">
      <h2 class="text-2xl font-semibold mb-4">Custom Example</h2>
      <pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm"><code>&lt;template&gt;
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

    <footer class="mt-16 pt-6 border-t border-gray-200 text-sm text-gray-600">
      <p>Made with ❤️</p>
      <p class="mt-1">
        Inspired by Geist Design System from the Vercel team and by geist-gauge from Ajay.
      </p>
    </footer>
  </main>
</template>
