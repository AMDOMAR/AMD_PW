import { test, expect } from '@playwright/test';

test.describe('Public entry and account access', () => {
  test('Change sign-in page language', async ({ page }) => {
    // Starting state: clean signed-out browser session on Gmail sign-in page. Navigate to Gmail.
    await page.goto('https://www.gmail.com');

    // Open the sign-in page language selector
    await page.getByRole('combobox', { name: 'Change language English (' }).click();

    // Choose another supported locale, Français (France), from the language list
    await page.getByRole('option', { name: 'Français (France)' }).click();
    await expect(page.getByRole('heading', { name: 'Connexion' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Suivant' })).toBeVisible();
    await expect(page.getByRole('combobox', { name: 'Changer de langue Français (France)' })).toBeVisible();

    // Open the language selector to restore English (United States)
    await page.getByRole('combobox', { name: 'Changer de langue Français (France)' }).click();

    // Restore the default English (United States) locale
    await page.getByRole('option', { name: 'English (United States)' }).click();
    await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Next' })).toBeVisible();
    await expect(page.getByRole('combobox', { name: 'Change language English (United States)' })).toBeVisible();
  });
});
