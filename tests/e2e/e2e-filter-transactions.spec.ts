import { test, expect } from "@playwright/test";
import {LoginPage} from "../../page-objects/LoginPage";
import {HomePage} from "../../page-objects/HomePage";

test.describe('Filter Transaction', () => {
    let loginPage: LoginPage
    let homepage: HomePage

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        homepage = new HomePage(page)

        await homepage.visit()
        await homepage.clickOnSignin()
        await loginPage.login('username', 'password')
    })

    test('Verify the results for each accounts', async ({ page }) => {
        await page.click('#account_activity_tab')
        await page.selectOption('#aa_accountId', '2')

        const checkingAccount = await page.locator('#all_transactions_for_account tbody tr')
        await expect(checkingAccount).toHaveCount(3)

        await page.selectOption('#aa_accountId', '4')

        const loanAccount = await page.locator('#all_transactions_for_account tbody tr')
        await expect(loanAccount).toHaveCount(2)

        await page.selectOption('#aa_accountId', '6')

        const noResults = await page.locator('.well')
        await expect(noResults).toBeVisible()
    })
})