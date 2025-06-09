const { test, expect } = require("@playwright/test");

test("Home Page", async ({ page }) => {
  const url = "https://demoblaze.com/index.html";

  //const pageTitle = page.title();
  //await expect(pageTitle).toBe("STORE");

  await page.goto(url);
  await expect(page).toHaveURL(url);
  await expect(page).toHaveTitle("STORE");
});
