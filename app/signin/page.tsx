import AuthForm from "@/components/AuthForm";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  if (await getSession()) redirect("/");
  return <AuthForm mode="signin" />;
}
