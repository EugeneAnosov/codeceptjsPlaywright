import { test, expect} from '@playwright/test'

test("Assertions", async ({ page }) => {
    await page.goto('https:example.com')
    await expect(page).toHaveURL('https:example.com')
    await expect(page).toHaveTitle('Example Domain')

    const element = await page.locator('h1')
    await expect(element).toBeVisible()
    await expect(element).toHaveText("Example Domain")
    await expect(element).toHaveCount(1)

    const nonExistingElement = await page.locator('h5')
    await expect(nonExistingElement).not.toBeVisible()
})