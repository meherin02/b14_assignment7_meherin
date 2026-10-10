import ProductSkeleton from "@/components/ProductSkeleton";

export default function Loading() {
  return (
    <main className="site-container py-10">
      <div>
        <h1 className="mb-6 text-3xl font-bold">বাজার দর</h1>
        <ProductSkeleton />
      </div>
    </main>
  );
}
