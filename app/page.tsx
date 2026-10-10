import { getCategories, getProducts } from "@/lib/api";
import { formatPercent, formatPrice, formatUnit } from "@/lib/format-price";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold text-slate-900">বাজার দর</h1>
        <p className="mt-3 text-lg text-slate-600">
          প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>

        <ul aria-label="পণ্যের বিভাগ" className="mt-6 flex flex-wrap gap-3">
          {categories.map((category) => (
            <li key={category.id} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm">
              {category.icon} {category.nameBn}
            </li>
          ))}
        </ul>

        <section id="সব-পণ্য" aria-labelledby="products-title" className="mt-10">
          <h2 id="products-title" className="text-2xl font-bold text-slate-900">সব পণ্য</h2>
          <p className="mt-2 text-slate-600">দৈনন্দিন প্রয়োজনীয় পণ্যের আজকের দাম দেখুন।</p>

          {products.length === 0 ? (
            <p className="mt-6 rounded-xl border border-slate-200 bg-white p-6 text-slate-600">
              এই মুহূর্তে কোনো পণ্য পাওয়া যায়নি।
            </p>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <article key={product.id} className="rounded-xl border border-slate-200 bg-white p-5">
                  <span aria-hidden="true" className="text-4xl">{product.image}</span>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{product.nameBn}</h3>
                  <p className="mt-1 text-sm text-slate-500">{formatUnit(product.unit)}</p>
                  <p className="mt-4 text-sm text-slate-600">আজকের দাম</p>
                  <div className="mt-1 flex flex-wrap items-center justify-between gap-2">
                    <p className="text-xl font-bold text-slate-900">{formatPrice(product.today)}</p>
                    <span className={`rounded-full px-2 py-1 text-sm font-medium ${
                      product.change.dir === "up"
                        ? "bg-green-50 text-green-700"
                        : product.change.dir === "down"
                          ? "bg-red-50 text-red-700"
                          : "bg-slate-100 text-slate-600"
                    }`}>
                      {product.change.dir === "up" ? "▲" : product.change.dir === "down" ? "▼" : "—"}{" "}
                      {formatPercent(product.change.pct)}%
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
