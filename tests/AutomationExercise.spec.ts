import { test, expect } from '@playwright/test';

test ('AddProductToCart', async ({ page }) => {

await page.goto("https://automationexercise.com/");
const LogoImage = page.getByAltText("Website for automation practice");
await expect(LogoImage).toBeVisible();
const WomenSelection = page.locator('#Women');
await WomenSelection.click();
await WomenSelection.getByRole('link', {name: 'Dress'});

}
)