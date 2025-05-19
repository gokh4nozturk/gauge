# Vue Circular Gauge

A highly customizable circular gauge component for Vue.js applications. Perfect for dashboards, progress indicators, and data visualizations.

## Features

- 🎨 Fully customizable colors with threshold support
- 🔄 Optional animations
- 📏 Multiple sizes (xs, sm, md, lg, xl, 2xl)
- 📊 Value display option
- 🚀 Lightweight (~5kb minified)
- 🧩 TypeScript support
- 📦 Vue 3 and Composition API support

## Installation

```bash
# npm
npm install vue-circular-gauge

# yarn
yarn add vue-circular-gauge

# pnpm
pnpm add vue-circular-gauge
```

## Usage

### Global Registration

```js
// main.js or main.ts
import { createApp } from 'vue'
import App from './App.vue'
import VueCircularGauge from 'vue-circular-gauge'

// Optional: import CSS if your bundler supports it
import 'vue-circular-gauge/style.css'

const app = createApp(App)
app.use(VueCircularGauge)
app.mount('#app')
```

### Local Registration

```vue
<script setup>
import { Gauge } from 'vue-circular-gauge'
</script>

<template>
  <Gauge :value="75" />
</template>
```

## Examples

### Basic Usage

```vue
<template>
  <Gauge :value="65" />
</template>
```

### With Custom Colors

```vue
<template>
  <Gauge :value="65" primary="#4ade80" secondary="#e2e8f0" />
</template>
```

### With Color Thresholds

```vue
<template>
  <Gauge
    :value="currentValue"
    :primary="{
      0: '#ef4444', // red below 30
      30: '#f97316', // orange between 30-60
      60: '#22c55e', // green above 60
    }"
  />
</template>

<script setup>
import { ref } from 'vue'

const currentValue = ref(45)
</script>
```

### With Animation

```vue
<template>
  <Gauge :value="75" :showAnimation="true" />
</template>
```

### With Value Display

```vue
<template>
  <Gauge :value="75" :showValue="true" />
</template>
```

### Custom Size

```vue
<template>
  <!-- Using predefined sizes -->
  <Gauge :value="75" size="xs" />
  <Gauge :value="75" size="sm" />
  <Gauge :value="75" size="md" />
  <Gauge :value="75" size="lg" />
  <Gauge :value="75" size="xl" />
  <Gauge :value="75" size="2xl" />

  <!-- Using custom size (in pixels) -->
  <Gauge :value="75" size="200" />
</template>
```

### Complete Example

```vue
<template>
  <Gauge
    :value="value"
    size="lg"
    :gapPercent="8"
    :strokeWidth="12"
    variant="ascending"
    :showValue="true"
    :showAnimation="true"
    :primary="{
      0: '#ef4444',
      30: '#f97316',
      60: '#22c55e',
    }"
    secondary="#e2e8f0"
  />
</template>

<script setup>
import { ref } from 'vue'

const value = ref(75)
</script>
```

## Props

| Prop            | Type                                                                | Default       | Description                                |
| --------------- | ------------------------------------------------------------------- | ------------- | ------------------------------------------ |
| `value`         | `number`                                                            | `0`           | Current value of the gauge (0-100)         |
| `size`          | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| number \| string` | `'md'`        | Size of the gauge                          |
| `gapPercent`    | `number`                                                            | `5`           | Gap percentage of the gauge                |
| `strokeWidth`   | `number`                                                            | `10`          | Width of the gauge's stroke                |
| `variant`       | `'ascending' \| 'descending'`                                       | `'ascending'` | Direction of the gauge progress            |
| `showValue`     | `boolean`                                                           | `false`       | Whether to show the value inside the gauge |
| `showAnimation` | `boolean`                                                           | `false`       | Whether to animate the gauge on mount      |
| `primary`       | `string \| Record<number, string>`                                  | `'#10b981'`   | Primary color or color thresholds          |
| `secondary`     | `string \| Record<number, string>`                                  | `'#e5e7eb'`   | Secondary color or color thresholds        |

## License

MIT
