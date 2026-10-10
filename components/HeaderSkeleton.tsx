import Navbar from "@/components/Navbar";
import { formatBanglaDate } from "@/lib/format-price";

export default function HeaderSkeleton() {
  return (
    <div>
      <Navbar categories={[]} date={formatBanglaDate()} />
      <div aria-hidden="true" className="h-9 border-b border-line bg-surface motion-safe:animate-pulse" />
    </div>
  );
}
