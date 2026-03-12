import { test, expect } from "@playwright/test";

test("Handle multiple browser tabs", async ({ page, context }) => {

  await page.goto("https://www.amazon.in");

  await page.getByPlaceholder("Search Amazon.in").fill("Samsung Mobile");
  await page.keyboard.press("Enter");
  await page.screenshot({ path: 'screenshot/task17.png', fullPage: true });

  await page.waitForSelector('[data-component-type="s-search-result"]');

  const firstProduct = page.locator('[data-component-type="s-search-result"]').first();

  const [newTab] = await Promise.all([
    context.waitForEvent("page"),
    firstProduct.click()
  ]);

  
  await newTab.waitForLoadState();
  const title = newTab.locator("#productTitle");

  console.log(await title.textContent());

  await expect(title).toBeVisible();

  await newTab.close();

  await page.bringToFront();

});