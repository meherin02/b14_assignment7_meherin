export default function ProductLoading() {
  return (
    <main className="site-container py-6" role="status" aria-label="পণ্যের বিস্তারিত লোড হচ্ছে">
      <span className="sr-only">পণ্যের বিস্তারিত লোড হচ্ছে...</span>
      <div aria-hidden="true" className="space-y-6 motion-safe:animate-pulse">
        <div className="h-5 w-48 rounded bg-line" />
        <div className="h-44 rounded-2xl border border-line bg-surface" />
        <div className="grid gap-3 sm:grid-cols-3">
          {[0, 1, 2].map((item) => <div key={item} className="h-28 rounded-2xl border border-line bg-surface" />)}
        </div>
        <div className="h-96 rounded-2xl border border-line bg-surface" />
      </div>
    </main>
  );
}
