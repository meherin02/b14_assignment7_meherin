export default function ProductSkeleton() {
  return (
    <div role="status" aria-label="পণ্যের তথ্য লোড হচ্ছে">
      <span className="sr-only">পণ্যের তথ্য লোড হচ্ছে...</span>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
        {Array.from({ length: 8 }, (_, index) => (
          <div key={index} className="rounded-2xl border border-line bg-surface p-4 motion-safe:animate-pulse">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-line" />
              <div className="flex-1">
                <div className="h-5 w-3/4 rounded bg-line" />
                <div className="mt-2 h-3 w-1/2 rounded bg-line" />
              </div>
            </div>
            <div className="mt-3 h-11 w-2/3 rounded bg-line" />
          </div>
        ))}
      </div>
    </div>
  );
}
