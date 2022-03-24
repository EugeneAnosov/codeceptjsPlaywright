import { test } from "@playwright/test";
import { LoginPage } from "../../page-objects/LoginPage";
import { HomePage } from "../../page-objects/HomePage";
import { NavBar } from "../../page-objects/components/NavBar";
import { TransferFunds } from "../../page-objects/TransferFunds";

test.describe('Transfer Funds and Make Payments', () => {
    let loginPage: LoginPage
    let homePage: HomePage
    let navBar: NavBar
    let transferFunds: TransferFunds

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        homePage = new HomePage(page)
        navBar = new NavBar(page)

        await homePage.visit()
        await homePage.clickOnSignin()
        await loginPage.login('username', 'password')
    })

    test('Transfer Funds', async ({}) => {
        await navBar.clickOnTab('Transfer Funds')
        await transferFunds.createTransfer()
        await transferFunds.assertBoardMessage()
        await transferFunds.submitTransfer()
        await transferFunds.assertSuccessMessage()
    })
})