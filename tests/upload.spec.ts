/*!
 * Copyright (C) Microsoft Corporation. All rights reserved.
 */

import { test, expect } from "@playwright/test";
import CartPage from "../pages/cart.page";
const path = require("path");

test.describe("Upload File", () => {
  let cartPage: CartPage;

  const fileName = ["logotitle.png", "3mb-file.pdf"];

  for (const file of fileName) {
    test(`should upload a ${file} file`, async ({ page }) => {
      cartPage = new CartPage(page);

      // open url
      // await page.goto("https://practice.sdetunicorns.com/cart");
      await cartPage.navigateToCartPage();

      // provide test file path
      const filePath = path.join(__dirname, `../data/${file}`);

      // upload test file
      // await page.setInputFiles("input#upfile_1", filePath); // il faut avoir un input de type 'file'

      // click the submit button
      // await page.locator("#upload_1").click();

      cartPage.uploadComponent().uploadFile(filePath);

      // assertion
      await expect(
        // page.locator("#wfu_messageblock_header_1_label_1")
        cartPage.uploadComponent().successTxt
      ).toContainText("uploaded successfully", {timeout: 10000});
    });
  }

  test.skip("should upload a test file on a hidden input field", async ({
    page,
  }) => {
    // open url
    await page.goto("https://practice.sdetunicorns.com/cart");

    // provide test file path
    const filePath = path.join(__dirname, "../data/logotitle.png");

    // DOM manipulation
    await page.evaluate(() => {
      const selector = document.querySelector("input#upfile_1");
      if (selector) {
        selector.className = "";
      }
    });

    // upload test file
    await page.setInputFiles("input#upfile_1", filePath); // il faut avoir un input de type 'file'

    // click the submit button
    await page.locator("#upload_1").click();

    // assertion
    await expect(
      page.locator("#wfu_messageblock_header_1_label_1")
    ).toContainText("uploaded successfully");
  });

  test.skip("should upload a test file with Wait commands", async ({ page }) => {
    // open url
    await page.goto("https://practice.sdetunicorns.com/cart");

    // provide test file path
    const filePath = path.join(__dirname, "../data/3mb-file.pdf");

    // upload test file
    await page.setInputFiles("input#upfile_1", filePath); // il faut avoir un input de type 'file'

    // click the submit button
    await page.locator("#upload_1").click();

    // hardcoded sleep - WRONG WAY
    //await page.waitForTimeout(5000);

    // wait for condition
    // await page.locator('#wfu_messageblock_header_1_1').waitFor({ state: 'visible', timeout: 10000 });

    // assertion
    await expect(page.locator("#wfu_messageblock_header_1_1")).toContainText(
      "uploaded successfully",
      { timeout: 10000 }
    );
  });
});
