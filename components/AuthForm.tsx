"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function AuthForm({ mode }: { mode: "signin" | "signup" }) {
  const signup = mode === "signup";
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  function showError(message: string) {
    setError(message);
    toast.error(message);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");
    if (signup && !name) return showError("আপনার নাম লিখুন।");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return showError("সঠিক ইমেইল লিখুন।");
    if (password.length < 8 || password.length > 128) return showError("পাসওয়ার্ড ৮ থেকে ১২৮ অক্ষরের হতে হবে।");
    setBusy(true);
    setError("");
    try {
      const result = signup
        ? await authClient.signUp.email({ name, email, password })
        : await authClient.signIn.email({ email, password });
      if (result.error) return showError(result.error.message || "আবার চেষ্টা করুন।");
      toast.success(signup ? "অ্যাকাউন্ট তৈরি হয়েছে। এখন সাইন ইন করুন।" : "সাইন ইন সফল হয়েছে।");
      router.push(signup ? "/signin" : "/");
      router.refresh();
    } catch { showError("সংযোগে সমস্যা হয়েছে। আবার চেষ্টা করুন।"); }
    finally { setBusy(false); }
  }

  async function socialLogin(provider: "google" | "github") {
    setBusy(true);
    setError("");
    try {
      const result = await authClient.signIn.social({ provider, callbackURL: "/?auth=success", errorCallbackURL: "/signin?error=social" });
      if (result.error) showError(result.error.message || "সাইন ইন সফল হয়নি।");
    } catch { showError("সংযোগে সমস্যা হয়েছে। আবার চেষ্টা করুন।"); }
    finally { setBusy(false); }
  }

  const inputClass = "mt-2 w-full rounded-lg border border-line bg-page px-3 py-3 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20";
  return (
    <main className="site-container py-12 sm:py-16">
      <section className="mx-auto max-w-md rounded-2xl border border-line bg-surface p-6 sm:p-8">
        <h1 className="text-2xl font-bold">{signup ? "সাইন আপ" : "সাইন ইন"}</h1>
        <p className="mt-2 text-sm text-muted">{signup ? "বাজার দরে আপনার অ্যাকাউন্ট তৈরি করুন।" : "আপনার অ্যাকাউন্টে ফিরে আসুন।"}</p>
        <form onSubmit={submit} noValidate className="mt-6 space-y-4">
          {signup && <label className="block text-sm font-medium">নাম<input name="name" autoComplete="name" maxLength={100} required className={inputClass} /></label>}
          <label className="block text-sm font-medium">ইমেইল<input name="email" type="email" autoComplete="email" required className={inputClass} /></label>
          <label className="block text-sm font-medium">পাসওয়ার্ড<input name="password" type="password" autoComplete={signup ? "new-password" : "current-password"} minLength={8} maxLength={128} required className={inputClass} /></label>
          {signup && <p className="text-xs text-muted">পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।</p>}
          {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
          <button disabled={busy} className="w-full rounded-lg bg-brand px-4 py-3 font-semibold text-white hover:bg-brand-dark disabled:opacity-60">{busy ? "অপেক্ষা করুন…" : signup ? "অ্যাকাউন্ট তৈরি করুন" : "সাইন ইন করুন"}</button>
        </form>
        <div className="my-6 flex items-center gap-3 text-xs text-muted"><span className="h-px flex-1 bg-line" />অথবা<span className="h-px flex-1 bg-line" /></div>
        <div className="grid gap-3 sm:grid-cols-2">
          <button onClick={() => socialLogin("google")} disabled={busy} className="rounded-lg border border-line px-3 py-3 text-sm font-semibold hover:bg-page disabled:opacity-60">Google দিয়ে প্রবেশ</button>
          <button onClick={() => socialLogin("github")} disabled={busy} className="rounded-lg border border-line px-3 py-3 text-sm font-semibold hover:bg-page disabled:opacity-60">GitHub দিয়ে প্রবেশ</button>
        </div>
        <p className="mt-6 text-center text-sm text-muted">{signup ? "অ্যাকাউন্ট আছে? " : "অ্যাকাউন্ট নেই? "}<Link href={signup ? "/signin" : "/signup"} className="font-semibold text-brand hover:underline">{signup ? "সাইন ইন করুন" : "সাইন আপ করুন"}</Link></p>
      </section>
    </main>
  );
}
