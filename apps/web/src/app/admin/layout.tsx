"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarLinks = [
  { label: "Dashboard", href: "/admin", icon: "bi-grid" },
  { label: "Products", href: "/admin/products", icon: "bi-box" },
  { label: "Orders", href: "/admin/orders", icon: "bi-bag" },
  { label: "Customers", href: "/admin/customers", icon: "bi-people" },
  { label: "Inventory", href: "/admin/inventory", icon: "bi-archive" },
  { label: "Coupons", href: "/admin/coupons", icon: "bi-tag" },
  { label: "Analytics", href: "/admin/analytics", icon: "bi-bar-chart" },
  { label: "Settings", href: "/admin/settings", icon: "bi-gear" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex bg-zinc-50">

      {/* Sidebar */}
      <aside className="w-64 bg-zinc-950 text-white flex flex-col fixed h-full z-40">

        {/* Logo */}
        <div className="px-6 py-5 border-b border-zinc-800">
          <p className="font-bold tracking-widest text-sm uppercase">
            MENTASTIC
          </p>
          <p className="text-xs text-zinc-500 mt-0.5">Admin Dashboard</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {sidebarLinks.map((link) => {
            const isActive =
              link.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                  isActive
                    ? "bg-white text-black font-medium"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                }`}
              >
                <i className={`bi ${link.icon} text-base`}></i>
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 border-t border-zinc-800 flex flex-col gap-1">
          <Link
            href="/pos"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-zinc-400 hover:bg-zinc-800 hover:text-white transition-all"
          >
            <i className="bi bi-shop text-base"></i>
            POS System
          </Link>
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-zinc-400 hover:bg-zinc-800 hover:text-white transition-all"
          >
            <i className="bi bi-arrow-left text-base"></i>
            Back to Store
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
}