import { test, expect, devices } from '@playwright/test';
import { SearchPage } from '../pages/SearchPage';
import { ProductPage } from '../pages/ProductPage';
import { testData } from '../utils/testData';

test.describe('Responsive Design Tests', () => {
  test('TC-013: Verify Mobile Responsive Layout', async ({ browser }) => {
    const context = await browser.newContext({
      ...devices['iPhone 12']
    });
    const page = await context.newPage();
    
    const searchPage = new SearchPage(page);
    const productPage = new ProductPage(page);
    
    await searchPage.navigate();
    await searchPage.searchProduct(testData.searchTerms.wallet);
    await searchPage.clickFirstResult();
    
    await productPage.scrollToRelatedProducts();
    
    await expect(productPage.relatedProductsSection).toBeVisible();
    
    const viewportSize = page.viewportSize();
    expect(viewportSize?.width).toBeLessThanOrEqual(500);
    
    await context.close();
  });

  test('TC-014: Verify Tablet Responsive Layout', async ({ browser }) => {
    const context = await browser.newContext({
      ...devices['iPad Pro']
    });
    const page = await context.newPage();
    
    const searchPage = new SearchPage(page);
    const productPage = new ProductPage(page);
    
    await searchPage.navigate();
    await searchPage.searchProduct(testData.searchTerms.wallet);
    await searchPage.clickFirstResult();
    
    await productPage.scrollToRelatedProducts();
    
    await expect(productPage.relatedProductsSection).toBeVisible();
    
    await context.close();
  });
});