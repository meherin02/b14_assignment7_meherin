import Link from "next/link";

export default function NotFound() {
  return (
    <main className="site-container flex min-h-[60vh] items-center justify-center py-12">
      <div className="max-w-md text-center">
        <p className="text-6xl font-bold text-brand">৪০৪</p>
        <h1 className="mt-4 text-2xl font-bold">কিছু পাওয়া যায়নি</h1>
        <p className="mt-3 text-muted">এই পৃষ্ঠা, পণ্য বা বিভাগটি পাওয়া যায়নি অথবা এখানে কোনো পণ্য নেই।</p>
        <Link href="/" className="mt-6 inline-flex min-h-10 items-center rounded-lg bg-brand px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}
