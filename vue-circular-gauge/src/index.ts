import Gauge from './components/Gauge.vue'
import type { GaugeProps, Size } from './types'
import { Plugin } from 'vue'

export { Gauge }
export type { GaugeProps, Size }

export default {
  install: (app, _options = {}) => {
    app.component('Gauge', Gauge)
  },
} as Plugin

// Export functions for advanced usage
export * from './utils'
