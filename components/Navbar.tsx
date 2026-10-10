"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logoIcon from "@/logo-icon.png";
import type { Category } from "@/lib/types";
import AuthButtons from "@/components/AuthButtons";

export default function Navbar({ categories, date }: { categories: Category[]; date: string }) {
  const pathname = usePathname();

  return (
    <header className="border-b border-line bg-surface">
      <div className="site-container">
        <div className="flex min-h-[68px] flex-wrap items-center justify-between gap-3 py-3">
          <Link href="/" className="flex items-center gap-2.5" aria-label="বাজার দর — হোম পেজ">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand">
              <Image src={logoIcon} alt="" width={18} height={18} />
            </span>
            <span>
              <span className="block text-xl leading-7 font-bold">বাজার দর</span>
              <span className="block text-[11px] leading-4 text-muted sm:text-xs">{date}</span>
            </span>
          </Link>

          <AuthButtons />
        </div>

        <nav aria-label="পণ্যের বিভাগ" className="min-h-[49px] overflow-x-auto border-t border-line py-2">
          <ul className="flex w-max min-w-full gap-1">
            {categories.map((category) => {
              const href = `/category/${category.slug}`;
              const active = pathname === href;

              return (
                <li key={category.id}>
                  <Link href={href} aria-current={active ? "page" : undefined} className={`flex h-8 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold transition-colors ${active ? "bg-brand/10 text-brand" : "hover:bg-page"}`}>
                    <span aria-hidden="true">{category.icon}</span>
                    {category.nameBn}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
