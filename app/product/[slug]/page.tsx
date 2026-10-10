import Link from "next/link";
import { notFound } from "next/navigation";
import PriceChange from "@/components/PriceChange";
import MarketPrices from "@/components/MarketPrices";
import { getProductBySlug } from "@/lib/api";
import { formatPrice, formatUnit } from "@/lib/format-price";
import { getPriceSummary } from "@/lib/products";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const summary = getPriceSummary(product);
  const changeLabel = product.change.dir === "up" ? "বেড়েছে" : product.change.dir === "down" ? "কমেছে" : "অপরিবর্তিত রয়েছে";
  const difference = Math.abs(product.today - product.yesterday);
  const stats = [
    { label: "সর্বনিম্ন দাম", value: summary.minimum, description: "সবচেয়ে কম দামের বাজার" },
    { label: "সর্বাধিক দাম", value: summary.maximum, description: "সবচেয়ে বেশি দামের বাজার" },
    { label: "গড় দাম", value: summary.average, description: `${formatUnit(product.unit)}-এর হিসাবে` },
  ];

  return (
    <main className="site-container pt-6 pb-12">
      <nav aria-label="পৃষ্ঠার অবস্থান" className="flex flex-wrap items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-brand">হোম</Link>
        <span aria-hidden="true">/</span>
        <Link href={`/category/${product.category}`} className="hover:text-brand">{product.categoryNameBn}</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{product.nameBn}</span>
      </nav>

      <section aria-labelledby="product-title" className="mt-10 flex flex-col justify-between gap-6 rounded-2xl border border-line bg-surface p-5 sm:flex-row sm:items-center sm:p-8">
        <div className="flex items-center gap-4">
          <span aria-hidden="true" className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-page text-4xl">{product.image}</span>
          <div>
            <h1 id="product-title" className="text-2xl font-bold sm:text-3xl">{product.nameBn}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted">
              <span>{formatUnit(product.unit)}</span>
              <Link href={`/category/${product.category}`} className="rounded-full bg-brand/10 px-2 py-0.5 text-xs font-medium text-brand">
                {product.categoryIcon} {product.categoryNameBn}
              </Link>
            </div>
            <p className="mt-3 text-sm text-muted">
              গতকালের তুলনায় আজ দাম {changeLabel}
              {difference > 0 ? ` · ${formatPrice(difference)}` : ""}
            </p>
          </div>
        </div>
        <div className="shrink-0 border-t border-line pt-4 sm:border-t-0 sm:pt-0">
          <p className="text-sm text-muted">আজকের দাম</p>
          <p className="text-3xl font-bold">{formatPrice(product.today)}</p>
          <p className="mt-1 mb-2 text-sm text-muted">{formatUnit(product.unit)}</p>
          <PriceChange change={product.change} />
        </div>
      </section>

      <div className="mt-6 rounded-2xl border border-line bg-surface p-4 sm:p-5">
        <section aria-labelledby="summary-title">
          <h2 id="summary-title" className="mb-5 text-lg font-semibold">দামের সারসংক্ষেপ</h2>
          <dl className="grid gap-3 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-line p-5">
                <dt className="text-xs text-muted">{stat.label}</dt>
                <dd className="mt-1 text-2xl font-bold">{formatPrice(stat.value)}</dd>
                <dd className="mt-1 text-xs text-muted">{stat.description}</dd>
              </div>
            ))}
          </dl>
        </section>
        <MarketPrices markets={product.markets} />
      </div>
    </main>
  );
}
