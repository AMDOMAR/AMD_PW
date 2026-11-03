import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.kapruka.com/');
  await page.getByRole('link', { name: 'Flowers Image Flowers' }).click();
  await page.getByRole('link', { name: 'Plants' }).click();
  await page.getByRole('link', { name: 'Naminan Plant With A' }).click();
  await page.getByText('Details').click();
  await page.getByText('Q&A').click();
  await page.getByRole('link', { name: 'Plants', exact: true }).click();
  await page.getByRole('link', { name: 'Flower Bouquets' }).click();
  await page.getByRole('link', { name: 'On Sale' }).click();
  
});
