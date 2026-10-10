import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/lib/api";
import { getPriceMovers } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const products = await getProducts();
  const { risers, fallers } = getPriceMovers(products);

  return (
    <main className="site-container space-y-10 pt-6 pb-[72px]">
      <Hero />

      <section aria-labelledby="risers-title">
        <h2 id="risers-title" className="mb-3 flex items-center gap-1 text-xl leading-7 font-bold">
          <span aria-hidden="true" className="text-base text-green-700">▲</span>
          আজ দাম বেড়েছে
        </h2>
        <ProductGrid products={risers} />
      </section>

      <section aria-labelledby="fallers-title">
        <h2 id="fallers-title" className="mb-3 flex items-center gap-1 text-xl leading-7 font-bold">
          <span aria-hidden="true" className="text-base text-red-600">▼</span>
          আজ দাম কমেছে
        </h2>
        <ProductGrid products={fallers} />
      </section>

      <section id="সব-পণ্য" aria-labelledby="products-title">
        <h2 id="products-title" className="text-xl leading-7 font-bold">সব পণ্য</h2>
        <p className="mt-3 mb-4 text-sm leading-5 text-muted">
          মোট {new Intl.NumberFormat("bn-BD").format(products.length)}টি পণ্য দেখানো হচ্ছে
        </p>
        <ProductGrid products={products} />
      </section>
    </main>
  );
}
