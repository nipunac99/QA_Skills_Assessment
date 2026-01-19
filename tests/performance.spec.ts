import { test, expect } from '@playwright/test';
import { SearchPage } from '../pages/SearchPage';
import { ProductPage } from '../pages/ProductPage';
import { testData } from '../utils/testData';

test.describe('Performance Tests', () => {
  test('TC-018: Verify Page Load Performance', async ({ page }) => {
    const searchPage = new SearchPage(page);
    const productPage = new ProductPage(page);
    
    await searchPage.navigate();
    await searchPage.searchProduct(testData.searchTerms.wallet);
    
    const startTime = Date.now();
    await searchPage.clickFirstResult();
    await productPage.relatedProductsSection.waitFor({ state: 'visible' });
    const endTime = Date.now();
    
    const loadTime = endTime - startTime;
    
    // Page should load in less than 3000ms
    expect(loadTime).toBeLessThan(3000);
  });
});