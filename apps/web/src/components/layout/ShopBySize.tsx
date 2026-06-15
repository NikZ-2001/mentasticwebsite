import Link from "next/link";

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export default function ShopBySize() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold tracking-tight">Shop By Size</h2>
        <p className="text-gray-500 text-sm mt-1">
          Find styles that fit you perfectly
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {sizes.map((size) => (
          <Link
            key={size}
            href={`/products?size=${size}`}
            className="w-20 h-20 rounded-2xl border border-zinc-200 flex items-center justify-center text-sm font-semibold tracking-wide hover:bg-black hover:text-white hover:border-black transition-all"
          >
            {size}
          </Link>
        ))}
      </div>
    </section>
  );
}