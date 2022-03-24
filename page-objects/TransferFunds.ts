import { expect, Locator, Page } from "@playwright/test";

export class TransferFunds {
    readonly page: Page
    readonly fromAccountSelectBox: Locator
    readonly toAccountSelectBox: Locator
    readonly amountInput: Locator
    readonly descriptionInput: Locator
    readonly submitTransferButton: Locator
    readonly boardHeaderMessage: Locator
    readonly successMessage: Locator

    constructor(page: Page) {
        this.page = page
        this.fromAccountSelectBox = page.locator('#tf_fromAccountId')
        this.toAccountSelectBox = page.locator('##tf_toAccountId')
        this.amountInput = page.locator('#tf_amount')
        this.descriptionInput = page.locator('#tf_description')
        this.submitTransferButton = page.locator('#btn_submit')
        this.boardHeaderMessage = page.locator('h2.board-header')
        this.successMessage = page.locator('.alert-success')
    }

    async createTransfer() {
        await this.fromAccountSelectBox.selectOption('2')
        await this.fromAccountSelectBox.selectOption('3')
        await this.amountInput.type('500')
        await this.descriptionInput.type('Test message')
    }

    async submitTransfer() {
        await this.submitTransferButton.click()
    }

    async assertBoardMessage() {
        await expect(this.boardHeaderMessage).toBeVisible()
        await expect(this.boardHeaderMessage).toContainText('Verify')
    }

    async assertSuccessMessage() {
        await expect(this.successMessage).toBeVisible()
        await expect(this.successMessage).toContainText('You successfully submitted your transaction')
    }
}