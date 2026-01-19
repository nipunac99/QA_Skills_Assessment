import { Page, Locator } from "@playwright/test";

export class ProductPage {
  readonly page: Page;
  readonly relatedProductsSection: Locator;
  readonly relatedProductItems: Locator;
  readonly productTitle: Locator;
  readonly productPrice: Locator;
  readonly productCategory: Locator;

  constructor(page: Page) {
    this.page = page;
    // Update these selectors based on actual eBay DOM
    this.relatedProductsSection = page.locator(".srp-river-results, #srp-river-results, .s-item").first();
    this.relatedProductItems = this.relatedProductsSection.locator(".related-item, .evo-item");
    this.productTitle = page.locator("h1.x-item-title");
    this.productPrice = page.locator(".x-price-primary");
    this.productCategory = page.locator(".bc-nav-item");
  }

  async scrollToRelatedProducts() {
    // await this.relatedProductsSection.scrollIntoViewIfNeeded();

    await this.relatedProductsSection.waitFor({
      state: "visible",
      timeout: 10000,
    });
    await this.relatedProductsSection.scrollIntoViewIfNeeded({
      timeout: 10000,
    });
  }

  async getRelatedProductsCount(): Promise<number> {
    return await this.relatedProductItems.count();
  }

  async getRelatedProductPrices(): Promise<number[]> {
    const prices: number[] = [];
    const count = await this.getRelatedProductsCount();

    for (let i = 0; i < count; i++) {
      const priceText = await this.relatedProductItems
        .nth(i)
        .locator(".price")
        .textContent();
      const price = parseFloat(priceText?.replace(/[^0-9.]/g, "") || "0");
      prices.push(price);
    }

    return prices;
  }

  async getRelatedProductCategories(): Promise<string[]> {
    const categories: string[] = [];
    const count = await this.getRelatedProductsCount();

    for (let i = 0; i < count; i++) {
      const category =
        (await this.relatedProductItems.nth(i).getAttribute("data-category")) ||
        "";
      categories.push(category);
    }

    return categories;
  }

  async clickRelatedProduct(index: number) {
    await this.relatedProductItems.nth(index).click();
    await this.page.waitForLoadState("networkidle");
  }

  async getMainProductPrice(): Promise<number> {
    const priceText = await this.productPrice.textContent();
    return parseFloat(priceText?.replace(/[^0-9.]/g, "") || "0");
  }

  async getMainProductCategory(): Promise<string> {
    return (await this.productCategory.last().textContent()) || "";
  }

  async areImagesLoaded(): Promise<boolean> {
    const count = await this.getRelatedProductsCount();

    for (let i = 0; i < count; i++) {
      const img = this.relatedProductItems.nth(i).locator("img");
      const naturalWidth = await img.evaluate(
        (el: HTMLImageElement) => el.naturalWidth
      );
      if (naturalWidth === 0) return false;
    }

    return true;
  }
}
