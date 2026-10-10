"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfileForm({ name }: { name: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newName = String(new FormData(event.currentTarget).get("name") || "").trim();
    if (!newName || newName.length > 100) {
      setError("১ থেকে ১০০ অক্ষরের নাম লিখুন।");
      toast.error("১ থেকে ১০০ অক্ষরের নাম লিখুন।");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const result = await authClient.updateUser({ name: newName });
      if (result.error) throw new Error(result.error.message || "তথ্য আপডেট হয়নি।");
      toast.success("আপনার নাম আপডেট হয়েছে।");
      router.push("/profile");
      router.refresh();
    } catch (error) {
      const message = error instanceof Error ? error.message : "আবার চেষ্টা করুন।";
      setError(message);
      toast.error(message);
    } finally { setBusy(false); }
  }

  return (
    <main className="site-container py-12">
      <section className="mx-auto max-w-lg rounded-2xl border border-line bg-surface p-6 sm:p-8">
        <h1 className="text-2xl font-bold">তথ্য আপডেট করুন</h1>
        <form onSubmit={submit} noValidate className="mt-6 space-y-4">
          <label className="block text-sm font-medium">নাম<input name="name" defaultValue={name} autoComplete="name" required maxLength={100} className="mt-2 w-full rounded-lg border border-line bg-page px-3 py-3 outline-none focus:border-brand" /></label>
          {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
          <button disabled={busy} className="rounded-lg bg-brand px-4 py-3 font-semibold text-white hover:bg-brand-dark disabled:opacity-60">{busy ? "অপেক্ষা করুন…" : "তথ্য সংরক্ষণ করুন"}</button>
          <Link href="/profile" className="ml-4 text-sm text-muted hover:text-brand">প্রোফাইলে ফিরুন</Link>
        </form>
      </section>
    </main>
  );
}
