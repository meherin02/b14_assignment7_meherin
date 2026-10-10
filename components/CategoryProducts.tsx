"use client";

import { useState } from "react";
import ProductGrid from "@/components/ProductGrid";
import { sortProducts, type SortOrder } from "@/lib/products";
import type { Product } from "@/lib/types";

export default function CategoryProducts({ products }: { products: Product[] }) {
  const [sortOrder, setSortOrder] = useState<SortOrder>("default");
  const sortedProducts = sortProducts(products, sortOrder);

  return (
    <section className="mt-10" aria-label="বিভাগের পণ্যের তালিকা">
      <div className="flex flex-wrap items-center justify-end gap-2 text-sm">
        <label htmlFor="product-sort">সাজান:</label>
        <div className="relative">
          <select
            id="product-sort"
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value as SortOrder)}
            className="min-h-10 w-48 appearance-none rounded-lg border border-line bg-surface py-2 pr-9 pl-3 text-sm"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-to-high">দাম: কম থেকে বেশি</option>
            <option value="high-to-low">দাম: বেশি থেকে কম</option>
          </select>
          <span aria-hidden="true" className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-muted">▾</span>
        </div>
      </div>

      <p aria-live="polite" className="mt-6 mb-4 text-sm text-muted">
        মোট {new Intl.NumberFormat("bn-BD").format(sortedProducts.length)}টি পণ্য দেখানো হচ্ছে
      </p>
      <ProductGrid products={sortedProducts} />
    </section>
  );
}
