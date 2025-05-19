<script setup lang="ts">
import { ref, reactive } from 'vue'
import GaugeSetup from './components/GaugeSetup.vue'
import { Button } from '@/components/ui/button'

const interactiveValue = ref(50)
const animatedGauge = reactive({
  value: 80,
  showAnimation: true,
})

function replayAnimation() {
  // Reset the animation by temporarily setting the value to 0
  // and then back to the original value
  const originalValue = animatedGauge.value
  animatedGauge.value = 0

  setTimeout(() => {
    animatedGauge.value = originalValue
  }, 50)
}
</script>

<template>
  <div class="max-w-[900px] mx-auto p-5 rounded-lg shadow-sm">
    <h1 class="text-center mb-10">Gauge Component Examples</h1>

    <div class="mb-10 p-5 bg-background/80 rounded-lg">
      <h2 class="mt-0 border-b pb-2">Default</h2>
      <div class="flex flex-wrap gap-5 items-center justify-center mt-5">
        <GaugeSetup :value="42" />
      </div>
    </div>

    <div class="mb-10 p-5 bg-background/80 rounded-lg">
      <h2 class="mt-0 border-b pb-2">With Value Display</h2>
      <div class="flex flex-wrap gap-5 items-center justify-center mt-5">
        <GaugeSetup :value="75" :show-value="true" />
      </div>
    </div>

    <div class="mb-10 p-5 bg-background/80 rounded-lg">
      <h2 class="mt-0 border-b pb-2">Different Sizes</h2>
      <div class="flex flex-wrap gap-5 items-center justify-center mt-5">
        <GaugeSetup :value="20" size="xs" />
        <GaugeSetup :value="40" size="sm" />
        <GaugeSetup :value="60" size="md" />
        <GaugeSetup :value="80" size="lg" />
      </div>
    </div>

    <div class="mb-10 p-5 bg-background/80 rounded-lg">
      <h2 class="mt-0 border-b pb-2">Different Variants</h2>
      <div class="flex flex-wrap gap-5 items-center justify-center mt-5">
        <div class="flex flex-col items-center text-center">
          <p class="mt-0 mb-2.5 font-medium">Ascending</p>
          <GaugeSetup :value="30" variant="ascending" :show-value="true" />
        </div>
        <div class="flex flex-col items-center text-center">
          <p class="mt-0 mb-2.5 font-medium">Descending</p>
          <GaugeSetup :value="30" variant="descending" :show-value="true" />
        </div>
      </div>
    </div>

    <div class="mb-10 p-5 bg-background/80 rounded-lg">
      <h2 class="mt-0 border-b pb-2">Custom Colors</h2>
      <div class="flex flex-wrap gap-5 items-center justify-center mt-5">
        <GaugeSetup :value="25" primary="#ff5733" secondary="#f2f2f2" :show-value="true" />
        <GaugeSetup :value="50" primary="#33a8ff" secondary="#f2f2f2" :show-value="true" />
        <GaugeSetup :value="75" primary="#33ff57" secondary="#f2f2f2" :show-value="true" />
      </div>
    </div>

    <div class="mb-10 p-5 bg-background/80 rounded-lg">
      <h2 class="mt-0 border-b pb-2">With Animation</h2>
      <div class="flex flex-wrap gap-5 items-center justify-center mt-5">
        <GaugeSetup
          :value="animatedGauge.value"
          :show-animation="animatedGauge.showAnimation"
          :show-value="true"
          size="lg"
        />
        <Button @click="replayAnimation"> Replay Animation </Button>
      </div>
    </div>

    <div class="mb-10 p-5 bg-background/80 rounded-lg">
      <h2 class="mt-0 border-b pb-2">Interactive</h2>
      <div class="flex flex-wrap gap-5 items-center justify-center mt-5">
        <GaugeSetup :value="interactiveValue" :show-value="true" size="lg" />
        <div class="flex flex-col items-center mt-2.5 gap-2">
          <input
            type="range"
            min="0"
            max="100"
            v-model.number="interactiveValue"
            class="w-[200px]"
          />
          <span>{{ interactiveValue }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
