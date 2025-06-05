import { test, expect, request } from "@playwright/test";

test("Login API should return token for valid credentials", async () => {
  const apiContext = await request.newContext();
  const response = await apiContext.post(
    "https://practice.expandtesting.com/login",
    {
      data: {
        username: "practice",
        password: "SuperSecretPassword!",
      },
    }
  );

  expect(response.ok()).toBeTruthy();
  const responseBody = await response.json();

  expect(responseBody).toHaveProperty("token"); // If token is returned
  console.log("Login Response:", responseBody);
});
