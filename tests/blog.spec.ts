import { test, expect } from '@playwright/test';
import BlogPage from '../pages/blog.page';

test.describe('Blog', () => {
let blogPage: BlogPage;

    test('Verify Recent Posts count and verify the lenght of each list item', async ({ page }) => {
        blogPage = new BlogPage(page);

        // Open url
        //await page.goto('https://practice.sdetunicorns.com/blog/')
        await blogPage.navigate();

        // Get the recent post list elements
        //const recentPostsList = page.locator('#recent-posts-3 ul li')

        // Loop through the list and assert the char length > 10
        for (const el of await blogPage.recentPostsList.elementHandles()) {
            console.log((await el.textContent())?.trim()?.length);
            expect((await el.textContent())?.trim()?.length).toBeGreaterThan(10);
        }

        // Assert the total length = 5
        expect(await blogPage.recentPostsList.count()).toEqual(5);

    })
    
})


