import { chromium, FullConfig } from "@playwright/test";

async function globalSetup(config: FullConfig) {
  //launch browser
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Access to the page
  await page.goto("https://practice.sdetunicorns.com/my-account");
  await page.context().storageState({ path: "notLoggedInState.json" });

  // login
  await page.locator("#username").fill("practiceusertest");
  await page.locator("#password").fill("practiceusertest1!");
  await page.locator('[value="Log in"]').click();
  //   await expect(page.locator("li a[href*='logout']")).toBeVisible();

  // save Signed-in State to 'loggedInState.json'
  await page.context().storageState({ path: "loggedInState.json" });
  await browser.close();
}

export default globalSetup;
