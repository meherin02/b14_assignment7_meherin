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
    if (searchParams.has("error")) toast.error("সাইন ইন সফল হয়নি। আবার চেষ্টা করুন।", { id: "auth-error" });
    if (pathname === "/" && searchParams.get("auth") === "success" && session) {
      toast.success("সাইন ইন সফল হয়েছে।", { id: "social-login" });
    }
  }, [pathname, searchParams, session]);

  return <Toaster position="top-center" toastOptions={{ duration: 4000 }} />;
}
