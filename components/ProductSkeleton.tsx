export default function ProductSkeleton() {
  return (
    <div role="status" aria-label="পণ্যের তথ্য লোড হচ্ছে">
      <span className="sr-only">পণ্যের তথ্য লোড হচ্ছে...</span>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" aria-hidden="true">
        {Array.from({ length: 8 }, (_, index) => (
          <div key={index} className="rounded-xl border border-slate-200 bg-white p-5 motion-safe:animate-pulse">
            <div className="mb-5 h-12 w-12 rounded-lg bg-slate-200" />
            <div className="h-5 w-3/4 rounded bg-slate-200" />
            <div className="mt-3 h-4 w-1/2 rounded bg-slate-200" />
            <div className="mt-5 h-6 w-2/3 rounded bg-slate-200" />
          </div>
        ))}
      </div>
    </div>
  );
}
