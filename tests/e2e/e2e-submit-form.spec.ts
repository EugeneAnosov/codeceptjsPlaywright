import { test } from "@playwright/test";
import {HomePage} from "../../page-objects/HomePage";
import {FeedbackPage} from "../../page-objects/FeedbackPage";

test.describe.parallel('Feedback Form', () => {

    let homepage: HomePage
    let feedbackPage: FeedbackPage

    test.beforeEach(async ({page}) => {
        homepage = new HomePage(page)
        feedbackPage = new FeedbackPage(page)

        await homepage.visit()
        await homepage.clickOnFeedbackLink()
    })

    // Reset Feedback Form
    test('Reset Feedback Form', async ({}) => {
        await feedbackPage.fillForm('name', 'email@email.com', 'subject', 'comment')
        await feedbackPage.resetForm()
        await feedbackPage.assertReset()
    })
    // Submit Feedback Form
    test('Submit Feedback form', async ({}) => {
        await feedbackPage.fillForm('name', 'email@email.com', 'subject', 'comment')
        await feedbackPage.submitForm()
        await feedbackPage.feedbackFormSent()
    })
})