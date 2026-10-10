import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import { getCategories, getProducts } from "@/lib/api";
import { formatBanglaDate } from "@/lib/format-price";

export default async function MarketHeader() {
  const [categories, products] = await Promise.all([
    getCategories().catch(() => []),
    getProducts().catch(() => []),
  ]);

  return (
    <>
      <Navbar categories={categories} date={formatBanglaDate()} />
      <PriceTicker products={products} />
    </>
  );
}
