import type { SVGAttributes } from 'vue'

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export interface GaugeProps extends /* @vue-ignore */ SVGAttributes {
  value: number
  size?: Size | number | string
  gapPercent?: number
  strokeWidth?: number
  variant?: 'ascending' | 'descending'
  showValue?: boolean
  showAnimation?: boolean
  primary?: string | { [key: number]: string }
  secondary?: string | { [key: number]: string }
}
