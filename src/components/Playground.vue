<script setup lang="ts">
import { ref, watch } from 'vue'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from '@/components/ui/card'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Copy, RotateCw } from 'lucide-vue-next'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'vue-sonner'
import { useReplayAnimation, easings } from '@/composables/useReplayAnimation'

const initialGaugeValue = 72
// Internal value for manual input
const manualInputValue = ref(initialGaugeValue)

// Playground reactive state
const playgroundConfig = ref({
  size: 180,
  gapPercent: 5,
  strokeWidth: 8,
  variant: 'ascending' as 'ascending' | 'descending',
  primary: '#41B883',
  secondary: '#e2e8f0',
  showValue: true,
  showAnimation: true,
})

// Use the animation composable
const {
  value: gaugeValue,
  isAnimating,
  replay: replayAnimation,
  setTargetValue,
} = useReplayAnimation({
  initialValue: initialGaugeValue,
  startValue: 0,
  duration: 2000,
  easing: easings.easeOutQuad,
})

// Sync manual value to gauge target value
watch(manualInputValue, (newValue) => {
  setTargetValue(newValue)
})

// Sync gauge value back to manual input when it changes
watch(gaugeValue, (newValue) => {
  if (!isAnimating.value) {
    manualInputValue.value = newValue
  }
})

function copyConfig() {
  const componentCode = `
  <Gauge
    :value="${gaugeValue.value}"
    :size="${playgroundConfig.value.size}"
    :gap-percent="${playgroundConfig.value.gapPercent}"
    :stroke-width="${playgroundConfig.value.strokeWidth}"
    variant="${playgroundConfig.value.variant}"
    primary="${playgroundConfig.value.primary}"
    secondary="${playgroundConfig.value.secondary}"
    :show-value="${playgroundConfig.value.showValue}"
    :show-animation="${playgroundConfig.value.showAnimation}"
  />`

  navigator.clipboard.writeText(componentCode)
  toast.success('Ready-to-use Gauge component has been copied to clipboard')
}
</script>
<template>
  <section class="mt-20 border-t pt-8" id="playground">
    <h2 class="mb-4 text-center text-3xl font-bold">Playground</h2>
    <p class="text-muted-foreground mb-6 text-center text-lg">
      Play with the configuration of the Gauge
    </p>

    <div class="grid grid-cols-1 gap-10 lg:grid-cols-2">
      <!-- Gauge Preview -->
      <Card class="col-span-1 grid grid-rows-[1fr_auto] place-items-center rounded-lg border p-6">
        <CardContent>
          <Gauge
            :value="gaugeValue"
            :size="playgroundConfig.size"
            :gap-percent="playgroundConfig.gapPercent"
            :stroke-width="playgroundConfig.strokeWidth"
            :variant="playgroundConfig.variant"
            :primary="playgroundConfig.primary"
            :secondary="playgroundConfig.secondary"
            :show-value="playgroundConfig.showValue"
            :show-animation="playgroundConfig.showAnimation"
          />
        </CardContent>
        <CardFooter class="w-full">
          <Button class="w-full" variant="outline" @click="replayAnimation" :disabled="isAnimating">
            <RotateCw class="mr-2 h-4 w-4" :class="{ 'animate-spin': isAnimating }" />
            {{ isAnimating ? 'Animating...' : 'Replay Animation' }}
          </Button>
        </CardFooter>
      </Card>

      <!-- Controls -->
      <Card class="rounded-lg border p-6 lg:col-span-1">
        <CardTitle class="text-xl font-semibold">Gauge Config</CardTitle>
        <CardDescription>Customize your Gauge</CardDescription>

        <div class="space-y-6">
          <!-- Toggle Options -->
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div class="items-top flex gap-x-2">
              <Checkbox id="showValue" v-model="playgroundConfig.showValue" />
              <div class="grid gap-1.5 leading-none">
                <Label for="showValue"> Show Value </Label>
              </div>
            </div>
            <div class="items-top flex gap-x-2">
              <Checkbox id="showAnimation" v-model="playgroundConfig.showAnimation" />
              <div class="grid gap-1.5 leading-none">
                <Label for="showAnimation"> Show Animation </Label>
              </div>
            </div>
          </div>
          <!-- Value -->
          <div class="space-y-2">
            <Label>Value</Label>
            <Input type="number" v-model="manualInputValue" min="0" max="100" />
          </div>

          <!-- Size -->
          <div class="space-y-2">
            <Label>Size</Label>
            <Select v-model="playgroundConfig.size">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Select a size" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem :value="60"> 60 </SelectItem>
                  <SelectItem :value="120"> 120 </SelectItem>
                  <SelectItem :value="180"> 180 </SelectItem>
                  <SelectItem :value="240"> 240 </SelectItem>
                  <SelectItem :value="300"> 300 </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <!-- Gap Percent -->
          <div class="space-y-2">
            <Label>Gap Percent</Label>

            <Input type="number" v-model="playgroundConfig.gapPercent" min="5" max="20" step="5" />
          </div>

          <!-- Stroke Width -->
          <div class="space-y-2">
            <Label>Stroke Width</Label>
            <Input type="number" v-model="playgroundConfig.strokeWidth" min="2" step="1" />
          </div>

          <!-- Variant -->
          <div class="space-y-2">
            <Label>Variant</Label>
            <ToggleGroup type="single" variant="outline" v-model="playgroundConfig.variant">
              <ToggleGroupItem value="ascending" aria-label="Toggle ascending">
                <span>Ascending</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="descending" aria-label="Toggle descending">
                <span>Descending</span>
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <!-- Colors -->
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div class="space-y-2">
              <Label>Primary</Label>
              <div class="flex items-center space-x-2">
                <Input type="color" v-model="playgroundConfig.primary" class="h-10 w-full" />
              </div>
            </div>
            <div class="space-y-2">
              <Label>Secondary</Label>
              <div class="flex items-center space-x-2">
                <Input type="color" v-model="playgroundConfig.secondary" class="h-10 w-full" />
              </div>
            </div>
          </div>
        </div>
        <CardAction class="w-full">
          <Button class="w-full" @click="copyConfig">
            <Copy class="mr-2 h-4 w-4" />
            Copy Config
          </Button>
        </CardAction>
      </Card>
    </div>
  </section>
</template>
