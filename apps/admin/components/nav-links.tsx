"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/certifications", label: "Certifications" },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="mt-12 space-y-2 text-sm">
      {NAV_ITEMS.map((item) => {
        const isActive =
          item.href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`block border-l-2 px-3 py-2 transition-colors ${
              isActive
                ? "border-citrus text-citrus font-medium bg-white/5"
                : "border-transparent text-white/70 hover:border-citrus hover:text-citrus"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
