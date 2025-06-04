const { test, expect } = require("@playwright/test");

test("@Web Client App login", async ({ page }) => {
  const email = "anshika@gmail.com";
  const password = "Iamking@000";
  const productName = "zara coat 3";

  // Go to client login page
  await page.goto("https://rahulshettyacademy.com/client");

  // Fill in credentials and login
  await page.locator("#userEmail").fill(email);
  await page.locator("#userPassword").fill(password);
  await page.locator("[value='Login']").click();
  await page.waitForLoadState("networkidle");

  // Wait for products to load
  const products = page.locator(".card-body");
  await products.first().waitFor();

  // Log all product titles
  const productTitles = await page.locator(".card-body b").allTextContents();
  console.log("Available products:", productTitles);

  // Find and add the specific product to cart
  const count = await products.count();
  for (let i = 0; i < count; i++) {
    const title = await products.nth(i).locator("b").textContent();
    if (title === productName) {
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }

  // Go to cart and validate product exists
  await page.locator("[routerlink*='cart']").click();
  await expect(page.locator(`h3:has-text('${productName}')`)).toBeVisible();

  // Checkout
  await page.locator("text=Checkout").click();
  await page.locator("[placeholder*='Country']").type("ind");

  // Wait and select "India" from dropdown
  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();
  const options = dropdown.locator("button");
  const optionsCount = await options.count();
  for (let i = 0; i < optionsCount; i++) {
    const country = await options.nth(i).textContent();
    if (country.trim() === "India") {
      await options.nth(i).click();
      break;
    }
  }

  // Validate email and submit order
  await expect(page.locator(".user__name [type='text']").first()).toHaveText(
    email
  );
  await page.locator(".action__submit").click();
  await expect(page.locator(".hero-primary")).toHaveText(
    " Thankyou for the order. "
  );

  // Capture and print order ID
  const orderId = await page
    .locator(".em-spacer-1 .ng-star-inserted")
    .textContent();
  console.log("Order ID:", orderId);

  // Go to My Orders and match the order ID
  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();

  const rows = page.locator("tbody tr");
  const rowCount = await rows.count();

  for (let i = 0; i < rowCount; i++) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }

  // Validate order ID in order details page
  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(orderId.includes(orderIdDetails)).toBeTruthy();
});
