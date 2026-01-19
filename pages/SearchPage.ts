import { Page, Locator } from "@playwright/test";

export class SearchPage {
  readonly page: Page;
  readonly searchBox: Locator;
  readonly searchButton: Locator;
  readonly searchResults: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchBox = page.locator("#gh-ac");
    this.searchButton = page.locator("#gh-search-btn");
    this.searchResults = page.locator(".tourtip__host");
  }

  async navigate() {
    await this.page.goto("https://www.ebay.com/");
  }

  async searchProduct(productName: string) {
    await this.searchBox.fill(productName);
    await this.searchButton.click();
    await this.page.waitForLoadState("load");

    // await this.page.waitForLoadState('networkidle');
  }

  async clickFirstResult() {
    await this.page.waitForLoadState("load");
    await this.searchResults.first().click();
    await this.page.waitForLoadState("load");

    // await this.page.waitForLoadState("networkidle");
  }
}
