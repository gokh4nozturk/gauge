[![CodeQL](https://github.com/gokh4nozturk/gauge/actions/workflows/codeql-analysis.yml/badge.svg?branch=master)](https://github.com/gokh4nozturk/gauge/actions/workflows/codeql-analysis.yml)

# Vue Gauge Component

A customizable circular gauge/progress component for Vue.js. This component is a Vue port of the [Gauge component by Onur Şuyalçınkaya](https://github.com/suyalcinkaya/gauge).

![Vue Gauge Component Preview](https://gauge.gokhanozturk.io/preview.jpeg)

## Features

- Customizable size
- Customizable colors
- Customizable stroke width
- Animated progress
- Ascending or descending variants
- Display value inside gauge
- Fully reactive

## Installation

```bash
# npm
npm install vue-gauge-component

# yarn
yarn add vue-gauge-component

# pnpm
pnpm add vue-gauge-component
```

### Global Registration

```js
// main.js or main.ts
import { createApp } from 'vue'
import App from './App.vue'
import VueCircularGauge from 'vue-circular-gauge'

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

## Props

| Name          | Type                  | Default     | Description                                                       |
| ------------- | --------------------- | ----------- | ----------------------------------------------------------------- |
| value         | Number                | -           | The value of the gauge (0-100)                                    |
| size          | String, Number        | 'md'        | Size of the gauge (xs, sm, md, lg, xl, 2xl, or a numeric value)   |
| gapPercent    | Number                | 5           | Percentage of the circumference representing the gap between arcs |
| strokeWidth   | Number                | 10          | Width of the gauge stroke                                         |
| variant       | String                | 'ascending' | Direction of gauge animation ('ascending' or 'descending')        |
| showValue     | Boolean               | false       | Whether to display the current value inside the gauge             |
| showAnimation | Boolean               | false       | Whether to animate the gauge when it first renders                |
| primary       | String, Array, Object | null        | Primary color or color scale for the gauge                        |
| secondary     | String, Array, Object | null        | Secondary color or color scale for the gauge                      |

## Default Color Scale

If no primary color is specified, the component will use a default color scale based on the value:

- 0-25: Red (#ef4444)
- 26-50: Amber (#f59e0b)
- 51-75: Blue (#3b82f6)
- 76-100: Green (#22c55e)

The default secondary color is gray (#e5e7eb).

## Examples

### Basic Usage

```vue
<Gauge :value="42" />
```

### With Value Display

```vue
<Gauge :value="75" :show-value="true" />
```

### Custom Sizes

```vue
<Gauge :value="60" size="xs" />
<Gauge :value="60" size="sm" />
<Gauge :value="60" size="md" />
<Gauge :value="60" size="lg" />
<Gauge :value="60" size="xl" />
<Gauge :value="60" size="2xl" />

<!-- Custom size -->
<Gauge :value="60" :size="100" />
```

### Different Variants

```vue
<!-- Ascending (clockwise) -->
<Gauge :value="30" variant="ascending" />

<!-- Descending (counterclockwise) -->
<Gauge :value="30" variant="descending" />
```

### Custom Colors

```vue
<Gauge :value="50" primary="#3b82f6" secondary="#e5e7eb" />
```

### With Animation

```vue
<Gauge :value="80" :show-animation="true" :show-value="true" size="lg" />
```

## License

MIT
