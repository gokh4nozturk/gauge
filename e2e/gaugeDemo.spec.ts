import { test, expect } from '@playwright/test'

/**
 * End-to-end tests for the GaugeDemo component
 *
 * This test file verifies that the GaugeDemo component renders correctly
 * and that all interactions work as expected. The GaugeDemo component
 * displays various configurations of the Gauge component.
 */

test.describe('GaugeDemo Page', () => {
  test.beforeEach(async ({ page }) => {
    // Go to the root page which loads GaugeDemo component
    await page.goto('/')
  })

  test('should display Vue.js color themed gauges', async ({ page }) => {
    // Find the Vue.js Colors section
    const titleText = page.getByText('Vue.js Colors')
    await expect(titleText).toBeVisible()

    // Get the parent Card that contains this title
    const vueColorsCard = page.locator('.rounded-lg.border').filter({ has: titleText })
    await expect(vueColorsCard).toBeVisible()

    // Check that all theme labels are displayed
    const themeNames = ['Vue Green', 'Vue Dark', 'Combined']
    for (const name of themeNames) {
      await expect(vueColorsCard.getByText(name, { exact: true })).toBeVisible()
    }

    // Verify we have 3 gauges in the Vue.js Colors section
    const gauges = vueColorsCard.locator('svg')
    await expect(gauges).toHaveCount(3)

    // Check that the Combined gauge shows a value
    const combinedContainer = vueColorsCard.locator('.flex.flex-col', {
      has: page.getByText('Combined'),
    })
    await expect(combinedContainer.locator('svg text')).toBeVisible()
  })

  test('should display the header', async ({ page }) => {
    // Make sure we're on the right page
    await expect(page.locator('h1')).toBeVisible()
  })

  test('should display all gauge demo sections', async ({ page }) => {
    // This test verifies that all expected demo sections are displayed on the page

    // List of all section titles that should be displayed
    const expectedTitles = [
      'Default',
      'With Value Display',
      'Different Sizes',
      'Arc Priority',
      'Different Variants',
      'Vue.js Colors',
      'Custom Colors',
      'With Animation',
      'Interactive',
      'Different Gap Percentages',
    ]

    // Check that each title exists and is visible
    for (const title of expectedTitles) {
      const titleElement = page.getByText(title, { exact: true }).first()
      await expect(titleElement).toBeVisible()

      // Verify each title is inside a card container
      const card = page.locator('.rounded-lg.border').filter({ has: titleElement })
      await expect(card).toBeVisible()
    }
  })

  test('should allow changing the gauge value with slider', async ({ page }) => {
    // This test verifies that the interactive gauge's value can be changed using the slider

    // Find the Interactive section
    const interactiveTitle = page.getByText('Interactive', { exact: true })
    await expect(interactiveTitle).toBeVisible()

    // Get the card containing this title
    const interactiveCard = page.locator('.rounded-lg.border').filter({ has: interactiveTitle })
    await expect(interactiveCard).toBeVisible()

    // Find the slider in the Interactive section
    const slider = interactiveCard.locator('input[type="range"]')
    await expect(slider).toBeVisible()

    // Get the initial value
    const valueSpan = interactiveCard.locator('.w-8.text-sm')
    const initialValueText = await valueSpan.textContent()

    // Move the slider to a new value (e.g., to 75%)
    await slider.fill('75')
    await page.waitForTimeout(500) // Small delay to ensure the UI updates

    // Check if the displayed value has changed
    const newValueText = await valueSpan.textContent()
    expect(newValueText).toContain('75')
    expect(newValueText).not.toBe(initialValueText)
  })

  test('should randomize value when clicking random button', async ({ page }) => {
    // Find the Interactive section
    const interactiveTitle = page.getByText('Interactive', { exact: true })
    const interactiveCard = page.locator('.rounded-lg.border').filter({ has: interactiveTitle })
    await expect(interactiveCard).toBeVisible()

    // Get the initial value
    const valueSpan = interactiveCard.locator('.w-8.text-sm')

    // Click the random button
    await interactiveCard.getByRole('button', { name: 'Random Value' }).click()
    await page.waitForTimeout(500) // Small delay to ensure the UI updates

    // Get the new value
    const newValue = await valueSpan.textContent()

    // We can't predict the random value, but we can check that it's a number
    expect(Number(newValue?.trim())).not.toBeNaN()
  })

  test('should toggle animation when clicking animation button', async ({ page }) => {
    // This test verifies that the animation can be toggled on and off

    // Find the Animation section
    const animationTitle = page.getByText('With Animation', { exact: true })
    const animationCard = page.locator('.rounded-lg.border').filter({ has: animationTitle })
    await expect(animationCard).toBeVisible()

    // Get the initial button text - button contains text that includes "Animation"
    const animationButton = animationCard.locator('button:has-text("Animation")').first()
    const initialButtonText = await animationButton.textContent()

    // Click the animation button
    await animationButton.click()

    // Check if the button text has changed
    const newButtonText = await animationButton.textContent()
    expect(newButtonText).not.toBe(initialButtonText)

    // Toggle should switch between "Enable Animation" and "Disable Animation"
    if (initialButtonText?.includes('Disable')) {
      expect(newButtonText).toContain('Enable')
    } else {
      expect(newButtonText).toContain('Disable')
    }
  })

  test('should replay animation when clicking replay button', async ({ page }) => {
    // Find the Animation section
    const animationTitle = page.getByText('With Animation', { exact: true })
    const animationCard = page.locator('.rounded-lg.border').filter({ has: animationTitle })
    await expect(animationCard).toBeVisible()

    // Click the replay button
    await animationCard.getByText('Replay Animation').click()

    // We can't easily test the visual animation, but we can check that the button exists and is clickable
    await expect(animationCard.getByText('Replay Animation')).toBeEnabled()
  })

  test('should toggle idle mode when clicking checkbox', async ({ page }) => {
    // Find the "With Value Display" section
    const valueDisplayTitle = page.getByText('With Value Display', { exact: true })
    const valueDisplayCard = page.locator('.rounded-lg.border').filter({ has: valueDisplayTitle })
    await expect(valueDisplayCard).toBeVisible()

    // Find the idle mode checkbox
    const idleModeCheckbox = valueDisplayCard.locator('#idle-mode')

    // Check initial state (unchecked)
    await expect(idleModeCheckbox).not.toBeChecked()

    // Click the checkbox to toggle idle mode
    await idleModeCheckbox.click()

    // Check that the checkbox is now checked
    await expect(idleModeCheckbox).toBeChecked()
  })

  test('should display different gauge sizes', async ({ page }) => {
    // Find the Different Sizes section
    const sizesTitle = page.getByText('Different Sizes', { exact: true })
    const sizesCard = page.locator('.rounded-lg.border').filter({ has: sizesTitle })
    await expect(sizesCard).toBeVisible()

    // Check that all four sizes (XS, SM, MD, LG) are displayed
    await expect(sizesCard.getByText('XS', { exact: true })).toBeVisible()
    await expect(sizesCard.getByText('SM', { exact: true })).toBeVisible()
    await expect(sizesCard.getByText('MD', { exact: true })).toBeVisible()
    await expect(sizesCard.getByText('LG', { exact: true })).toBeVisible()

    // Check that there are 4 gauge SVGs
    const gaugeSVGs = sizesCard.locator('svg')
    await expect(gaugeSVGs).toHaveCount(4)
  })

  test('should display different gauge variants', async ({ page }) => {
    // Find the Different Variants section
    const variantsTitle = page.getByText('Different Variants', { exact: true })
    const variantsCard = page.locator('.rounded-lg.border').filter({ has: variantsTitle })
    await expect(variantsCard).toBeVisible()

    // Check that both variants (Ascending and Descending) are displayed
    await expect(variantsCard.getByText('Ascending', { exact: true })).toBeVisible()
    await expect(variantsCard.getByText('Descending', { exact: true })).toBeVisible()

    // Check that there are 2 gauge SVGs
    const gaugeSVGs = variantsCard.locator('svg')
    await expect(gaugeSVGs).toHaveCount(2)
  })

  test('should display custom colors', async ({ page }) => {
    // Find the Custom Colors section
    const customColorsTitle = page.getByText('Custom Colors', { exact: true })
    const customColorsCard = page.locator('.rounded-lg.border').filter({ has: customColorsTitle })
    await expect(customColorsCard).toBeVisible()

    // Check that there are 3 gauge SVGs with different colors
    const gaugeSVGs = customColorsCard.locator('svg')
    await expect(gaugeSVGs).toHaveCount(3)
  })

  test('should navigate to playground section', async ({ page }) => {
    // Check if the Playground section exists at the bottom of the page
    const playgroundComponent = page.locator('main').getByText('Playground')

    // Scroll to the Playground section
    await playgroundComponent.scrollIntoViewIfNeeded()

    // Check that the Playground section is visible
    await expect(playgroundComponent).toBeVisible()
  })

  test('should display gauges with different arc priorities', async ({ page }) => {
    // Find the Arc Priority section
    const arcPriorityTitle = page.getByText('Arc Priority', { exact: true })
    const arcPriorityCard = page.locator('.rounded-lg.border').filter({ has: arcPriorityTitle })
    await expect(arcPriorityCard).toBeVisible()

    // Check that all five values are displayed (48, 49, 50, 51, 52)
    const values = ['48', '49', '50', '51', '52']

    // Verify we have 5 gauges in the Arc Priority section
    const gauges = arcPriorityCard.locator('svg')
    await expect(gauges).toHaveCount(5)

    // Check that each gauge container has a span with the value
    for (const value of values) {
      await expect(arcPriorityCard.locator(`span`).filter({ hasText: value })).toBeVisible()
    }
  })

  test('should display gauges with different gap percentages', async ({ page }) => {
    // This test verifies that gauges with different gap percentages are displayed

    // Find the Gap Percentages section
    const gapPercentTitle = page.getByText('Different Gap Percentages', { exact: true })
    const gapPercentCard = page.locator('.rounded-lg.border').filter({ has: gapPercentTitle })
    await expect(gapPercentCard).toBeVisible()

    // Check that all three percentages are displayed
    await expect(gapPercentCard.getByText('5%', { exact: true })).toBeVisible()
    await expect(gapPercentCard.getByText('10%', { exact: true })).toBeVisible()
    await expect(gapPercentCard.getByText('20%', { exact: true })).toBeVisible()

    // Check that there are 3 gauge SVGs in the card
    const gaugeSVGs = gapPercentCard.locator('svg')
    await expect(gaugeSVGs).toHaveCount(3)
  })
})
