import {test} from "@playwright/test";

test.skip("Selectors", async ({page}) => {
    // text
    await page.click('text=some text')
    // Css Selectors
    await page.click('button')
    await page.click('#id')
    await page.click('.class')

    // Only visible Css Selector
    await page.click('.submit-button:visible')

    // Combinations
    await page.click(('#username .first'))

    // XPath
    await page.click('//button')
});