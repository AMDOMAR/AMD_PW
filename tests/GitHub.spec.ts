import { test, expect } from '@playwright/test';

  test('LoginToGitHub', async ({page}) => {
    
    const Email = "amd@gmail.com";
    const Password = "amd123";
    await page.goto('https://github.com/');
    const GitHubIcon = page.getByRole('banner').getByRole('link', {name: 'Homepage'})
    await expect(GitHubIcon).toBeVisible();
    await page.getByRole('link', {name: 'Sign in'}).click();
    const signInHeading = page.getByRole('heading', { name: 'Sign in to GitHub'});
    await expect(signInHeading).toBeVisible();
    await page.getByRole('textbox', {name: 'Username or email address'}).fill(Email);
    await page.getByRole('textbox', {name: 'Password'}).fill(Password);
    await page.getByRole('button', {name: 'Sign in'}).click();
    await expect(page.getByRole('alert')).toHaveText('Incorrect username or password.');

  })


