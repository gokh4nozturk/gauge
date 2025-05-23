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
} from '../utils'

import type { GaugeProps, Size } from '@/types'
import { motion } from 'motion-v'

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
 * @param idleMode - Shows a pulse icon in the center instead of value. Defaults to false.
 * @param idleIconColor - Color of the idle icon. Defaults to currentColor.
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
  idleMode = false,
  idleIconColor = 'hsl(0, 0%, 40%)',
} = defineProps<GaugeProps>()

const circleSize = 100 // px
const radius = circleSize / 2 - strokeWidth / 2
const circumference = 2 * Math.PI * radius

const isAscendingVariant = computed(() => variant === 'ascending')
const animatedValue = ref(showAnimation ? (isAscendingVariant.value ? 0 : 100) : value)
const strokePercent = ref(showAnimation ? animatedValue.value : value)

// Computed value for idle mode
const effectiveValue = computed(() => (idleMode ? 100 : value))
const effectiveStrokePercent = computed(() => (idleMode ? 100 : strokePercent.value))

// Trigger animation when component is mounted
onMounted(() => {
  if (showAnimation) {
    // Use setTimeout to ensure the initial state is rendered first
    setTimeout(() => {
      strokePercent.value = effectiveValue.value
    }, 50)
  }
})

// Update strokePercent when value changes
watch(
  () => effectiveValue.value,
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
    effectiveStrokePercent.value,
    offsetFactor.value,
    gapPercent,
    circumference,
  ),
)

const secondaryStrokeDasharray = computed(() =>
  calculateSecondaryStrokeDasharray(
    effectiveStrokePercent.value,
    offsetFactorSecondary.value,
    gapPercent,
    circumference,
  ),
)

const primaryTransform = computed(() =>
  calculatePrimaryTransform(
    effectiveStrokePercent.value,
    offsetFactor.value,
    gapPercent,
    isAscendingVariant.value,
  ),
)

const secondaryTransform = computed(() =>
  calculateSecondaryTransform(
    effectiveStrokePercent.value,
    offsetFactorSecondary.value,
    gapPercent,
    isAscendingVariant.value,
  ),
)

const primaryStroke = computed(() =>
  calculatePrimaryStroke(idleMode ? secondary : primary, effectiveStrokePercent.value),
)
const secondaryStroke = computed(() =>
  idleMode
    ? primaryStroke.value
    : calculateSecondaryStroke(secondary, effectiveStrokePercent.value),
)

const primaryOpacity = computed(() =>
  calculatePrimaryOpacity(
    offsetFactor.value,
    effectiveStrokePercent.value,
    gapPercent,
    offsetFactorSecondary.value,
  ),
)

const secondaryOpacity = computed(() =>
  calculateSecondaryOpacity(
    offsetFactor.value,
    effectiveStrokePercent.value,
    gapPercent,
    offsetFactorSecondary.value,
  ),
)

// Calculate font size based on gauge size
const fontSize = computed(() => {
  const gaugeSize = sizeConfig[size as Size]?.size || 50
  return Math.max(Math.floor(gaugeSize / 3), 12) // Scale font size with gauge size
})

// Calculate icon size based on gauge size
const iconSize = computed(() => {
  const gaugeSize = sizeConfig[size as Size]?.size || 50
  return Math.max(Math.floor(gaugeSize / 1.2), 40)
})

// Original SVG viewBox dimensions
const originalIconWidth = 16 // SVG path width
const originalIconHeight = 16 // SVG path height

// Center position calculations
const centerPosition = computed(() => circleSize / 2)
const iconScale = computed(() => iconSize.value / 16)

// Icon position adjustments
const iconXOffset = computed(() => centerPosition.value - (originalIconWidth * iconScale.value) / 2)
const iconYOffset = computed(
  () => centerPosition.value - (originalIconHeight * iconScale.value) / 2,
)
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

    <!-- Idle mode icon -->
    <motion.path
      v-if="idleMode"
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M5.51324 3.62367L3.76375 8.34731C3.61845 8.7396 3.24433 8.99999 2.826 8.99999H0.75H0V7.49999H0.75H2.47799L4.56666 1.86057C4.88684 0.996097 6.10683 0.988493 6.43776 1.84891L10.5137 12.4463L12.2408 8.1286C12.3926 7.74894 12.7604 7.49999 13.1693 7.49999H15.25H16V8.99999H15.25H13.5078L11.433 14.1868C11.0954 15.031 9.8976 15.023 9.57122 14.1744L5.51324 3.62367Z"
      :fill="idleIconColor"
      :transform="`translate(${iconXOffset}, ${iconYOffset}) scale(${iconScale})`"
      :stroke="idleIconColor"
      :animate="{
        pathLength: [0, 1],
        opacity: [0, 1],
      }"
      :transition="{
        duration: 0.5,
        ease: 'easeInOut',
      }"
      :exit="{
        pathLength: [1, 0],
        opacity: [1, 0],
      }"
    />

    <!-- Value text -->
    <text
      v-else-if="showValue"
      :x="centerPosition"
      :y="centerPosition"
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
