<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { motion } from 'motion-v'

const props = defineProps({
  value: {
    type: Number,
    required: true,
    validator: (val: number) => val >= 0 && val <= 100,
  },
  size: {
    type: [String, Number],
    default: 'md',
  },
  gapPercent: {
    type: Number,
    default: 8,
  },
  strokeWidth: {
    type: Number,
    default: 14,
  },
  variant: {
    type: String,
    default: 'ascending',
    validator: (val: string) => ['ascending', 'descending'].includes(val),
  },
  showValue: {
    type: Boolean,
    default: false,
  },
  showAnimation: {
    type: Boolean,
    default: false,
  },
  primary: {
    type: [String, Array, Object],
    default: () => null,
  },
  secondary: {
    type: [String, Array, Object],
    default: () => null,
  },
})

const displayValue = ref(0)
const arcLength = ref(0)
const arcOffset = ref(0)

const computedSize = computed(() => {
  const sizeMap: Record<string, number> = {
    xs: 16,
    sm: 24,
    md: 32,
    lg: 40,
    xl: 48,
    '2xl': 64,
  }

  if (typeof props.size === 'number') {
    return props.size
  }

  if (typeof props.size === 'string' && !Number.isNaN(Number.parseInt(props.size, 10))) {
    return Number.parseInt(props.size, 10)
  }

  return sizeMap[props.size as string] || sizeMap.md
})

const containerStyle = computed(() => {
  return {
    width: `${computedSize.value}px`,
    height: `${computedSize.value}px`,
  }
})

const valueFontSize = computed(() => {
  return `${computedSize.value / 4}px`
})

const valueFontColor = computed(() => {
  return '#000'
})

// Animation configurations
const foregroundAnimation = computed(() => {
  const actualValue = props.variant === 'ascending' ? props.value : 100 - props.value
  const percentage = actualValue / 100
  const offset = arcLength.value * (1 - percentage)

  return {
    strokeDashoffset: offset,
    transition: {
      duration: props.showAnimation ? 1 : 0,
      ease: 'easeInOut',
    },
  }
})

const initialAnimation = computed(() => {
  if (!props.showAnimation) return {}

  const initialOffset = props.variant === 'ascending' ? arcLength.value : 0

  return {
    strokeDashoffset: initialOffset,
  }
})

function initializeArc(): void {
  // Calculate arc length
  const radius = 50
  const circumference = 2 * Math.PI * radius

  // Full circle minus gap
  arcLength.value = circumference * ((100 - props.gapPercent) / 100)
}

function updateGauge(value: number): void {
  displayValue.value = value
}

function getArcPath(value: number): string {
  const radius = 50
  const startAngle = -Math.PI / 2 + Math.PI * (props.gapPercent / 100)
  const endAngle = 2 * Math.PI - Math.PI * (props.gapPercent / 100) - Math.PI / 2

  // Adjust end angle based on value and variant
  const angle = startAngle + (endAngle - startAngle) * (value / 100)

  // Calculate coordinates
  const x1 = 60 + radius * Math.cos(startAngle)
  const y1 = 60 + radius * Math.sin(startAngle)
  const x2 = 60 + radius * Math.cos(angle)
  const y2 = 60 + radius * Math.sin(angle)

  // Determine if the arc should be drawn with a large arc flag
  const largeArcFlag = angle - startAngle > Math.PI ? 1 : 0

  return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`
}

function getGaugeColor(value: number, type: 'primary' | 'secondary'): string {
  // Get color based on type and value
  const colorProp = type === 'primary' ? props.primary : props.secondary

  // If a specific color is provided, use it
  if (typeof colorProp === 'string') {
    return colorProp
  }

  // Default colors based on type
  if (type === 'secondary') {
    return '#e5e7eb' // Default secondary color (gray)
  }

  // For primary, use color scale based on value
  if (value <= 25) {
    return '#ef4444' // Red for low values
  }

  if (value <= 50) {
    return '#f59e0b' // Amber for medium-low values
  }

  if (value <= 75) {
    return '#3b82f6' // Blue for medium-high values
  }

  return '#22c55e' // Green for high values
}

// Initialize and watch for changes
onMounted(() => {
  initializeArc()
  updateGauge(props.value)
})

watch(
  () => props.value,
  (newValue: number) => {
    updateGauge(newValue)
  },
  { immediate: true },
)
</script>

<template>
  <div class="inline-flex items-center justify-center" :style="containerStyle">
    <svg
      viewBox="0 0 120 120"
      class="overflow-visible"
      :width="computedSize"
      :height="computedSize"
    >
      <!-- Background Arc -->
      <motion.path
        class="origin-center -rotate-90"
        :d="getArcPath(100)"
        :stroke="getGaugeColor(100, 'secondary')"
        :stroke-width="strokeWidth"
        :stroke-linecap="'round'"
        fill="none"
      />

      <!-- Foreground Arc -->
      <motion.path
        class="origin-center -rotate-90"
        :d="getArcPath(displayValue)"
        :stroke="getGaugeColor(displayValue, 'primary')"
        :stroke-width="strokeWidth"
        :stroke-linecap="'round'"
        :stroke-dasharray="arcLength"
        :initial="initialAnimation"
        :animate="foregroundAnimation"
        fill="none"
      />

      <!-- Value Text -->
      <motion.text
        v-if="showValue"
        x="60"
        y="66"
        text-anchor="middle"
        class="font-medium"
        :style="{ fontSize: valueFontSize, fill: valueFontColor }"
        :initial="props.showAnimation ? { opacity: 0, scale: 0.8 } : {}"
        :animate="{ opacity: 1, scale: 1 }"
        :transition="{ delay: 0.2 }"
      >
        {{ Math.round(displayValue) }}
      </motion.text>
    </svg>
  </div>
</template>
