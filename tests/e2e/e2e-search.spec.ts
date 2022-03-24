import { test, expect} from "@playwright/test";
import { HomePage } from "../../page-objects/HomePage";

test.describe('Search Results', () => {
    test('Should find search results', async ({page}) => {
        let homepage: HomePage = new HomePage(page)

        await homepage.visit()
        await homepage.searchFor('bank')

        const numberOfLinks = await page.locator('li > a')
        await expect(numberOfLinks).toHaveCount(2)
        }
    )
})