import ProductSkeleton from "@/components/ProductSkeleton";

export default function CategoryLoading() {
  return (
    <main className="site-container py-6" aria-label="বিভাগের পণ্য লোড হচ্ছে">
      <div aria-hidden="true" className="mb-10 h-24 rounded-2xl border border-line bg-surface motion-safe:animate-pulse" />
      <ProductSkeleton />
    </main>
  );
}
