import { test, expect } from '@playwright/test'

test.describe('Playground Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display the playground section', async ({ page }) => {
    await expect(page.locator('h2')).toContainText('Playground')
    await expect(page.locator('p.text-muted-foreground.mb-6')).toContainText(
      'Play with the configuration of the Gauge',
    )
  })

  test('should have working gauge controls', async ({ page }) => {
    // Check initial value
    const valueInput = page.locator('input[type="number"]').first()
    await expect(valueInput).toHaveValue('72')

    // Test value change
    await valueInput.fill('85')
    await expect(valueInput).toHaveValue('85')

    // Test size selection (custom select)
    const sizeTrigger = page.locator('button[data-slot="select-trigger"]')
    await sizeTrigger.click()
    const sizeOption = page.getByRole('option', { name: '240' })
    await sizeOption.click()
    await expect(sizeTrigger).toContainText('240')

    // Test gap percent
    const gapInput = page
      .locator('label:has-text("Gap Percent")')
      .locator('..')
      .locator('input[type="number"]')
    await gapInput.fill('10')
    await expect(gapInput).toHaveValue('10')

    // Test stroke width
    const strokeInput = page
      .locator('label:has-text("Stroke Width")')
      .locator('..')
      .locator('input[type="number"]')
    await strokeInput.fill('10')
    await expect(strokeInput).toHaveValue('10')

    // Test variant toggle
    const descendingButton = page.locator('button[aria-label="Toggle descending"]')
    await descendingButton.click()
    await expect(descendingButton).toHaveAttribute('data-state', 'on')

    // Test color inputs
    const primaryColorInput = page
      .locator('label:has-text("Primary")')
      .locator('..')
      .locator('input[type="color"]')
    await primaryColorInput.fill('#FF0000')
    await expect(primaryColorInput).toHaveValue('#FF0000')

    const secondaryColorInput = page
      .locator('label:has-text("Secondary")')
      .locator('..')
      .locator('input[type="color"]')
    await secondaryColorInput.fill('#0000FF')
    await expect(secondaryColorInput).toHaveValue('#0000FF')
  })

  test('should have working checkboxes', async ({ page }) => {
    // Test show value checkbox
    const showValueCheckbox = page.locator('#showValue')
    await showValueCheckbox.check()
    await expect(showValueCheckbox).toHaveAttribute('data-state', 'checked')

    // Test show animation checkbox
    const showAnimationCheckbox = page.locator('#showAnimation')
    await showAnimationCheckbox.check()
    await expect(showAnimationCheckbox).toHaveAttribute('data-state', 'checked')

    // Test idle mode checkbox
    const idleModeCheckbox = page.locator('#idleMode')
    await idleModeCheckbox.check()
    await expect(idleModeCheckbox).toHaveAttribute('data-state', 'checked')
  })

  test('should have working replay animation button', async ({ page }) => {
    const replayButton = page.locator('#playground button:has-text("Replay Animation")')
    await expect(replayButton).toBeEnabled()
    await replayButton.click()
    await expect(page.locator('button:has-text("Animating...")')).toBeVisible()
  })

  test('should copy config to clipboard', async ({ page }) => {
    const copyButton = page.locator('button:has-text("Copy Config")')
    await copyButton.click()

    // Check if toast notification appears
    await expect(page.locator('[role="status"]')).toBeVisible()
    await expect(page.locator('[role="status"]')).toContainText(
      'Ready-to-use Gauge component has been copied to clipboard',
    )
  })
})
