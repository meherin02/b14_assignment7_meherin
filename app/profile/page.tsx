import Link from "next/link";
import { requireSession } from "@/lib/session";

export default async function ProfilePage() {
  const { user } = await requireSession();
  return (
    <main className="site-container py-12">
      <section className="mx-auto max-w-lg rounded-2xl border border-line bg-surface p-6 sm:p-8">
        <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
        <div aria-hidden="true" className="mt-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand/10 text-2xl font-bold text-brand">{user.name.slice(0, 1)}</div>
        <dl className="mt-6 space-y-4">
          <div><dt className="text-sm text-muted">নাম</dt><dd className="mt-1 break-words text-lg font-semibold">{user.name}</dd></div>
          <div><dt className="text-sm text-muted">ইমেইল</dt><dd className="mt-1 break-all">{user.email}</dd></div>
        </dl>
        <Link href="/profile/update" className="mt-8 inline-block rounded-lg bg-brand px-4 py-3 font-semibold text-white hover:bg-brand-dark">তথ্য আপডেট করুন</Link>
      </section>
    </main>
  );
}
