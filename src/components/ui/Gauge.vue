<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { motion } from 'motion-v'

export interface GaugeProps {
  /**
   * Current value (0-100)
   */
  value: number
  /**
   * Size of the gauge
   * @default "md"
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number
  /**
   * Gap percentage in the circle
   * @default 10
   */
  gapPercent?: number
  /**
   * Width of the gauge stroke
   * @default 14
   */
  strokeWidth?: number
  /**
   * Variant of the gauge
   * @default "ascending"
   */
  variant?: 'ascending' | 'descending'
  /**
   * Whether to display the value in the center
   * @default false
   */
  showValue?: boolean
  /**
   * Whether to show animation
   * @default true
   */
  showAnimation?: boolean
  /**
   * Duration of the animation in seconds
   * @default 0.7
   */
  animationDuration?: number
  /**
   * Primary color of the gauge (filled part)
   */
  primary?: string
  /**
   * Secondary color of the gauge (background part)
   */
  secondary?: string
}

const props = withDefaults(defineProps<GaugeProps>(), {
  size: 'md',
  gapPercent: 10,
  strokeWidth: 14,
  variant: 'ascending',
  showValue: false,
  showAnimation: true,
  animationDuration: 0.7,
  primary: undefined,
  secondary: undefined,
})

// Reactive state
const displayValue = ref(0)
const arcLength = ref(0)

// Size calculation
const computedSize = computed<number>(() => {
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

// Style computations
const containerStyle = computed(() => ({
  width: `${computedSize.value}px`,
  height: `${computedSize.value}px`,
}))

const valueFontSize = computed(() => `${Math.max(computedSize.value / 2.5, 16)}px`)
const valueFontColor = computed(() => '#000')

// SVG configurations
const center = 60
const radius = 50

// Animation configurations
const foregroundAnimation = computed(() => {
  const actualValue = props.variant === 'ascending' ? props.value : 100 - props.value
  const percentage = actualValue / 100
  const offset = arcLength.value * (1 - percentage)

  return {
    strokeDashoffset: offset,
    transition: {
      type: 'tween',
      duration: props.showAnimation ? props.animationDuration : 0,
      ease: [0.16, 1, 0.3, 1], // Custom spring-like bezier curve
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

// Value text animation
const valueTextAnimation = computed(() => ({
  opacity: 1,
  scale: 1,
  transition: {
    type: 'spring',
    stiffness: 260,
    damping: 20,
    delay: props.showAnimation ? 0.1 : 0,
  },
}))

// Utility functions
function initializeArc(): void {
  const circumference = 2 * Math.PI * radius
  // Full circle minus gap
  arcLength.value = circumference * ((100 - props.gapPercent) / 100)
}

function updateGauge(value: number): void {
  displayValue.value = value
}

function getArcPath(value: number): string {
  // Properly distribute the gap
  const gapRad = Math.PI * (props.gapPercent / 100)
  const startAngle = -Math.PI / 2 + gapRad / 2
  const endAngle = (3 * Math.PI) / 2 - gapRad / 2

  // Adjust end angle based on value
  const angle = startAngle + (endAngle - startAngle) * (value / 100)

  // Calculate coordinates
  const x1 = center + radius * Math.cos(startAngle)
  const y1 = center + radius * Math.sin(startAngle)
  const x2 = center + radius * Math.cos(angle)
  const y2 = center + radius * Math.sin(angle)

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
  if (value <= 25) return '#ef4444' // Red for low values
  if (value <= 50) return '#f59e0b' // Amber for medium-low values
  if (value <= 75) return '#3b82f6' // Blue for medium-high values
  return '#22c55e' // Green for high values
}

// Lifecycle and watchers
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
  <div
    class="inline-flex items-center justify-center relative"
    :style="containerStyle"
    data-testid="gauge-component"
  >
    <svg
      viewBox="0 0 120 120"
      class="overflow-visible"
      :width="computedSize"
      :height="computedSize"
      aria-hidden="true"
    >
      <!-- Background Arc -->
      <motion.path
        class="gauge-background-arc origin-center -rotate-90"
        :d="getArcPath(100)"
        :stroke="getGaugeColor(100, 'secondary')"
        :stroke-width="strokeWidth"
        stroke-linecap="round"
        fill="none"
      />

      <!-- Foreground Arc -->
      <motion.path
        class="gauge-foreground-arc origin-center -rotate-90"
        :d="getArcPath(100)"
        :stroke="getGaugeColor(displayValue, 'primary')"
        :stroke-width="strokeWidth"
        stroke-linecap="round"
        :stroke-dasharray="arcLength"
        :initial="initialAnimation"
        :animate="foregroundAnimation"
        fill="none"
      />

      <!-- Value Background Circle -->
      <circle v-if="showValue" cx="60" cy="60" :r="radius / 2.5" fill="white" opacity="0.9" />

      <!-- Value Text -->
      <motion.text
        v-if="showValue"
        x="60"
        y="66"
        text-anchor="middle"
        class="gauge-value font-semibold select-none"
        :style="{ fontSize: valueFontSize, fill: valueFontColor }"
        :initial="props.showAnimation ? { opacity: 0, scale: 0.8 } : {}"
        :animate="valueTextAnimation"
      >
        {{ Math.round(displayValue) }}
      </motion.text>
    </svg>
  </div>
</template>
