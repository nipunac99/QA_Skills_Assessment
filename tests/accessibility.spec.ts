import { test, expect } from '@playwright/test';
import { SearchPage } from '../pages/SearchPage';
import { ProductPage } from '../pages/ProductPage';
import { testData } from '../utils/testData';

test.describe('Accessibility Tests', () => {
  test('TC-025: Verify Keyboard Navigation', async ({ page }) => {
    const searchPage = new SearchPage(page);
    const productPage = new ProductPage(page);
    
    await searchPage.navigate();
    await searchPage.searchProduct(testData.searchTerms.wallet);
    await searchPage.clickFirstResult();
    
    await productPage.scrollToRelatedProducts();
    
   
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(['A', 'BUTTON']).toContain(focusedElement);
    
    
    const initialUrl = page.url();
    await page.keyboard.press('Enter');
    
    await page.waitForLoadState('networkidle');
    expect(page.url()).not.toBe(initialUrl);
  });
});
