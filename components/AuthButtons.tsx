"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function AuthButtons() {
  const { data: session, isPending } = authClient.useSession();
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  async function signOut() {
    setBusy(true);
    try {
      const result = await authClient.signOut();
      if (result.error) throw new Error(result.error.message || "সাইন আউট সফল হয়নি।");
      toast.success("সাইন আউট হয়েছে।");
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "আবার চেষ্টা করুন।");
    } finally { setBusy(false); }
  }

  if (isPending) return <div aria-label="অ্যাকাউন্ট লোড হচ্ছে" className="h-9 w-40 animate-pulse rounded-lg bg-line" />;

  return (
    <div className="flex items-center gap-2 text-sm font-semibold">
      {session ? <>
        <Link href="/profile" className="rounded-lg border border-line px-3 py-2 hover:bg-page">আমার প্রোফাইল</Link>
        <button onClick={signOut} disabled={busy} className="rounded-lg bg-brand px-3 py-2 text-white hover:bg-brand-dark disabled:opacity-60">{busy ? "অপেক্ষা করুন…" : "সাইন আউট"}</button>
      </> : <>
        <Link href="/signin" className="rounded-lg border border-line px-3 py-2 hover:bg-page sm:px-4">সাইন ইন</Link>
        <Link href="/signup" className="rounded-lg bg-brand px-3 py-2 text-white hover:bg-brand-dark sm:px-4">সাইন আপ</Link>
      </>}
    </div>
  );
}
