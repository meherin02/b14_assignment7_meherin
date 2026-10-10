import type { ProductUnit } from "@/lib/types";

export function formatPrice(price: number): string {
  return `${new Intl.NumberFormat("bn-BD").format(price)} টাকা`;
}

export function formatPercent(percent: number): string {
  return new Intl.NumberFormat("bn-BD", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(Math.abs(percent));
}

export function formatUnit(unit: ProductUnit): string {
  const units: Record<ProductUnit, string> = {
    kg: "প্রতি কেজি",
    litre: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    piece: "প্রতি পিস",
  };

  return units[unit];
}
