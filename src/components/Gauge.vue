<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

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
const isAnimating = ref(false)

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

const animationStyle = computed(() => {
  if (!props.showAnimation) {
    return {}
  }

  return {
    transition: 'stroke-dashoffset 1s ease',
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
  const actualValue = props.variant === 'ascending' ? value : 100 - value

  // If animation is enabled, animate from 0 to the actual value
  if (props.showAnimation && !isAnimating.value) {
    isAnimating.value = true
    displayValue.value = props.variant === 'ascending' ? 0 : 100

    // Use setTimeout to trigger animation
    setTimeout(() => {
      displayValue.value = value
      calculateArcOffset(actualValue)
    }, 50)
  } else {
    displayValue.value = value
    calculateArcOffset(actualValue)
  }
}

function calculateArcOffset(value: number): void {
  // Calculate the offset based on the value
  const percentage = value / 100
  arcOffset.value = arcLength.value * (1 - percentage)
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
      <path
        class="origin-center -rotate-90"
        :d="getArcPath(100)"
        :stroke="getGaugeColor(100, 'secondary')"
        :stroke-width="strokeWidth"
        :stroke-linecap="'round'"
        fill="none"
      />

      <!-- Foreground Arc -->
      <path
        class="origin-center -rotate-90"
        :d="getArcPath(displayValue)"
        :stroke="getGaugeColor(displayValue, 'primary')"
        :stroke-width="strokeWidth"
        :stroke-linecap="'round'"
        :stroke-dasharray="arcLength"
        :stroke-dashoffset="arcOffset"
        fill="none"
        :style="animationStyle"
      />

      <!-- Value Text -->
      <text
        v-if="showValue"
        x="60"
        y="66"
        text-anchor="middle"
        class="font-medium"
        :style="{ fontSize: valueFontSize, fill: valueFontColor }"
      >
        {{ Math.round(displayValue) }}
      </text>
    </svg>
  </div>
</template>
