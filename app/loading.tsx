import ProductSkeleton from "@/components/ProductSkeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-3xl font-bold text-slate-900">বাজার দর</h1>
        <ProductSkeleton />
      </div>
    </main>
  );
}
