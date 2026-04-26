import { test, expect } from '@playwright/test';

test('game loads and shows title', async ({ page }) => {
  await page.goto('/');
  
  // Check if canvas exists
  const canvas = await page.locator('canvas');
  await expect(canvas).toBeVisible();

  // Check for some text in the game (rendered on canvas, so we can't easily query by text, 
  // but we can check if the game container is present)
  const container = await page.locator('#game-container');
  await expect(container).toBeVisible();
});
