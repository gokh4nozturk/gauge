<script setup lang="ts">
import { ref } from 'vue'
import Gauge from '../components/Gauge.vue'

const value = ref(65)

function updateValue() {
  value.value = Math.floor(Math.random() * 100)
}
</script>

<template>
  <div class="demo-container">
    <header>
      <h1>Vue Circular Gauge</h1>
      <p>A customizable circular gauge component for Vue.js</p>
    </header>

    <div class="controls">
      <input type="range" v-model.number="value" min="0" max="100" step="1" />
      <span class="value-display">{{ value }}%</span>
      <button @click="updateValue">Random Value</button>
    </div>

    <div class="gauges-grid">
      <section class="gauge-example">
        <h2>Basic</h2>
        <Gauge :value="value" />
      </section>

      <section class="gauge-example">
        <h2>With Value</h2>
        <Gauge :value="value" :showValue="true" />
      </section>

      <section class="gauge-example">
        <h2>Custom Colors</h2>
        <Gauge :value="value" primary="#4ade80" secondary="#e2e8f0" />
      </section>

      <section class="gauge-example">
        <h2>Size: XS</h2>
        <Gauge :value="value" size="xs" />
      </section>

      <section class="gauge-example">
        <h2>Size: SM</h2>
        <Gauge :value="value" size="sm" />
      </section>

      <section class="gauge-example">
        <h2>Size: MD</h2>
        <Gauge :value="value" size="md" />
      </section>

      <section class="gauge-example">
        <h2>Size: LG</h2>
        <Gauge :value="value" size="lg" />
      </section>

      <section class="gauge-example">
        <h2>Size: XL</h2>
        <Gauge :value="value" size="xl" />
      </section>

      <section class="gauge-example">
        <h2>Size: 2XL</h2>
        <Gauge :value="value" size="2xl" />
      </section>

      <section class="gauge-example">
        <h2>With Thresholds</h2>
        <Gauge
          :value="value"
          :primary="{
            0: '#ef4444',
            30: '#f97316',
            60: '#22c55e',
          }"
        />
      </section>

      <section class="gauge-example">
        <h2>Descending</h2>
        <Gauge :value="value" variant="descending" />
      </section>

      <section class="gauge-example">
        <h2>Larger Gap</h2>
        <Gauge :value="value" :gapPercent="15" />
      </section>
    </div>
  </div>
</template>

<style>
body {
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    sans-serif;
  background-color: #f8fafc;
  color: #1e293b;
  margin: 0;
  padding: 0;
}

.demo-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

header {
  text-align: center;
  margin-bottom: 2rem;
}

header h1 {
  font-size: 2.5rem;
  margin: 0 0 0.5rem;
}

header p {
  font-size: 1.2rem;
  color: #64748b;
  margin: 0;
}

.controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.controls input {
  width: 300px;
}

.value-display {
  font-size: 1.1rem;
  font-weight: 600;
  min-width: 3rem;
}

.controls button {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.controls button:hover {
  background-color: #2563eb;
}

.gauges-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}

.gauge-example {
  background-color: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.gauge-example h2 {
  font-size: 1.1rem;
  margin: 0 0 1.5rem;
  text-align: center;
}
</style>
