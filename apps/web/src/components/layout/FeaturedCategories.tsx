import Link from "next/link";

const categories = [
  { label: "Oversized Tees", href: "/categories/oversized", emoji: "👕" },
  { label: "Shirts", href: "/categories/shirts", emoji: "🧥" },
  { label: "Bottoms", href: "/categories/bottoms", emoji: "👖" },
  { label: "Co-ords", href: "/categories/coords", emoji: "🎽" },
  { label: "Accessories", href: "/categories/accessories", emoji: "🧢" },
];

export default function FeaturedCategories() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold tracking-tight">Shop by Category</h2>
        <Link
          href="/products"
          className="text-sm text-gray-500 hover:text-black transition-colors"
        >
          View all →
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.href}
            href={cat.href}
            className="group flex flex-col items-center justify-center gap-3 bg-zinc-50 hover:bg-zinc-100 border border-zinc-100 rounded-2xl py-8 transition-all"
          >
            <span className="text-4xl">{cat.emoji}</span>
            <span className="text-sm font-medium tracking-wide">{cat.label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}