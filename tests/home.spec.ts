import { test, expect } from "@playwright/test";
import HomePage from "../pages/home.page";

test.describe("Home", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
  });

  test("Open HomePage and verify title", async ({ page }) => {
    // homePage = new HomePage(page);

    // open url
    // await page.goto('https://practice.sdetunicorns.com/')
    // await homePage.navigate();

    // verify title
    await expect(page).toHaveTitle("Practice E-Commerce Site – SDET Unicorns");
  });

  test.skip("Open About page and verify title", async ({ page }) => {
    // open url
    // await page.goto('/about');
    await homePage.navigate();

    // verify title
    await expect(page).toHaveTitle("About – Practice E-Commerce Site");
  });

  test("Click get started button using CSS Selector", async ({ page }) => {
    // homePage = new HomePage(page);

    // open url
    // await page.goto('https://practice.sdetunicorns.com');
    // await homePage.navigate();

    await expect(page).not.toHaveURL(/.*#get-started/);

    // click the button
    // await page.locator('#get-started').click();
    await homePage.getStartedBtn.click();

    // verify url has #get-started
    await expect(page).toHaveURL(
      "https://practice.sdetunicorns.com/#get-started"
    );
    await expect(page).toHaveURL(/.*#get-started/); // using regular expression
  });

  test("Verify heading text is visible using text selector", async ({ page }) => {
    // homePage = new HomePage(page);
    // open url
    // await page.goto("https://practice.sdetunicorns.com");

    // find the text locator
    // const headingText = page.locator('text=Think different. Make different.')
    const headingText = homePage.headingText;

    // verify heading text is visible
    await expect(headingText).toBeVisible();
  });

  test("Verify home link is enabled using text and css selector", async ({ page }) => {
    // homePage = new HomePage(page);

    // open url
    // await page.goto('https://practice.sdetunicorns.com');
    // await homePage.navigate();

    // find the home text
    // const homeText = await page.locator('#menu-item-489 >> text=Home')
    // const homeText = page.locator('#menu-item-489:has-text("Home")')
    const homeText = homePage.homeLink;

    // verify home text is enabled
    await expect(homeText).toBeEnabled();
  });

  test("Verify search icon is visible using xpath selector", async ({
    page,
  }) => {
    // homePage = new HomePage(page);

    // open url
    // await page.goto('https://practice.sdetunicorns.com');
    // await homePage.navigate();

    // find the search icon
    // const searchIcon = page.locator("//div[@class='zak-header-actions zak-header-actions--desktop']//a[@class='zak-header-search__toggle']//*[name()='svg']")
    const searchIcon = homePage.searchIcon;

    // verify search icon is visible
    await expect(searchIcon).toBeVisible();
  });

  test("Verify text of all nav links", async ({ page }) => {
    // homePage = new HomePage(page);

    const expectedLinks = [
      "Home",
      "About",
      "Shop",
      "Blog",
      "Contact",
      "My account",
    ];

    // open url
    // await page.goto('https://practice.sdetunicorns.com');
    // await homePage.navigate();

    // find the nav links
    // const navLinks = page.locator('#zak-primary-menu li[id*=menu]')
    // const navLinks = homePage.navLinks;

    // find the 3rd element
    // const elem = page.locator('#zak-primary-menu li[id*=menu]').nth(3) // first(), last()

    // verify nav links text
    // expect(await navLinks.allTextContents()).toEqual(expectedLinks);
    expect(await homePage.getNavLinksText()).toEqual(expectedLinks);

    // verify 3rd element text
    // expect(await elem.textContent()).toEqual(expectedLinks[3]);

    // print out all the links // forof
    // for (const el of await navLinks.elementHandles()) {
    //     console.log(await el.textContent())
    // }
  });

  test.describe("Exercise", () => {
    test("Exercise 1", async ({ page }) => {
      await page.goto("https://practice.sdetunicorns.com/");

      await page
        .locator("#menu-item-493")
        .getByRole("link", { name: "Contact" })
        .click();

      await page
        .getByRole("textbox", { name: "Name *" })
        .fill("Soufiane FAKER");
      await page
        .getByRole("textbox", { name: "Email *" })
        .fill("sfaker@yahoo.fr");
      await page.getByRole("textbox", { name: "Phone *" }).fill("+21697564144");
      await page
        .getByRole("textbox", { name: "Message" })
        .fill("I am a QA Engineer");
      await page.getByRole("button", { name: "Submit" }).click();

      const msgBox = page.locator(".everest-forms-notice--success");
      expect(await msgBox.textContent()).toContain(
        "Thanks for contacting us! We will be in touch with you shortly"
      );
    });
  });
});
