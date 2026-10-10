import { formatPrice } from "@/lib/format-price";
import type { MarketPrice } from "@/lib/types";

export default function MarketPrices({ markets }: { markets: MarketPrice[] }) {
  const sortedMarkets = [...markets].sort((a, b) => (a.min + a.max) - (b.min + b.max));

  return (
    <section aria-labelledby="markets-title" className="mt-6">
      <h2 id="markets-title" className="mb-4 text-lg font-semibold">বাজারভিত্তিক আজকের দাম</h2>
      {sortedMarkets.length === 0 ? (
        <p className="text-sm text-muted">এই পণ্যের বাজারভিত্তিক দাম এখন পাওয়া যাচ্ছে না।</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-line" tabIndex={0} role="region" aria-label="বাজারের দামের তালিকা">
          <table className="w-full min-w-[660px] text-sm">
            <caption className="sr-only">বিভাগ ও বাজার অনুযায়ী সর্বনিম্ন, সর্বাধিক এবং গড় দাম</caption>
            <thead className="bg-page">
              <tr className="h-[46px] border-b border-line">
                <th scope="col" className="px-4 py-3 text-left font-bold">বাজার</th>
                <th scope="col" className="px-4 py-3 text-left font-bold">বিভাগ</th>
                <th scope="col" className="px-4 py-3 text-right font-bold">সর্বনিম্ন</th>
                <th scope="col" className="px-4 py-3 text-right font-bold">সর্বাধিক</th>
                <th scope="col" className="px-4 py-3 text-right font-bold">গড়</th>
              </tr>
            </thead>
            <tbody>
              {sortedMarkets.map((market) => (
                <tr key={`${market.division}-${market.market}`} className="h-[46px] border-b border-line last:border-b-0">
                  <th scope="row" className="px-4 py-3 text-left font-medium">{market.market}</th>
                  <td className="px-4 py-3">{market.division}</td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">{formatPrice(market.min)}</td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">{formatPrice(market.max)}</td>
                  <td className="px-4 py-3 text-right font-semibold whitespace-nowrap">{formatPrice((market.min + market.max) / 2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
