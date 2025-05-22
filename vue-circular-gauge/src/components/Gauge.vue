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
 * @param idleIcon - Custom SVG path for the idle icon. Defaults to a pulse/heartbeat icon.
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
  idleIcon = 'M10,20 L20,10 L30,20 L40,10 L50,20',
  idleIconColor = 'currentColor',
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

const primaryStroke = computed(() => calculatePrimaryStroke(primary, effectiveStrokePercent.value))
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
  return Math.max(Math.floor(gaugeSize / 2), 24)
})

// Center position for icon/text
const centerPosition = computed(() => circleSize / 2)
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
    <path
      v-if="idleMode"
      :d="idleIcon"
      :fill="'none'"
      :stroke="idleIconColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      :transform="`translate(${centerPosition - iconSize / 2}, ${centerPosition - iconSize / 4}) scale(${iconSize / 50})`"
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
