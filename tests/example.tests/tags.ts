import {expect, test} from "@playwright/test";

test('Click on the Elements @elements', async ({ page}) => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.click('#signin_button')
    await page.click('text=Sign In')

    const errorMessage = await page.locator('.alert-error')
    await expect(errorMessage).toContainText('Login and/or password are wrong.')
})

// npx playwright test --grep @elements
// opposite: //npx playwright test --grep-invert @elements
