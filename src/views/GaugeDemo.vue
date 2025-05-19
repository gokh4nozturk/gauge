<script setup lang="ts">
import { ref } from 'vue'
import Gauge from '@/components/ui/Gauge.vue'
import { Button } from '@/components/ui/button'
import { Card, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import Playground from '@/components/Playground.vue'

const value = ref(50)
const animating = ref(true)
const animationValue = ref(72)

// Vue.js brand colors
const vueGreen = '#41B883'
const vueDark = '#34495E'

function randomizeValue() {
  value.value = Math.floor(Math.random() * 101)
}

function toggleAnimation() {
  animating.value = !animating.value
}

function resetAnimation() {
  animationValue.value = 0
  setTimeout(() => {
    animationValue.value = 72
  }, 1000)
}
</script>

<template>
  <main class="space-y-10">
    <div class="grid grid-cols-1 gap-10 md:grid-cols-2">
      <Card class="flex flex-col items-center rounded-lg border p-4">
        <CardTitle class="mb-4 text-center text-lg font-medium">Default</CardTitle>
        <CardContent class="flex flex-col items-center text-center">
          <Gauge :value="value" :size="80" />
          <CardDescription class="mt-4 text-sm text-gray-500">
            Basic gauge with default settings
          </CardDescription>
        </CardContent>
      </Card>

      <Card class="flex flex-col items-center rounded-lg border p-4">
        <CardTitle class="mb-4 text-center text-lg font-medium">With Value Display</CardTitle>
        <CardContent class="flex flex-col items-center text-center">
          <Gauge :value="value" :size="80" :show-value="true" />
          <CardDescription class="mt-4 text-sm text-gray-500">
            Shows the numerical value inside the gauge
          </CardDescription>
        </CardContent>
      </Card>

      <Card class="flex flex-col items-center rounded-lg border p-4">
        <CardTitle class="mb-4 text-center text-lg font-medium">Different Sizes</CardTitle>
        <CardContent class="flex flex-col items-center text-center">
          <div class="flex items-center space-x-8">
            <div class="flex flex-col items-center">
              <span class="mb-2 text-sm">XS</span>
              <Gauge :value="value" size="xs" primary="#e11d48" />
            </div>
            <div class="flex flex-col items-center">
              <span class="mb-2 text-sm">SM</span>
              <Gauge :value="value" size="sm" primary="#f59e0b" />
            </div>
            <div class="flex flex-col items-center">
              <span class="mb-2 text-sm">MD</span>
              <Gauge :value="value" size="md" primary="#3b82f6" />
            </div>
            <div class="flex flex-col items-center">
              <span class="mb-2 text-sm">LG</span>
              <Gauge :value="value" size="lg" primary="#22c55e" />
            </div>
          </div>
          <CardDescription class="mt-4 text-sm text-gray-500">
            Predefined and custom size options
          </CardDescription>
        </CardContent>
      </Card>

      <Card class="flex flex-col items-center rounded-lg border p-4">
        <CardTitle class="mb-4 text-center text-lg font-medium">Arc Priority</CardTitle>
        <CardContent class="flex flex-col items-center text-center">
          <div class="flex items-center space-x-4">
            <div class="flex flex-col items-center">
              <span class="mb-2 text-sm">48</span>
              <Gauge :value="48" :size="60" :show-value="true" />
            </div>
            <div class="flex flex-col items-center">
              <span class="mb-2 text-sm">49</span>
              <Gauge :value="49" :size="60" :show-value="true" />
            </div>
            <div class="flex flex-col items-center">
              <span class="mb-2 text-sm">50</span>
              <Gauge :value="50" :size="60" :show-value="true" />
            </div>
            <div class="flex flex-col items-center">
              <span class="mb-2 text-sm">51</span>
              <Gauge :value="51" :size="60" :show-value="true" />
            </div>
            <div class="flex flex-col items-center">
              <span class="mb-2 text-sm">52</span>
              <Gauge :value="52" :size="60" :show-value="true" />
            </div>
          </div>
          <CardDescription class="mt-4 text-sm text-gray-500">
            Shows precision around the midpoint value
          </CardDescription>
        </CardContent>
      </Card>

      <Card class="flex flex-col items-center rounded-lg border p-4">
        <CardTitle class="mb-4 text-center text-lg font-medium">Different Variants</CardTitle>
        <CardContent class="flex flex-col items-center text-center">
          <div class="flex w-full items-center justify-center space-x-16">
            <div class="flex flex-col items-center">
              <span class="mb-2 text-sm">Ascending</span>
              <Gauge :value="value" :size="80" variant="ascending" primary="#f59e0b" />
            </div>
            <div class="flex flex-col items-center">
              <span class="mb-2 text-sm">Descending</span>
              <Gauge :value="value" :size="80" variant="descending" primary="#f59e0b" />
            </div>
          </div>
          <CardDescription class="mt-4 text-sm text-gray-500">
            Different filling directions for the gauge
          </CardDescription>
        </CardContent>
      </Card>

      <Card class="flex flex-col items-center rounded-lg border p-4">
        <CardTitle class="mb-4 text-center text-lg font-medium">Vue.js Colors</CardTitle>
        <CardContent class="flex flex-col items-center text-center">
          <div class="flex w-full items-center justify-center space-x-8">
            <div class="flex flex-col items-center">
              <span class="mb-2 text-sm">Vue Green</span>
              <Gauge :value="value" :size="80" :primary="vueGreen" secondary="#dcfce7" />
            </div>
            <div class="flex flex-col items-center">
              <span class="mb-2 text-sm">Vue Dark</span>
              <Gauge :value="value" :size="80" :primary="vueDark" secondary="#e2e8f0" />
            </div>
            <div class="flex flex-col items-center">
              <span class="mb-2 text-sm">Combined</span>
              <Gauge
                :value="value"
                :size="80"
                :primary="vueGreen"
                :secondary="vueDark"
                :show-value="true"
              />
            </div>
          </div>
          <CardDescription class="mt-4 text-sm text-gray-500">
            Vue.js brand colors as gauge themes
          </CardDescription>
        </CardContent>
      </Card>

      <Card class="flex flex-col items-center rounded-lg border p-4">
        <CardTitle class="mb-4 text-center text-lg font-medium">Custom Colors</CardTitle>
        <CardContent class="flex flex-col items-center text-center">
          <div class="flex w-full items-center justify-center space-x-8">
            <Gauge :value="value" :size="60" primary="#e11d48" secondary="#fee2e2" />
            <Gauge :value="value" :size="60" primary="#3b82f6" secondary="#dbeafe" />
            <Gauge :value="value" :size="60" primary="#22c55e" secondary="#dcfce7" />
          </div>
          <CardDescription class="mt-4 text-sm text-gray-500">
            Customize primary and secondary colors
          </CardDescription>
        </CardContent>
      </Card>

      <Card class="flex flex-col items-center rounded-lg border p-4">
        <CardTitle class="mb-4 text-center text-lg font-medium">With Animation</CardTitle>
        <CardContent class="flex flex-col items-center text-center">
          <div class="flex flex-col items-center space-y-4">
            <Gauge
              :value="animationValue"
              :show-animation="animating"
              :show-value="true"
              :primary="vueGreen"
              :size="80"
            />
            <div class="flex space-x-4">
              <Button variant="outline" @click="toggleAnimation">
                {{ animating ? 'Disable' : 'Enable' }} Animation
              </Button>
              <Button @click="resetAnimation">Replay Animation</Button>
            </div>
          </div>
          <CardDescription class="mt-4 text-sm text-gray-500">
            Animated filling effect with controls
          </CardDescription>
        </CardContent>
      </Card>

      <Card class="flex flex-col items-center rounded-lg border p-4">
        <CardTitle class="mb-4 text-center text-lg font-medium">Interactive</CardTitle>
        <CardContent class="flex flex-col items-center text-center">
          <div class="flex flex-col items-center space-y-4">
            <Gauge :value="value" :show-value="true" :primary="vueGreen" :size="80" />
            <div class="flex w-full max-w-xs items-center space-x-4">
              <span class="text-sm">Value:</span>
              <input type="range" v-model="value" min="0" max="100" class="w-full" />
              <span class="w-8 text-sm">{{ value }}</span>
            </div>
            <Button variant="outline" @click="randomizeValue"> Random Value </Button>
          </div>
          <CardDescription class="mt-4 text-sm text-gray-500">
            Control the gauge value directly
          </CardDescription>
        </CardContent>
      </Card>

      <Card class="flex flex-col items-center rounded-lg border p-4">
        <CardTitle class="mb-4 text-center text-lg font-medium"
          >Different Gap Percentages</CardTitle
        >
        <CardContent class="flex flex-col items-center text-center">
          <div class="flex w-full items-center justify-center space-x-8">
            <div class="flex flex-col items-center">
              <span class="mb-2 text-sm">5%</span>
              <Gauge :value="value" :size="60" :gap-percent="5" />
            </div>
            <div class="flex flex-col items-center">
              <span class="mb-2 text-sm">10%</span>
              <Gauge :value="value" :size="60" :gap-percent="10" />
            </div>
            <div class="flex flex-col items-center">
              <span class="mb-2 text-sm">20%</span>
              <Gauge :value="value" :size="60" :gap-percent="20" />
            </div>
          </div>
          <CardDescription class="mt-4 text-sm text-gray-500">
            Adjust the opening at the bottom of the gauge
          </CardDescription>
        </CardContent>
      </Card>
    </div>

    <!-- Playground Section -->
    <Playground />
  </main>
</template>
