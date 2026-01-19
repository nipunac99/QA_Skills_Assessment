export class TestHelpers {
  static calculatePriceRange(basePrice: number, tolerance: number = 0.20) {
    return {
      min: basePrice * (1 - tolerance),
      max: basePrice * (1 + tolerance)
    };
  }

  static isPriceInRange(price: number, basePrice: number, tolerance: number = 0.20): boolean {
    const range = this.calculatePriceRange(basePrice, tolerance);
    return price >= range.min && price <= range.max;
  }

  static async wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}