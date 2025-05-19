<script setup lang="ts">
import { ref } from 'vue'
import Gauge from '@/components/ui/Gauge.vue'
import { Button } from '@/components/ui/button'
import { Card, CardTitle, CardContent, CardDescription } from '@/components/ui/card'

const value = ref(50)
const animating = ref(true)
const animationValue = ref(72)

// Vue.js brand colors
const vueGreen = '#41B883'
const vueDark = '#34495E'

// Playground reactive state
const playgroundConfig = ref({
  value: 72,
  size: 180,
  gapPercent: 10,
  strokeWidth: 8,
  variant: 'ascending' as 'ascending' | 'descending',
  primary: '#41B883',
  secondary: '#e2e8f0',
  showValue: true,
  showAnimation: true,
})

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

function resetPlaygroundAnimation() {
  playgroundConfig.value.value = 0
  setTimeout(() => {
    playgroundConfig.value.value = 72
  }, 1000)
}
</script>

<template>
  <div class="p-6 max-w-7xl mx-auto">
    <h1 class="text-2xl font-semibold mb-6 text-center">Gauge Component Examples</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
      <Card class="p-4 border rounded-lg flex flex-col items-center">
        <CardTitle class="text-lg font-medium mb-4 text-center">Default</CardTitle>
        <CardContent class="flex flex-col items-center text-center">
          <Gauge :value="value" :size="80" />
          <CardDescription class="mt-4 text-sm text-gray-500">
            Basic gauge with default settings
          </CardDescription>
        </CardContent>
      </Card>

      <Card class="p-4 border rounded-lg flex flex-col items-center">
        <CardTitle class="text-lg font-medium mb-4 text-center">With Value Display</CardTitle>
        <CardContent class="flex flex-col items-center text-center">
          <Gauge :value="value" :size="80" :show-value="true" />
          <CardDescription class="mt-4 text-sm text-gray-500">
            Shows the numerical value inside the gauge
          </CardDescription>
        </CardContent>
      </Card>

      <Card class="p-4 border rounded-lg flex flex-col items-center">
        <CardTitle class="text-lg font-medium mb-4 text-center">Different Sizes</CardTitle>
        <CardContent class="flex flex-col items-center text-center">
          <div class="flex items-center space-x-8">
            <div class="flex flex-col items-center">
              <span class="text-sm mb-2">XS</span>
              <Gauge :value="value" size="xs" primary="#e11d48" />
            </div>
            <div class="flex flex-col items-center">
              <span class="text-sm mb-2">SM</span>
              <Gauge :value="value" size="sm" primary="#f59e0b" />
            </div>
            <div class="flex flex-col items-center">
              <span class="text-sm mb-2">MD</span>
              <Gauge :value="value" size="md" primary="#3b82f6" />
            </div>
            <div class="flex flex-col items-center">
              <span class="text-sm mb-2">LG</span>
              <Gauge :value="value" size="lg" primary="#22c55e" />
            </div>
            <div class="flex flex-col items-center">
              <span class="text-sm mb-2">100px</span>
              <Gauge :value="value" :size="100" primary="#8b5cf6" />
            </div>
          </div>
          <CardDescription class="mt-4 text-sm text-gray-500">
            Predefined and custom size options
          </CardDescription>
        </CardContent>
      </Card>

      <Card class="p-4 border rounded-lg flex flex-col items-center">
        <CardTitle class="text-lg font-medium mb-4 text-center">Arc Priority</CardTitle>
        <CardContent class="flex flex-col items-center text-center">
          <div class="flex items-center space-x-4">
            <div class="flex flex-col items-center">
              <span class="text-sm mb-2">48</span>
              <Gauge :value="48" :size="60" :show-value="true" />
            </div>
            <div class="flex flex-col items-center">
              <span class="text-sm mb-2">49</span>
              <Gauge :value="49" :size="60" :show-value="true" />
            </div>
            <div class="flex flex-col items-center">
              <span class="text-sm mb-2">50</span>
              <Gauge :value="50" :size="60" :show-value="true" />
            </div>
            <div class="flex flex-col items-center">
              <span class="text-sm mb-2">51</span>
              <Gauge :value="51" :size="60" :show-value="true" />
            </div>
            <div class="flex flex-col items-center">
              <span class="text-sm mb-2">52</span>
              <Gauge :value="52" :size="60" :show-value="true" />
            </div>
          </div>
          <CardDescription class="mt-4 text-sm text-gray-500">
            Shows precision around the midpoint value
          </CardDescription>
        </CardContent>
      </Card>

      <Card class="p-4 border rounded-lg flex flex-col items-center">
        <CardTitle class="text-lg font-medium mb-4 text-center">Different Variants</CardTitle>
        <CardContent class="flex flex-col items-center text-center">
          <div class="flex items-center justify-center space-x-16 w-full">
            <div class="flex flex-col items-center">
              <span class="text-sm mb-2">Ascending</span>
              <Gauge :value="value" :size="80" variant="ascending" primary="#f59e0b" />
            </div>
            <div class="flex flex-col items-center">
              <span class="text-sm mb-2">Descending</span>
              <Gauge :value="value" :size="80" variant="descending" primary="#f59e0b" />
            </div>
          </div>
          <CardDescription class="mt-4 text-sm text-gray-500">
            Different filling directions for the gauge
          </CardDescription>
        </CardContent>
      </Card>

      <Card class="p-4 border rounded-lg flex flex-col items-center">
        <CardTitle class="text-lg font-medium mb-4 text-center">Vue.js Colors</CardTitle>
        <CardContent class="flex flex-col items-center text-center">
          <div class="flex items-center justify-center space-x-8 w-full">
            <div class="flex flex-col items-center">
              <span class="text-sm mb-2">Vue Green</span>
              <Gauge :value="value" :size="80" :primary="vueGreen" secondary="#dcfce7" />
            </div>
            <div class="flex flex-col items-center">
              <span class="text-sm mb-2">Vue Dark</span>
              <Gauge :value="value" :size="80" :primary="vueDark" secondary="#e2e8f0" />
            </div>
            <div class="flex flex-col items-center">
              <span class="text-sm mb-2">Combined</span>
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

      <Card class="p-4 border rounded-lg flex flex-col items-center">
        <CardTitle class="text-lg font-medium mb-4 text-center">Custom Colors</CardTitle>
        <CardContent class="flex flex-col items-center text-center">
          <div class="flex items-center justify-center space-x-8 w-full">
            <Gauge :value="value" :size="60" primary="#e11d48" secondary="#fee2e2" />
            <Gauge :value="value" :size="60" primary="#3b82f6" secondary="#dbeafe" />
            <Gauge :value="value" :size="60" primary="#22c55e" secondary="#dcfce7" />
          </div>
          <CardDescription class="mt-4 text-sm text-gray-500">
            Customize primary and secondary colors
          </CardDescription>
        </CardContent>
      </Card>

      <Card class="p-4 border rounded-lg flex flex-col items-center">
        <CardTitle class="text-lg font-medium mb-4 text-center">With Animation</CardTitle>
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

      <Card class="p-4 border rounded-lg flex flex-col items-center">
        <CardTitle class="text-lg font-medium mb-4 text-center">Interactive</CardTitle>
        <CardContent class="flex flex-col items-center text-center">
          <div class="flex flex-col items-center space-y-4">
            <Gauge :value="value" :show-value="true" :primary="vueGreen" :size="80" />
            <div class="flex items-center w-full max-w-xs space-x-4">
              <span class="text-sm">Value:</span>
              <input type="range" v-model="value" min="0" max="100" class="w-full" />
              <span class="text-sm w-8">{{ value }}</span>
            </div>
            <Button variant="outline" @click="randomizeValue"> Random Value </Button>
          </div>
          <CardDescription class="mt-4 text-sm text-gray-500">
            Control the gauge value directly
          </CardDescription>
        </CardContent>
      </Card>

      <Card class="p-4 border rounded-lg flex flex-col items-center">
        <CardTitle class="text-lg font-medium mb-4 text-center"
          >Different Gap Percentages</CardTitle
        >
        <CardContent class="flex flex-col items-center text-center">
          <div class="flex items-center justify-center space-x-8 w-full">
            <div class="flex flex-col items-center">
              <span class="text-sm mb-2">5%</span>
              <Gauge :value="value" :size="60" :gap-percent="5" />
            </div>
            <div class="flex flex-col items-center">
              <span class="text-sm mb-2">10%</span>
              <Gauge :value="value" :size="60" :gap-percent="10" />
            </div>
            <div class="flex flex-col items-center">
              <span class="text-sm mb-2">20%</span>
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
    <section class="mt-20 mb-10">
      <h2 class="text-3xl font-bold mb-8 text-center">Playground</h2>
      <p class="text-center text-lg mb-12">Play with the configuration of the Gauge</p>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <!-- Gauge Preview -->
        <Card class="p-6 border rounded-lg flex flex-col items-center col-span-1">
          <div class="mb-6 flex flex-col items-center">
            <Gauge
              :value="playgroundConfig.value"
              :size="playgroundConfig.size"
              :gap-percent="playgroundConfig.gapPercent"
              :stroke-width="playgroundConfig.strokeWidth"
              :variant="playgroundConfig.variant"
              :primary="playgroundConfig.primary"
              :secondary="playgroundConfig.secondary"
              :show-value="playgroundConfig.showValue"
              :show-animation="playgroundConfig.showAnimation"
            />
            <Button class="mt-6" variant="outline" @click="resetPlaygroundAnimation">
              Replay Animation
            </Button>
          </div>
        </Card>

        <!-- Controls -->
        <Card class="p-6 border rounded-lg lg:col-span-2">
          <CardTitle class="text-xl font-semibold mb-6">Gauge Config</CardTitle>
          <CardDescription class="mb-6">Customize your Gauge</CardDescription>

          <div class="space-y-6">
            <!-- Value -->
            <div class="space-y-2">
              <div class="flex justify-between">
                <label class="text-sm font-medium">Value</label>
                <span>{{ playgroundConfig.value }}</span>
              </div>
              <input
                type="range"
                v-model="playgroundConfig.value"
                min="0"
                max="100"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <!-- Size -->
            <div class="space-y-2">
              <div class="flex justify-between">
                <label class="text-sm font-medium">Size</label>
                <span>{{ playgroundConfig.size }}px</span>
              </div>
              <input
                type="range"
                v-model="playgroundConfig.size"
                min="60"
                max="300"
                step="10"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <!-- Gap Percent -->
            <div class="space-y-2">
              <div class="flex justify-between">
                <label class="text-sm font-medium">Gap Percent</label>
                <span>{{ playgroundConfig.gapPercent }}%</span>
              </div>
              <input
                type="range"
                v-model="playgroundConfig.gapPercent"
                min="0"
                max="50"
                step="5"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <!-- Stroke Width -->
            <div class="space-y-2">
              <div class="flex justify-between">
                <label class="text-sm font-medium">Stroke Width</label>
                <span>{{ playgroundConfig.strokeWidth }}px</span>
              </div>
              <input
                type="range"
                v-model="playgroundConfig.strokeWidth"
                min="2"
                max="20"
                step="1"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <!-- Variant -->
            <div class="space-y-2">
              <label class="text-sm font-medium">Variant</label>
              <div class="flex space-x-4">
                <div
                  class="flex items-center justify-center p-2 border rounded-md cursor-pointer"
                  :class="{
                    'bg-blue-50 border-blue-500': playgroundConfig.variant === 'ascending',
                  }"
                  @click="playgroundConfig.variant = 'ascending'"
                >
                  <span>Ascending</span>
                </div>
                <div
                  class="flex items-center justify-center p-2 border rounded-md cursor-pointer"
                  :class="{
                    'bg-blue-50 border-blue-500': playgroundConfig.variant === 'descending',
                  }"
                  @click="playgroundConfig.variant = 'descending'"
                >
                  <span>Descending</span>
                </div>
              </div>
            </div>

            <!-- Colors -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-2">
                <label class="text-sm font-medium">Primary</label>
                <div class="flex items-center space-x-2">
                  <div
                    class="w-6 h-6 rounded-full border"
                    :style="{ backgroundColor: playgroundConfig.primary }"
                  ></div>
                  <input type="color" v-model="playgroundConfig.primary" class="w-full h-10" />
                </div>
              </div>
              <div class="space-y-2">
                <label class="text-sm font-medium">Secondary</label>
                <div class="flex items-center space-x-2">
                  <div
                    class="w-6 h-6 rounded-full border"
                    :style="{ backgroundColor: playgroundConfig.secondary }"
                  ></div>
                  <input type="color" v-model="playgroundConfig.secondary" class="w-full h-10" />
                </div>
              </div>
            </div>

            <!-- Toggle Options -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="flex items-center justify-between space-x-2">
                <label class="text-sm font-medium">Show Value</label>
                <div class="relative inline-block w-12 h-6 cursor-pointer">
                  <input type="checkbox" v-model="playgroundConfig.showValue" class="sr-only" />
                  <div
                    class="block w-full h-full rounded-full transition-all"
                    :class="playgroundConfig.showValue ? 'bg-blue-500' : 'bg-gray-300'"
                  ></div>
                  <div
                    class="absolute w-4 h-4 bg-white rounded-full transition-all transform top-1"
                    :class="playgroundConfig.showValue ? 'right-1' : 'left-1'"
                  ></div>
                </div>
              </div>
              <div class="flex items-center justify-between space-x-2">
                <label class="text-sm font-medium">Show Animation</label>
                <div class="relative inline-block w-12 h-6 cursor-pointer">
                  <input type="checkbox" v-model="playgroundConfig.showAnimation" class="sr-only" />
                  <div
                    class="block w-full h-full rounded-full transition-all"
                    :class="playgroundConfig.showAnimation ? 'bg-blue-500' : 'bg-gray-300'"
                  ></div>
                  <div
                    class="absolute w-4 h-4 bg-white rounded-full transition-all transform top-1"
                    :class="playgroundConfig.showAnimation ? 'right-1' : 'left-1'"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  </div>
</template>
