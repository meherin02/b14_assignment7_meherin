import { notFound } from "next/navigation";
import CategoryProducts from "@/components/CategoryProducts";
import { getCategory, getProducts } from "@/lib/api";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [category, products] = await Promise.all([
    getCategory(slug),
    getProducts(slug),
  ]);

  if (!category || products.length === 0) notFound();

  return (
    <main className="site-container pt-6 pb-12">
      <div className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-5">
        <span aria-hidden="true" className="text-4xl">{category.icon}</span>
        <div>
          <h1 className="text-2xl leading-8 font-bold">{category.nameBn}</h1>
          <p className="text-sm leading-5 text-muted">
            {new Intl.NumberFormat("bn-BD").format(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      <CategoryProducts key={category.slug} products={products} />
    </main>
  );
}
