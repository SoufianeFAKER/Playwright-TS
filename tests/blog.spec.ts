import { test, expect } from '@playwright/test';
import BlogPage from '../pages/blog.page';


test.describe('Blog Page', () => {

    let blogPage: BlogPage;

    test('Verify Recent Posts count and verify the length of each list item', async ({ page }) => {

        blogPage = new BlogPage(page);

        // open blog Page
        // await page.goto('https://practice.sdetunicorns.com/blog')
        await blogPage.navigate();

        // get the recent post list elements
        // const recentPostsList = page.locator('#recent-posts-3 ul li')

        // loop through th list ans assert the char length > 10
        for (const elem of await blogPage.recentPostsList.elementHandles()) {
            console.log((await elem.textContent())?.trim())
            expect(((await elem.textContent())?.trim())?.length).toBeGreaterThan(10)
        }

        // assert the total length = 5
        expect(await blogPage.recentPostsList.count()).toEqual(5)
        
    });
    
    
});
