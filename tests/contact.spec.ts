import { test, expect } from "@playwright/test";
import ContactPage from "../pages/contact.page";

import { faker } from "@faker-js/faker";

test.describe("Contact Page", () => {
  let contactPage: ContactPage;

  test("Fill contact form and verify success message", async ({ page }) => {
    contactPage = new ContactPage(page);

    //page.pause()
    //await page.waitForTimeout(5000)

    // open contact Page
    // await page.goto('https://practice.sdetunicorns.com/contact')
    await contactPage.navigate();

    // await page.pause()

    // fill out the input fields & submit
    await contactPage.submitForm(
      // "Test Name",
      // "test@gmail.com",
      // "123456789",
      // "Hello! this is taking advantage of POM"
      faker.person.fullName(),
      faker.internet.email(),
      faker.phone.number(),
      faker.lorem.paragraphs(2)
    );

    // add a soft assertion
    // await expect.soft(page.locator('.contact-message textarea')).toHaveText("Fail test message")

    //click submit
    // await page.locator('button[type=submit]').click()
    // await contactPage.submitBtn.click();

    // expect(test.info().errors.length).toBeLessThan(1)

    // verify success message
    // const successAlert = page.locator("div[role='alert']")
    await expect(contactPage.successTxt).toHaveText(
      "Thanks for contacting us! We will be in touch with you shortly"
    );
  });
});
