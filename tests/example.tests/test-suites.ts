import {expect, test} from "@playwright/test";

test.describe("My First Testsuite", () => {
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
})