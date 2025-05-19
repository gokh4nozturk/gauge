<script setup lang="ts">
import { ref } from 'vue'
import Gauge from './Gauge.vue'
import Button from './button/Button.vue'

const value = ref(50)
const animating = ref(true)
const animationValue = ref(72)

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
  }, 100)
}
</script>

<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-2xl font-semibold mb-6">Gauge Component Examples</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div class="p-4 border rounded-lg flex flex-col items-center">
        <h2 class="text-lg font-medium mb-4">Default</h2>
        <Gauge :value="value" :size="80" />
      </div>

      <div class="p-4 border rounded-lg flex flex-col items-center">
        <h2 class="text-lg font-medium mb-4">With Value Display</h2>
        <Gauge :value="value" :size="80" :show-value="true" />
      </div>

      <div class="p-4 border rounded-lg flex flex-col items-center">
        <h2 class="text-lg font-medium mb-4">Different Sizes</h2>
        <div class="flex items-center space-x-8">
          <Gauge :value="value" size="xs" primary="#e11d48" />
          <Gauge :value="value" size="sm" primary="#f59e0b" />
          <Gauge :value="value" size="md" primary="#3b82f6" />
          <Gauge :value="value" size="lg" primary="#22c55e" />
          <Gauge :value="value" :size="100" primary="#8b5cf6" />
        </div>
      </div>

      <div class="p-4 border rounded-lg flex flex-col items-center">
        <h2 class="text-lg font-medium mb-4">Arc Priority</h2>
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
      </div>

      <div class="p-4 border rounded-lg flex flex-col items-center">
        <h2 class="text-lg font-medium mb-4">Different Variants</h2>
        <div class="flex items-center space-x-16">
          <div class="flex flex-col items-center">
            <span class="text-sm mb-2">Ascending</span>
            <Gauge :value="value" :size="80" variant="ascending" primary="#f59e0b" />
          </div>
          <div class="flex flex-col items-center">
            <span class="text-sm mb-2">Descending</span>
            <Gauge :value="value" :size="80" variant="descending" primary="#f59e0b" />
          </div>
        </div>
      </div>

      <div class="p-4 border rounded-lg flex flex-col items-center">
        <h2 class="text-lg font-medium mb-4">Custom Colors</h2>
        <div class="flex items-center space-x-8">
          <Gauge :value="value" :size="60" primary="#e11d48" secondary="#fee2e2" />
          <Gauge :value="value" :size="60" primary="#3b82f6" secondary="#dbeafe" />
          <Gauge :value="value" :size="60" primary="#22c55e" secondary="#dcfce7" />
        </div>
      </div>

      <div class="p-4 border rounded-lg flex flex-col items-center">
        <h2 class="text-lg font-medium mb-4">With Animation</h2>
        <div class="flex flex-col items-center space-y-4">
          <Gauge
            :value="animationValue"
            :show-animation="animating"
            :show-value="true"
            primary="#22c55e"
            :size="80"
          />
          <div class="flex space-x-4">
            <Button @click="toggleAnimation">
              {{ animating ? 'Disable' : 'Enable' }} Animation
            </Button>
            <Button @click="resetAnimation"> Replay Animation </Button>
          </div>
        </div>
      </div>

      <div class="p-4 border rounded-lg flex flex-col items-center">
        <h2 class="text-lg font-medium mb-4">Interactive</h2>
        <div class="flex flex-col items-center space-y-4">
          <Gauge :value="value" :show-value="true" primary="#f59e0b" :size="80" />
          <div class="flex items-center w-full max-w-xs space-x-4">
            <span class="text-sm">Value:</span>
            <input type="range" v-model="value" min="0" max="100" class="w-full" />
            <span class="text-sm w-8">{{ value }}</span>
          </div>
          <button
            class="px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-700 transition-colors"
            @click="randomizeValue"
          >
            Random Value
          </button>
        </div>
      </div>

      <div class="p-4 border rounded-lg flex flex-col items-center">
        <h2 class="text-lg font-medium mb-4">Different Gap Percentages</h2>
        <div class="flex items-center space-x-8">
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
      </div>
    </div>
  </div>
</template>
