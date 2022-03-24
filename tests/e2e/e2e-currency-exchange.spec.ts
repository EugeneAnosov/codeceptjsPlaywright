import {test, expect} from '@playwright/test'
import {LoginPage} from "../../page-objects/LoginPage";
import {HomePage} from "../../page-objects/HomePage";
import {NavBar} from "../../page-objects/components/NavBar";

test.describe('Currency Exchange Form', () => {
    let loginPage: LoginPage
    let homepage: HomePage
    let navBar: NavBar

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page)
        homepage = new HomePage(page)
        navBar = new NavBar(page)

        await homepage.visit()
        await homepage.clickOnSignin()
        await loginPage.login('username', 'password')
    })

    test('Should make currency exchange', async ({page}) => {
        await navBar.clickOnTab('Pay Bills')
        await page.click('text=Purchase Foreign Currency')
        await page.selectOption('#pc_currency', 'EUR')

        const rate = await page.locator('#sp_sell_rate')
        await expect(rate).toContainText('1 euro (EUR)')

        await page.type('#pc_amount', '1000')
        await page.click('#pc_inDollars_true')
        await page.click('#pc_calculate_costs')

        const conversionAmount = await page.locator('#pc_conversion_amount')
        await expect(conversionAmount).toContainText('1000.00 U.S. dollar (USD)')

        await page.click('#purchase_cash')

        const message = await page.locator('#alert_content')
        await expect(message).toBeVisible()
        await expect(message).toContainText(
            'Foreign currency cash was successfully purchased'
        )
    })
})
