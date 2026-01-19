import { test, expect } from "@playwright/test";
import { SearchPage } from "../pages/SearchPage";
import { ProductPage } from "../pages/ProductPage";
import { testData } from "../utils/testData";
import { TestHelpers } from "../utils/helpers";

test.describe("Related Products Feature", () => {
  let searchPage: SearchPage;
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    searchPage = new SearchPage(page);
    productPage = new ProductPage(page);
    await searchPage.navigate();
  });

  test("TC-001: Verify Related Products Section Displays", async ({ page }) => {
    await searchPage.searchProduct(testData.searchTerms.wallet);
    await searchPage.clickFirstResult();

    await productPage.scrollToRelatedProducts();

    await expect(productPage.relatedProductsSection).toBeVisible();
  });

  test("TC-002: Verify Maximum 6 Related Products Display", async ({
    page,
  }) => {
    await searchPage.searchProduct(testData.searchTerms.wallet);
    await searchPage.clickFirstResult();

    await productPage.scrollToRelatedProducts();
    const count = await productPage.getRelatedProductsCount();

    expect(count).toBeLessThanOrEqual(testData.maxRelatedProducts);
    expect(count).toBeGreaterThan(0);
  });

  test("TC-003: Verify Related Products Same Category", async ({ page }) => {
    await searchPage.searchProduct(testData.searchTerms.wallet);
    await searchPage.clickFirstResult();

    const mainCategory = await productPage.getMainProductCategory();
    const relatedCategories = await productPage.getRelatedProductCategories();

    relatedCategories.forEach((category) => {
      expect(category).toContain(mainCategory);
    });
  });

  test("TC-004: Verify Price Range Validation", async ({ page }) => {
    await searchPage.searchProduct(testData.searchTerms.wallet);
    await searchPage.clickFirstResult();

    const mainPrice = await productPage.getMainProductPrice();
    const relatedPrices = await productPage.getRelatedProductPrices();

    relatedPrices.forEach((price) => {
      const inRange = TestHelpers.isPriceInRange(
        price,
        mainPrice,
        testData.expectedPriceRangeTolerance
      );
      expect(inRange).toBeTruthy();
    });
  });


  test("TC-008: Verify Product Click Navigation", async ({ page }) => {
    await searchPage.searchProduct(testData.searchTerms.wallet);
    await searchPage.clickFirstResult();

    await productPage.scrollToRelatedProducts();
    const initialUrl = page.url();

    await productPage.clickRelatedProduct(0);

    const newUrl = page.url();
    expect(newUrl).not.toBe(initialUrl);
    await expect(productPage.productTitle).toBeVisible();
  });

  test("TC-012: Verify Main Product Not in Related Products", async ({
    page,
  }) => {
    await searchPage.searchProduct(testData.searchTerms.wallet);
    await searchPage.clickFirstResult();

    const mainProductUrl = page.url();
    const mainProductId = mainProductUrl.match(/\/itm\/(\d+)/)?.[1];

    await productPage.scrollToRelatedProducts();
    const count = await productPage.getRelatedProductsCount();

    for (let i = 0; i < count; i++) {
      const relatedUrl = await productPage.relatedProductItems
        .nth(i)
        .getAttribute("href");
      const relatedId = relatedUrl?.match(/\/itm\/(\d+)/)?.[1];
      expect(relatedId).not.toBe(mainProductId);
    }
  });

  test("TC-019: Verify Product Images Load", async ({ page }) => {
    await searchPage.searchProduct(testData.searchTerms.wallet);
    await searchPage.clickFirstResult();

    await productPage.scrollToRelatedProducts();
    const imagesLoaded = await productPage.areImagesLoaded();

    expect(imagesLoaded).toBeTruthy();
  });
});
