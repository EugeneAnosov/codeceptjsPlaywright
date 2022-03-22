import { test, expect} from '@playwright/test'

import { loadHomepage, assertTitle } from './helpers'

test('Simple Basic Test', async ({ page }) => {
    await page.goto("https://www.example.com")
    const  pageTitle = await page.locator('h1')
    await expect(pageTitle).toContainText('Example Domain')
})

test('Click on the Elements', async ({ page}) => {
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.click('#signin_button')
        await page.click('text=Sign In')

        const errorMessage = await page.locator('.alert-error')
        await expect(errorMessage).toContainText('Login and/or password are wrong.')
})

test("Working with Inputs", async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.click("#signin_button")

        await page.type('#user_login', 'some username')
        await page.type('#user_password', 'some password')
        await page.click('text=Sign In')

        const errorMessage = await page.locator('.alert-error')
        await expect(errorMessage).toContainText('Login and/or password are wrong.')
})

test.describe.parallel.only('Hooks', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://example.com')
    })

    test('Screenshots', async ({ page }) => {
        // 1. Load a website
        // 2. Take a screenshot of full page
        await page.screenshot({ path: 'screenshot.png', fullPage: true })
    })

    test('Single Element Screenshot', async ({ page }) => {
        const element = await page.$('h1')
        await element.screenshot({ path: 'single_element_screenshot.png' })
    })
})

test('Custom Helpers', async ({ page }) => {
    await loadHomepage(page)
    // await page.pause()
    await assertTitle(page)
})

//npx playwright test --browser=firefox --headed
