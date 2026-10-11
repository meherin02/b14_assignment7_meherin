"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function AuthNotifications() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: session } = authClient.useSession();

  useEffect(() => {
    if (pathname === "/signin" && searchParams.get("reason") === "protected") {
      toast.error("এই পৃষ্ঠা দেখতে আগে সাইন ইন করুন।", { id: "protected-route" });
    }
    if (searchParams.has("error")) {
      const linking = searchParams.has("linkError");
      const code = searchParams.get("error");
      const message = linking && code === "account_already_linked_to_different_user"
        ? "এই Google/GitHub অ্যাকাউন্টটি অন্য একটি বাজার দর অ্যাকাউন্টে সংযুক্ত আছে।"
        : linking ? "অ্যাকাউন্ট সংযুক্ত করা যায়নি। আবার চেষ্টা করুন।" : "সাইন ইন সফল হয়নি। আবার চেষ্টা করুন।";
      toast.error(message, { id: "auth-error" });
    }
    if (pathname === "/" && searchParams.get("auth") === "success" && session) {
      toast.success("সাইন ইন সফল হয়েছে।", { id: "social-login" });
    }
    if (pathname === "/profile" && searchParams.has("linked") && !searchParams.has("error") && session) {
      toast.success("লগইন পদ্ধতিটি আপনার অ্যাকাউন্টে সংযুক্ত হয়েছে।", { id: "social-linked" });
    }
  }, [pathname, searchParams, session]);

  return <Toaster position="top-center" toastOptions={{ duration: 4000 }} />;
}
