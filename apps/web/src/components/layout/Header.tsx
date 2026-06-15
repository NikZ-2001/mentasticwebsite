"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useAuthStore } from "@/store/authStore";

const navLinks = [
  { label: "New Arrivals", href: "/products?sort=newest" },
  { label: "Tops", href: "/categories/tops" },
  { label: "Bottoms", href: "/categories/bottoms" },
  { label: "Oversized", href: "/categories/oversized" },
  { label: "Sale", href: "/products?sale=true" },
];

export default function Header() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const totalCartItems = useCartStore((state) => state.totalItems);
  const totalWishlistItems = useWishlistStore((state) => state.totalItems);
  const { isAuthenticated, user, logout } = useAuthStore();

  function handleLogout() {
    logout();
    router.push("/");
  }

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Hamburger - mobile only */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <i className={`bi ${mobileOpen ? "bi-x-lg" : "bi-list"}`}></i>
        </button>

        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-widest uppercase">
          MENTASTIC
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm tracking-wide text-gray-600 hover:text-black transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-4 text-xl">
          <button aria-label="Search">
            <i className="bi bi-search hover:text-gray-500 transition-colors"></i>
          </button>
          <Link href="/wishlist" aria-label="Wishlist" className="relative">
            <i className="bi bi-heart hover:text-gray-500 transition-colors"></i>
            {totalWishlistItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {totalWishlistItems()}
              </span>
            )}
          </Link>
          <Link href="/cart" aria-label="Cart" className="relative">
            <i className="bi bi-bag hover:text-gray-500 transition-colors"></i>
            {totalCartItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {totalCartItems()}
              </span>
            )}
          </Link>

          {/* Account */}
          {isAuthenticated ? (
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm font-medium">
                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold">
                  {user?.email?.[0].toUpperCase()}
                </div>
              </button>
              {/* Dropdown */}
              <div className="absolute right-0 top-10 w-48 bg-white border border-zinc-100 rounded-2xl shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <Link
                  href="/account/profile"
                  className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-zinc-50 transition-colors"
                >
                  <i className="bi bi-person"></i> Profile
                </Link>
                <Link
                  href="/account/orders"
                  className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-zinc-50 transition-colors"
                >
                  <i className="bi bi-box"></i> Orders
                </Link>
                <Link
                  href="/wishlist"
                  className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-zinc-50 transition-colors"
                >
                  <i className="bi bi-heart"></i> Wishlist
                </Link>
                <div className="border-t border-zinc-100 mt-2 pt-2">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors w-full"
                  >
                    <i className="bi bi-box-arrow-right"></i> Sign Out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link href="/login" aria-label="Account">
              <i className="bi bi-person hover:text-gray-500 transition-colors"></i>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm tracking-wide text-gray-700"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-zinc-100 pt-4 flex flex-col gap-3">
            {isAuthenticated ? (
              <>
                <Link href="/account/profile" className="text-sm text-gray-700">
                  My Account
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm text-red-500 text-left"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm text-gray-700">
                  Sign In
                </Link>
                <Link href="/register" className="text-sm text-gray-700">
                  Create Account
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}