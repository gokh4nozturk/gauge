import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Gauge from '../Gauge.vue'

describe('Gauge.vue', () => {
  it('renders with default props', () => {
    const wrapper = mount(Gauge, {
      props: {
        value: 50,
      },
    })

    expect(wrapper.find('svg').exists()).toBe(true)
    expect(wrapper.find('circle').exists()).toBe(true)
  })

  it('shows value when showValue is true', () => {
    const wrapper = mount(Gauge, {
      props: {
        value: 75,
        showValue: true,
      },
    })

    expect(wrapper.find('text').exists()).toBe(true)
    expect(wrapper.find('text').text()).toBe('75')
  })

  it('applies the correct svg size based on size prop', () => {
    const wrapper = mount(Gauge, {
      props: {
        value: 50,
        size: 'lg',
      },
    })

    const svg = wrapper.find('svg')
    expect(svg.attributes('width')).toBe('96')
    expect(svg.attributes('height')).toBe('96')
  })

  it('applies custom numeric size when provided', () => {
    const wrapper = mount(Gauge, {
      props: {
        value: 50,
        size: 120,
      },
    })

    const svg = wrapper.find('svg')
    expect(svg.attributes('width')).toBe('120')
    expect(svg.attributes('height')).toBe('120')
  })
})
