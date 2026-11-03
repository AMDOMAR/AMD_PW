import {test, expect} from '@playwright/test';

test('TestFrames', async ({ page }) =>{

    await page.goto('https://demoqa.com/frames');
    const frame1 = page.frameLocator('#frame1');
    const frame1heading = frame1.getByRole('heading', {name: 'This is a sample page', level: 1});
    const frame2 = page.frameLocator('#frame2');
    const frame2heading = frame2.getByRole('heading', {name: 'This is a sample page', level: 1});
    await expect(frame1heading).toHaveText('This is a sample page');
    await expect(frame2heading).toHaveText('This is a sample page');
    const frame1h = await frame1heading.textContent();
    const frame2h = await frame2heading.textContent();
    console.log(frame1h, frame2h);
})