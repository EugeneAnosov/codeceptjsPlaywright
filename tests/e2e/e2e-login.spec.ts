import {test, expect} from "@playwright/test";
import {LoginPage} from "../../page-objects/LoginPage";
import {HomePage} from "../../page-objects/HomePage"

test.describe.parallel.only('Login / Logout Flow', () => {
    let loginPage: LoginPage
    let homePage: HomePage

    // Before Hook
    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page)
        homePage = new HomePage(page)

        await homePage.visit()
    })
    // Negative scenario
    test('Negative Scenario for Login', async ({}) => {
        await homePage.clickOnSignin()
        await loginPage.login('invalid username', 'invalid password')
        await loginPage.wait(3000)
        await loginPage.assertErrorMessage()
    })
    // Positive Scenario + Logout
    test('Positive Scenario + Logout', async ({page}) => {
        await homePage.clickOnSignin()
        await loginPage.login('username', 'password')

        const accountSummaryTab = await page.locator('#account_summary_tab')
        //await expect(accountSummaryTab).toBeVisible()

        await page.goto('http://zero.webappsecurity.com/logout.html')
        await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html')
    })
})