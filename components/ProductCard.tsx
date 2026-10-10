import Link from "next/link";
import PriceChange from "@/components/PriceChange";
import { formatPrice, formatUnit } from "@/lib/format-price";
import type { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}`} className="group block rounded-2xl border border-line bg-surface p-4 transition-colors hover:border-brand/50 hover:bg-white">
      <article>
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-page text-2xl">{product.image}</span>
          <div className="min-w-0">
            <h3 className="text-base leading-6 font-semibold group-hover:text-brand">{product.nameBn}</h3>
            <p className="text-xs leading-4 text-muted">{formatUnit(product.unit)}</p>
          </div>
        </div>
        <div className="mt-3 flex items-end justify-between gap-2">
          <div>
            <p className="text-xs leading-4 text-muted">আজকের দাম</p>
            <p className="text-xl leading-7 font-bold">{formatPrice(product.today)}</p>
          </div>
          <PriceChange change={product.change} />
        </div>
      </article>
    </Link>
  );
}
