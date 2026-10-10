import { formatPercent } from "@/lib/format-price";
import type { Product } from "@/lib/types";

export default function PriceChange({ change, badge = true }: { change: Product["change"]; badge?: boolean }) {
  const symbol = change.dir === "up" ? "▲" : change.dir === "down" ? "▼" : "—";
  const label = change.dir === "up" ? "দাম বেড়েছে" : change.dir === "down" ? "দাম কমেছে" : "দাম অপরিবর্তিত";
  const color = change.dir === "up" ? "text-green-700" : change.dir === "down" ? "text-red-600" : "text-muted";

  return (
    <span aria-label={`${label} ${formatPercent(change.pct)}%`} className={`inline-flex shrink-0 items-center gap-1 whitespace-nowrap font-semibold ${color} ${badge ? "rounded-full bg-page px-2 py-1 text-xs leading-4" : "text-sm"}`}>
      <span aria-hidden="true">{symbol}</span>
      {formatPercent(change.pct)}%
    </span>
  );
}
