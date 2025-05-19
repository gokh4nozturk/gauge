<template>
  <div class="inline-flex items-center justify-center" :style="containerStyle">
    <svg viewBox="0 0 120 120" class="overflow-visible" :width="computedSize" :height="computedSize">
      <!-- Background Arc -->
      <path class="origin-center -rotate-90" :d="getArcPath(100)" :stroke="getGaugeColor(100, 'secondary')"
        :stroke-width="strokeWidth" :stroke-linecap="'round'" fill="none" />

      <!-- Foreground Arc -->
      <path class="origin-center -rotate-90" :d="getArcPath(displayValue)" :stroke="getGaugeColor(displayValue, 'primary')"
        :stroke-width="strokeWidth" :stroke-linecap="'round'" :stroke-dasharray="arcLength"
        :stroke-dashoffset="arcOffset" fill="none" :style="animationStyle" />

      <!-- Value Text -->
      <text v-if="showValue" x="60" y="66" text-anchor="middle" class="font-medium"
        :style="{ fontSize: valueFontSize, fill: valueFontColor }">
        {{ Math.round(displayValue) }}
      </text>
    </svg>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Gauge',
  props: {
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
      default: 5,
    },
    strokeWidth: {
      type: Number,
      default: 10,
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
  },
  data() {
    return {
      displayValue: 0,
      arcLength: 0,
      arcOffset: 0,
      isAnimating: false,
    };
  },
  computed: {
    computedSize(): number {
      const sizeMap: Record<string, number> = {
        xs: 16,
        sm: 24,
        md: 32,
        lg: 40,
        xl: 48,
        '2xl': 64,
      };

      if (typeof this.size === 'number') {
        return this.size;
      }

      if (typeof this.size === 'string' && !isNaN(parseInt(this.size))) {
        return parseInt(this.size);
      }

      return sizeMap[this.size as string] || sizeMap.md;
    },
    containerStyle(): Record<string, string> {
      return {
        width: `${this.computedSize}px`,
        height: `${this.computedSize}px`,
      };
    },
    valueFontSize(): string {
      return `${this.computedSize / 4}px`;
    },
    valueFontColor(): string {
      return '#000';
    },
    animationStyle(): Record<string, string> {
      if (!this.showAnimation) {
        return {};
      }

      return {
        transition: 'stroke-dashoffset 1s ease',
      };
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(newValue: number) {
        this.updateGauge(newValue);
      }
    }
  },
  mounted() {
    this.initializeArc();
    this.updateGauge(this.value);
  },
  methods: {
    initializeArc(): void {
      // Calculate arc length
      const radius = 50;
      const circumference = 2 * Math.PI * radius;

      // Full circle minus gap
      this.arcLength = circumference * ((100 - this.gapPercent) / 100);
    },
    updateGauge(value: number): void {
      const actualValue = this.variant === 'ascending' ? value : (100 - value);

      // If animation is enabled, animate from 0 to the actual value
      if (this.showAnimation && !this.isAnimating) {
        this.isAnimating = true;
        this.displayValue = this.variant === 'ascending' ? 0 : 100;

        // Use setTimeout to trigger animation
        setTimeout(() => {
          this.displayValue = value;
          this.calculateArcOffset(actualValue);
        }, 50);
      } else {
        this.displayValue = value;
        this.calculateArcOffset(actualValue);
      }
    },
    calculateArcOffset(value: number): void {
      // Calculate the offset based on the value
      const percentage = value / 100;
      this.arcOffset = this.arcLength * (1 - percentage);
    },
    getArcPath(value: number): string {
      const radius = 50;
      const startAngle = -Math.PI / 2 + (Math.PI * (this.gapPercent / 100));
      const endAngle = (2 * Math.PI) - (Math.PI * (this.gapPercent / 100)) - (Math.PI / 2);

      // Adjust end angle based on value and variant
      const angle = startAngle + ((endAngle - startAngle) * (value / 100));

      // Calculate coordinates
      const x1 = 60 + radius * Math.cos(startAngle);
      const y1 = 60 + radius * Math.sin(startAngle);
      const x2 = 60 + radius * Math.cos(angle);
      const y2 = 60 + radius * Math.sin(angle);

      // Determine if the arc should be drawn with a large arc flag
      const largeArcFlag = (angle - startAngle) > Math.PI ? 1 : 0;

      return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`;
    },
    getGaugeColor(value: number, type: 'primary' | 'secondary'): string {
      // Get color based on type and value
      const colorProp = type === 'primary' ? this.primary : this.secondary;

      // If a specific color is provided, use it
      if (typeof colorProp === 'string') {
        return colorProp;
      }

      // Default colors based on type
      if (type === 'secondary') {
        return '#e5e7eb'; // Default secondary color (gray)
      }

      // For primary, use color scale based on value
      if (value <= 25) {
        return '#ef4444'; // Red for low values
      } else if (value <= 50) {
        return '#f59e0b'; // Amber for medium-low values
      } else if (value <= 75) {
        return '#3b82f6'; // Blue for medium-high values
      } else {
        return '#22c55e'; // Green for high values
      }
    }
  }
};
</script>
