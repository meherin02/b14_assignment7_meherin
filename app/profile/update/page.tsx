import { requireSession } from "@/lib/session";
import UpdateProfileForm from "@/components/UpdateProfileForm";

export default async function UpdateProfilePage() {
  const { user } = await requireSession();
  return <UpdateProfileForm name={user.name} />;
}
