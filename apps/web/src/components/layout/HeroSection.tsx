import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="w-full bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto px-4 min-h-[85vh] flex flex-col items-center justify-center text-center gap-6">
        <p className="text-xs tracking-[0.4em] uppercase text-zinc-400">
          New Collection — 2025
        </p>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none">
          Look <span className="italic font-light">Fantastic</span>
        </h1>
        <p className="text-zinc-400 text-base md:text-lg max-w-md">
          Premium everyday fashion for men. Fresh drops every weekend in Anna Nagar, Chennai.
        </p>
        <div className="flex items-center gap-4 mt-4">
          <Link
            href="/products"
            className="bg-white text-black px-8 py-3 rounded-full text-sm font-medium tracking-wide hover:bg-zinc-200 transition-colors"
          >
            Shop Now
          </Link>
          <Link
            href="/products?sort=newest"
            className="border border-white/30 text-white px-8 py-3 rounded-full text-sm font-medium tracking-wide hover:bg-white/10 transition-colors"
          >
            New Arrivals
          </Link>
        </div>
      </div>
    </section>
  );
}