import { test, expect } from '@playwright/test';
test('pages fit desktop and mobile viewports', async ({page}) => {
  for (const width of [360,390,768,1440]) {
    await page.setViewportSize({width,height:900});
    for (const route of ['/', '/contact/', '/services/property-security/']) {
      await page.goto(route);
      await expect(page.locator('h1')).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
    }
  }
});
test('mobile menu opens and closes after navigation', async ({page}) => {
  await page.setViewportSize({width:390,height:844});
  await page.goto('/');
  await page.locator('summary').click();
  await page.getByRole('navigation',{name:'Mobile navigation'}).getByRole('link',{name:'Services',exact:true}).click();
  await expect(page.locator('.mobile-menu')).not.toHaveAttribute('open','');
  await expect(page).toHaveURL(/#services$/);
});
test('service selection carries into form; demo validates without sending', async ({page}) => {
  const errors:string[]=[];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto('/services/patrol-services/');
  await page.getByRole('link',{name:'Discuss your needs'}).click();
  await expect(page.getByLabel('What can we help with?')).toHaveValue('patrol-services');
  await expect(page.getByRole('button',{name:'Preview consultation request'})).toBeEnabled();
  await page.getByRole('button',{name:'Preview consultation request'}).click();
  await expect(page.getByRole('status')).toHaveCount(0);
  await page.getByLabel('Your name').fill('Alex Example');
  await page.getByLabel('Email address').fill('not-an-email');
  await page.getByRole('button',{name:'Preview consultation request'}).click();
  await expect(page.getByRole('status')).toHaveCount(0);
  await page.getByLabel('Email address').fill('alex@example.com');
  const requests:string[]=[];
  page.on('request',request => requests.push(request.url()));
  await page.getByRole('button',{name:'Preview consultation request'}).click();
  await expect(page.getByRole('status')).toContainText('No data was sent or saved.');
  expect(requests).toEqual([]);
  expect(errors).toEqual([]);
});
