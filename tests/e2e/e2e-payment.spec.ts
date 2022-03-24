import {test, Page} from '@playwright/test'
import { HomePage } from "../../page-objects/HomePage";
import { LoginPage } from "../../page-objects/LoginPage";
import { PaymentPage } from "../../page-objects/PaymentPage";
import { NavBar } from "../../page-objects/components/NavBar";

test.describe('New Payment', () => {
  let homePage: HomePage
  let loginPage: LoginPage
  let paymentPage: PaymentPage
  let navBar: NavBar

  test.beforeEach(async ({page}) => {
    homePage = new HomePage(page)
    loginPage = new LoginPage(page)
    paymentPage = new PaymentPage(page)
    navBar = new NavBar(page)

    await homePage.visit()
    await loginPage.login('username', 'password')
  })

  test('Should send new payment', async ({}) => {
    await navBar.clickOnTab('Pay Bills')
    await paymentPage.createPayment()
    await paymentPage.assertSuccessMessage()
  })
})
