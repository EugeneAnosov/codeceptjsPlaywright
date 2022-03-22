import { test, expect } from "@playwright/test";

test.describe.parallel('Feedback Form', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/')
        await page.click('#feedback')
    })

    // Reset Feedback Form
    test('Reset Feedback Form', async ({ page }) => {
        await page.type('#name', 'some name')
        await page.type('#email', 'some email@email.com')
        await page.type('#subject', 'some subject')
        await page.type('#comment', 'some comment')
        await page.click("input[name='clear']")

        const nameInput = await page.locator('#name')
        const commentInput = await page.locator('#comment')
        await expect(nameInput).toBeEmpty()
        await expect(commentInput).toBeEmpty()
    })
    // Submit Feedback Form
    test('Submit Feedback form', async ({ page }) => {
        await page.type('#name', 'some name')
        await page.type('#email', 'some email@email.com')
        await page.type('#subject', 'some subject')
        await page.type('#comment', 'some comment')
        await page.click("input[type='submit']")
        await page.waitForSelector('#feedback-title')
    })
})