"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div role="alert" className="max-w-md text-center">
        <h1 className="text-2xl font-bold text-slate-900">তথ্য লোড করা যায়নি</h1>
        <p className="mt-3 text-slate-600">ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।</p>
        <button type="button" onClick={reset} className="mt-6 rounded-lg bg-slate-900 px-5 py-3 font-medium text-white">
          আবার চেষ্টা করুন
        </button>
      </div>
    </main>
  );
}
