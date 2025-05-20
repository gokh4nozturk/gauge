import { ref } from 'vue'
import type { Ref } from 'vue'

interface UseReplayAnimationOptions {
  initialValue: number
  startValue?: number
  duration?: number
  easing?: (t: number) => number
  onComplete?: () => void
}

interface UseReplayAnimationReturn {
  value: Ref<number>
  isAnimating: Ref<boolean>
  replay: () => void
  stop: () => void
  setTargetValue: (newValue: number) => void
}

/**
 * Vue composable for handling gauge animation replay
 */
export function useReplayAnimation({
  initialValue,
  startValue = 0,
  duration = 1000,
  easing = (t) => t,
  onComplete,
}: UseReplayAnimationOptions): UseReplayAnimationReturn {
  const value = ref(initialValue)
  const targetValue = ref(initialValue)
  const isAnimating = ref(false)
  let animationFrameId: number | null = null

  function setTargetValue(newValue: number) {
    targetValue.value = newValue
    // If not animating, directly set the value
    if (!isAnimating.value) {
      value.value = newValue
    }
  }

  function replay() {
    // Stop any running animation
    stop()

    // Set initial state
    isAnimating.value = true
    // Always force the value to start from startValue
    value.value = startValue

    const startTime = performance.now()
    const endValue = targetValue.value
    const valueRange = endValue - startValue

    // Animation loop
    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime
      const progress = Math.min(elapsedTime / duration, 1)
      const easedProgress = easing(progress)

      value.value = startValue + valueRange * easedProgress

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate)
      } else {
        value.value = endValue
        isAnimating.value = false
        animationFrameId = null
        if (onComplete) {
          onComplete()
        }
      }
    }

    animationFrameId = requestAnimationFrame(animate)
  }

  function stop() {
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = null
    }
    isAnimating.value = false
  }

  return {
    value,
    isAnimating,
    replay,
    stop,
    setTargetValue,
  }
}

// Common easing functions
export const easings = {
  linear: (t: number) => t,
  easeInQuad: (t: number) => t * t,
  easeOutQuad: (t: number) => t * (2 - t),
  easeInOutQuad: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  easeOutBack: (t: number) => {
    const c1 = 1.70158
    const c3 = c1 + 1
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
  },
  easeInOutBack: (t: number) => {
    const c1 = 1.70158
    const c2 = c1 * 1.525
    return t < 0.5
      ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
      : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2
  },
}
