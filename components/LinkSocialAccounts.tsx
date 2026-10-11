"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function LinkSocialAccounts() {
  const [busy, setBusy] = useState<"google" | "github" | null>(null);

  async function link(provider: "google" | "github") {
    setBusy(provider);
    try {
      const result = await authClient.linkSocial({
        provider,
        callbackURL: `/profile?linked=${provider}`,
        errorCallbackURL: "/profile?linkError=true",
      });
      if (result.error) toast.error(result.error.message || "অ্যাকাউন্ট সংযুক্ত করা যায়নি।");
    } catch {
      toast.error("সংযোগে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setBusy(null);
    }
  }

  return (
    <section aria-labelledby="linked-accounts-title" className="mt-8 border-t border-line pt-6">
      <h2 id="linked-accounts-title" className="font-semibold">লগইন পদ্ধতি সংযুক্ত করুন</h2>
      <p className="mt-1 text-sm text-muted">যে অ্যাকাউন্টটি ইতিমধ্যে ব্যবহার করছো, সেটিতে সাইন ইন করে অন্য পদ্ধতিটি এখানে সংযুক্ত করো।</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button type="button" onClick={() => link("google")} disabled={busy !== null} className="rounded-lg border border-line px-4 py-2 text-sm font-semibold hover:bg-page disabled:opacity-60">
          {busy === "google" ? "অপেক্ষা করুন…" : "Google সংযুক্ত করুন"}
        </button>
        <button type="button" onClick={() => link("github")} disabled={busy !== null} className="rounded-lg border border-line px-4 py-2 text-sm font-semibold hover:bg-page disabled:opacity-60">
          {busy === "github" ? "অপেক্ষা করুন…" : "GitHub সংযুক্ত করুন"}
        </button>
      </div>
    </section>
  );
}
