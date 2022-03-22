import {test} from "@playwright/test";

test.describe.only('Hooks', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://example.com')
    })

    test('Screenshots', async ({ page }) => {
        // 1. Load a website
        //await page.goto('https://example.com')
        // 2. Take a screenshot of full page
        await page.screenshot({ path: 'screenshot.png', fullPage: true })
    })

    test('Single Element Screenshot', async ({ page }) => {
        //await page.goto('https://example.com')
        const element = await page.$('h1')
        await element.screenshot({ path: 'single_element_screenshot.png' })
    })
})