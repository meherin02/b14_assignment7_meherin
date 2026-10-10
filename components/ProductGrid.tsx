import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/types";

export default function ProductGrid({ products }: { products: Product[] }) {
  if (!products.length) {
    return <p className="rounded-2xl border border-line bg-surface p-6 text-muted">এই মুহূর্তে কোনো পণ্য পাওয়া যায়নি।</p>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => <ProductCard key={product.id} product={product} />)}
    </div>
  );
}
