<script setup lang="ts">
import { ref } from 'vue'
import Gauge from '@/components/ui/Gauge.vue'
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
// Playground reactive state
const playgroundConfig = ref({
  value: 72,
  size: 180,
  gapPercent: 5,
  strokeWidth: 8,
  variant: 'ascending' as 'ascending' | 'descending',
  primary: '#41B883',
  secondary: '#e2e8f0',
  showValue: true,
  showAnimation: true,
})

function resetPlaygroundAnimation() {
  playgroundConfig.value.value = 0
  setTimeout(() => {
    playgroundConfig.value.value = 72
  }, 1000)
}

function copyConfig() {
  const componentCode = `<script setup lang="ts">
import Gauge from '@/components/ui/Gauge.vue'
<\/script>

<template>
  <Gauge
    :value="${playgroundConfig.value.value}"
    :size="${playgroundConfig.value.size}"
    :gap-percent="${playgroundConfig.value.gapPercent}"
    :stroke-width="${playgroundConfig.value.strokeWidth}"
    variant="${playgroundConfig.value.variant}"
    primary="${playgroundConfig.value.primary}"
    secondary="${playgroundConfig.value.secondary}"
    :show-value="${playgroundConfig.value.showValue}"
    :show-animation="${playgroundConfig.value.showAnimation}"
  />
<\/template>`

  navigator.clipboard.writeText(componentCode)
  toast.success('Ready-to-use Gauge component has been copied to clipboard')
}
</script>
<template>
  <section class="mt-20 mb-10">
    <h2 class="text-3xl font-bold mb-8 text-center">Playground</h2>
    <p class="text-center text-lg mb-12">Play with the configuration of the Gauge</p>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <!-- Gauge Preview -->
      <Card class="p-6 border rounded-lg grid grid-rows-[1fr_auto] place-items-center col-span-1">
        <CardContent>
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
        </CardContent>
        <CardFooter class="w-full">
          <Button class="w-full" variant="outline" @click="resetPlaygroundAnimation">
            <RotateCw class="w-4 h-4 mr-2" />
            Replay Animation
          </Button>
        </CardFooter>
      </Card>

      <!-- Controls -->
      <Card class="p-6 border rounded-lg lg:col-span-1">
        <CardTitle class="text-xl font-semibold mb-6">Gauge Config</CardTitle>
        <CardDescription class="mb-6">Customize your Gauge</CardDescription>

        <div class="space-y-6">
          <!-- Toggle Options -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            <Input type="number" v-model="playgroundConfig.value" min="0" max="100" />
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
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label>Primary</Label>
              <div class="flex items-center space-x-2">
                <div
                  class="w-6 h-6 rounded-full border"
                  :style="{ backgroundColor: playgroundConfig.primary }"
                ></div>
                <Input type="color" v-model="playgroundConfig.primary" class="w-full h-10" />
              </div>
            </div>
            <div class="space-y-2">
              <Label>Secondary</Label>
              <div class="flex items-center space-x-2">
                <div
                  class="w-6 h-6 rounded-full border"
                  :style="{ backgroundColor: playgroundConfig.secondary }"
                ></div>
                <Input type="color" v-model="playgroundConfig.secondary" class="w-full h-10" />
              </div>
            </div>
          </div>
        </div>
        <CardAction class="w-full">
          <Button class="w-full" @click="copyConfig">
            <Copy class="w-4 h-4 mr-2" />
            Copy Config
          </Button>
        </CardAction>
      </Card>
    </div>
  </section>
</template>
