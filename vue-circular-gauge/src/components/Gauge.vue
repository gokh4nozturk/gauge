<script setup lang="ts">
import {
  ref,
  computed,
  type CSSProperties,
  type SVGAttributes,
  onMounted,
  watch,
  type ComputedRef,
} from 'vue'

import {
  calculatePrimaryOpacity,
  calculatePrimaryStroke,
  calculatePrimaryStrokeDasharray,
  calculatePrimaryTransform,
  calculateSecondaryOpacity,
  calculateSecondaryStroke,
  calculateSecondaryStrokeDasharray,
  calculateSecondaryTransform,
  sizeConfig,
} from '@/utils'

import type { GaugeProps, Size } from '@/types'

/**
 * Renders a circular gauge using SVG. Allows configuration of colors, stroke, and animations.
 *
 * @param value - Current value of the gauge, expressed as a percentage.
 * @param size - Width and height of the gauge. Defaults to 'md'.
 * @param gapPercent - Percentage of the total circumference that represents a gap in the gauge. Defaults to 5%.
 * @param strokeWidth - Stroke width of the gauge. Defaults to 10px.
 * @param variant - Direction of the gauge's animation. Defaults to 'ascending'.
 * @param showValue - Option to display the numeric value inside the gauge. Defaults to false.
 * @param showAnimation - Option to animate the gauge's progress. Defaults to false.
 * @param primary - Primary color or set of colors for the gauge, with optional threshold values to determine color changes.
 * @param secondary - Secondary color or set of colors for the gauge, similar to `primary`.
 * @param props - Configuration and properties for the svg.
 */
const {
  size = 'md' as Size,
  gapPercent = 5,
  strokeWidth = 10,
  variant = 'ascending',
  showValue = false,
  showAnimation = false,
  primary = '#10b981',
  secondary = '#e5e7eb',
  value = 0,
} = defineProps<GaugeProps>()

const circleSize = 100 // px
const radius = circleSize / 2 - strokeWidth / 2
const circumference = 2 * Math.PI * radius

const isAscendingVariant = variant === 'ascending'
const animatedValue = ref(showAnimation ? (isAscendingVariant ? 0 : 100) : value)
const strokePercent = ref(showAnimation ? animatedValue.value : value)

// Trigger animation when component is mounted
onMounted(() => {
  if (showAnimation) {
    // Use setTimeout to ensure the initial state is rendered first
    setTimeout(() => {
      strokePercent.value = value
    }, 50)
  }
})

// Update strokePercent when value changes
watch(
  () => value,
  (newValue) => {
    strokePercent.value = newValue
  },
)

// Convert all static calculations to computed properties
const isEqual = computed(
  () => strokePercent.value > circleSize / 2 - 1 && strokePercent.value < circleSize / 2 + 1,
)
const offsetFactor = computed(() => (isEqual.value ? 0.5 : 0))
const offsetFactorSecondary = computed(() => 1 - offsetFactor.value)

const circleStyles: ComputedRef<CSSProperties> = computed(() => ({
  ...(showAnimation
    ? {
        transitionProperty: 'stroke-dasharray, transform, stroke, opacity',
        transitionDuration: '1000ms',
        transitionTimingFunction: `cubic-bezier(0.785, 0.135, 0.15, 0.86)`,
        transitionDelay: '0ms',
      }
    : {}),
  transformOrigin: '50% 50%',
}))

const circleProps: ComputedRef<SVGAttributes> = computed(() => ({
  cx: circleSize / 2,
  cy: circleSize / 2,
  r: radius,
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
  'stroke-dashoffset': 0,
  'stroke-width': strokeWidth,
  'shape-rendering': 'geometricPrecision',
}))

const primaryStrokeDasharray = computed(() =>
  calculatePrimaryStrokeDasharray(
    strokePercent.value,
    offsetFactor.value,
    gapPercent,
    circumference,
  ),
)

const secondaryStrokeDasharray = computed(() =>
  calculateSecondaryStrokeDasharray(
    strokePercent.value,
    offsetFactorSecondary.value,
    gapPercent,
    circumference,
  ),
)

const primaryTransform = computed(() =>
  calculatePrimaryTransform(
    strokePercent.value,
    offsetFactor.value,
    gapPercent,
    isAscendingVariant,
  ),
)

const secondaryTransform = computed(() =>
  calculateSecondaryTransform(
    strokePercent.value,
    offsetFactorSecondary.value,
    gapPercent,
    isAscendingVariant,
  ),
)

const primaryStroke = computed(() => calculatePrimaryStroke(primary, strokePercent.value))
const secondaryStroke = computed(() => calculateSecondaryStroke(secondary, strokePercent.value))

const primaryOpacity = computed(() =>
  calculatePrimaryOpacity(
    offsetFactor.value,
    strokePercent.value,
    gapPercent,
    offsetFactorSecondary.value,
  ),
)

const secondaryOpacity = computed(() =>
  calculateSecondaryOpacity(
    offsetFactor.value,
    strokePercent.value,
    gapPercent,
    offsetFactorSecondary.value,
  ),
)

// Calculate font size based on gauge size
const fontSize = computed(() => {
  const gaugeSize = sizeConfig[size as Size]?.size || 50
  return Math.max(Math.floor(gaugeSize / 3), 12) // Scale font size with gauge size
})
</script>

<template>
  <svg
    v-bind="$props"
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="`0 0 ${circleSize} ${circleSize}`"
    :width="sizeConfig[size as Size]?.size || size"
    :height="sizeConfig[size as Size]?.size || size"
    fill="none"
    shapeRendering="crispEdges"
    :style="{ userSelect: 'none' }"
  >
    <!-- secondary -->
    <circle
      v-bind="circleProps"
      :style="{
        ...circleStyles,
        strokeDasharray: secondaryStrokeDasharray,
        transform: secondaryTransform,
        stroke: secondaryStroke,
        opacity: secondaryOpacity,
      }"
    />

    <!-- primary -->
    <circle
      v-bind="circleProps"
      :style="{
        ...circleStyles,
        strokeDasharray: primaryStrokeDasharray,
        transform: primaryTransform,
        stroke: primaryStroke,
        opacity: primaryOpacity,
      }"
    />
    <text
      v-if="showValue"
      :x="circleSize / 2"
      :y="circleSize / 2"
      text-anchor="middle"
      dominant-baseline="central"
      fill="currentColor"
      :font-size="fontSize"
      dy="0.05em"
    >
      {{ Math.round(value) }}
    </text>
  </svg>
</template>
