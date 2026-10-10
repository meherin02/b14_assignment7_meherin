import type { Product } from "@/lib/types";

export function getPriceMovers(products: Product[]) {
  const risers = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return { risers, fallers };
}

export type SortOrder = "default" | "low-to-high" | "high-to-low";

export function sortProducts(products: Product[], order: SortOrder): Product[] {
  const sortedProducts = [...products];
  if (order === "low-to-high") sortedProducts.sort((a, b) => a.today - b.today);
  if (order === "high-to-low") sortedProducts.sort((a, b) => b.today - a.today);
  return sortedProducts;
}

export function getPriceSummary(product: Product) {
  return {
    minimum: product.markets.length ? Math.min(...product.markets.map((market) => market.min)) : product.today,
    maximum: product.markets.length ? Math.max(...product.markets.map((market) => market.max)) : product.today,
    average: product.today,
  };
}
