const test = require("@playwright/test");
const { expect } = require("@playwright/test");

test("Browser Context should be done by default or mannual", async ({
  browser,
}) => {
  // Chrome - Plugins - Cookies - Cache

  // Open a new browser context.
  const context = await browser.newContext();

  // Create a new page in the context.
  const page = await context.newPage();

  await page.goto("https://playwright.dev/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test("User should be able to login", async ({ page }) => {
  const url = "https://rahulshettyacademy.com/loginpagePractise/";
  await page.goto(url);

  await page.fill("#username", "rahulshettyacademy");
  await page.fill("#password", "learning");

  await page.locator(".radiotextsty").last().click();
  await page.locator("#okayBtn").click();

  await expect(page.locator(".radiotextsty").last()).toBeChecked();
  await expect(page.locator(".radiotextsty").first()).not.toBeChecked();
  await expect(page.locator(".radiotextsty").last()).toHaveValue("user");

  await page.locator("#terms").click();
  await expect(page.locator("#terms")).toBeChecked();
  await expect(page.locator("#terms")).toHaveValue("on");

  const dropdown = page.locator("select.form-control");
  await dropdown.selectOption("Student");
  expect(dropdown).toHaveValue("stud");

  const documentLink = page.locator("a[href*='documents-request']");
  await expect(documentLink).toHaveAttribute("class", "blinkingText");

  await page.click("#signInBtn");
  // page.pause();

  await page.waitForLoadState("networkidle");

  await expect(page).toHaveURL(
    "https://rahulshettyacademy.com/angularpractice/shop"
  );
});

test("Child window handling", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const url = "https://rahulshettyacademy.com/loginpagePractise/";
  const documentLink = page.locator("a[href*='documents-request']");

  await page.goto(url);

  const [newPage] = await Promise.all([
    context.waitForEvent("page"), // Wait for new page to open
    await documentLink.click(),
  ]);

  await newPage.waitForLoadState("networkidle");
  await expect(newPage).toHaveURL(
    "https://rahulshettyacademy.com/documents-request"
  );

  const text = await newPage.locator(".red").textContent();
  expect(text).toContain("Please email us at mentor@rahulshettyacademy.com");
});
