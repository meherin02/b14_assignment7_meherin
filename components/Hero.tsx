import Image from "next/image";
import heroImage from "@/bazar-hero.png";
import { formatBanglaDate } from "@/lib/format-price";

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="grid items-start gap-6 rounded-3xl border border-line bg-surface px-4 py-6 md:grid-cols-[minmax(0,1fr)_315px] md:py-2.5">
      <div>
        <p className="inline-block rounded-full bg-brand/10 px-3 py-1 text-sm leading-5 font-medium text-brand">{formatBanglaDate()}</p>
        <h1 id="hero-title" className="mt-2 text-3xl leading-[1.5] font-bold lg:text-4xl">আজকের বাজারের দাম এক নজরে</h1>
        <p className="mt-2 max-w-2xl text-base leading-6">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>
        <a href="#সব-পণ্য" className="mt-7 inline-flex min-h-10 items-center justify-center rounded-lg border border-brand-dark bg-brand px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark">সব পণ্য দেখুন</a>
      </div>

      <Image src={heroImage} alt="তাজা ফল ও সবজিতে ভরা বাজারের ঝুড়ি" className="mx-auto h-auto w-full max-w-[315px]" sizes="(max-width: 380px) calc(100vw - 66px), 315px" preload />
    </section>
  );
}
