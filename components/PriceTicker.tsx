import PriceChange from "@/components/PriceChange";
import { formatPrice, formatUnit } from "@/lib/format-price";
import type { Product } from "@/lib/types";

export default function PriceTicker({ products }: { products: Product[] }) {
  const changedProducts = products.filter((product) => product.change.dir !== "flat");
  const tickerProducts = changedProducts.length ? changedProducts : products;

  if (!tickerProducts.length) {
    return <div className="border-b border-line bg-surface px-4 py-2 text-center text-sm text-muted">দামের তথ্য এই মুহূর্তে পাওয়া যাচ্ছে না।</div>;
  }

  return (
    <div className="price-ticker border-b border-line bg-surface" role="region" aria-label="আজকের বাজারের দামের পরিবর্তন">
      <div className="ticker-track">
        {[0, 1].map((copy) => (
          <ul key={copy} className="ticker-group" aria-hidden={copy === 1 ? true : undefined}>
            {tickerProducts.map((product) => (
              <li key={product.id} className="flex h-9 shrink-0 items-center gap-1.5 border-r border-line/50 px-4 text-sm whitespace-nowrap">
                <span aria-hidden="true">{product.image}</span>
                <span className="font-medium">{product.nameBn}</span>
                <span>{formatPrice(product.today)}/{formatUnit(product.unit).replace("প্রতি ", "")}</span>
                <PriceChange change={product.change} badge={false} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
