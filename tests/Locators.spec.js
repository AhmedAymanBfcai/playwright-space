import { test, expect } from "@playwright/test";

test("Test Log In", async ({ page }) => {
  const url = "https://demoblaze.com/index.html";

  await page.goto(url);
  await page.click("id=login2");
  await page.fill("#loginusername", "testuser");
  await page.fill("#loginpassword", "testpass");
  await page.click("text=Log in");
});

test("LocateMultipleElements", async ({ page }) => {
  const url = "https://demoblaze.com/index.html";
  const productsSelector = "//div[@id='tbodyid']//div//h4/a";

  await page.goto(url);
  await page.waitForSelector(productsSelector);
  const productLinks = await page.$$(productsSelector);
  //  const products = await page.$$('#tbodyid .card');
  for (const link of productLinks) {
    const text = await link.textContent();
    console.log(text);
  }
});

test("Buit in Locators", async ({ page }) => {
  const url =
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";

  await page.goto(url);
  const logo = page.getByAltText("company-branding");
  await expect(logo).toBeVisible();

  await page.getByPlaceholder("Username").fill("Admin");
  await page.getByPlaceholder("Password").fill("admin123");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page).toHaveURL(
    "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index"
  );
});
