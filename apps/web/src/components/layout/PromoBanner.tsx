import Link from "next/link";

export default function PromoBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-zinc-950 rounded-3xl px-8 py-14 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-white text-center md:text-left">
          <p className="text-xs tracking-[0.4em] uppercase text-zinc-400 mb-3">
            Limited Time
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Up to 50% Off <br className="hidden md:block" /> Sale Items
          </h2>
          <p className="text-zinc-400 text-sm max-w-sm">
            Fresh styles added every weekend. Visit our stall in Anna Nagar or shop online.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/products?sale=true"
            className="bg-white text-black px-8 py-3 rounded-full text-sm font-medium tracking-wide hover:bg-zinc-200 transition-colors whitespace-nowrap"
          >
            Shop the Sale
          </Link>
          <Link
            href="/products"
            className="border border-white/30 text-white px-8 py-3 rounded-full text-sm font-medium tracking-wide hover:bg-white/10 transition-colors whitespace-nowrap"
          >
            Browse All
          </Link>
        </div>
      </div>
    </section>
  );
}