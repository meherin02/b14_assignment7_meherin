export default function AccountSkeleton() {
  return (
    <main className="site-container py-12" aria-label="অ্যাকাউন্ট লোড হচ্ছে" aria-busy="true">
      <div className="mx-auto max-w-md animate-pulse space-y-5 rounded-2xl border border-line bg-surface p-8">
        <div className="h-8 w-32 rounded bg-line" />
        <div className="h-4 w-56 max-w-full rounded bg-line" />
        <div className="h-12 rounded bg-line" /><div className="h-12 rounded bg-line" /><div className="h-12 rounded bg-line" />
      </div>
    </main>
  );
}
