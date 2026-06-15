"use client";

import Link from "next/link";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore();
  const addToCart = useCartStore((state) => state.addItem);

  function handleMoveToCart(item: typeof items[0]) {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      slug: item.slug,
      size: "M",
      quantity: 1,
    });
    removeItem(item.id);
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col items-center justify-center gap-6 text-center">
        <i className="bi bi-heart text-6xl text-zinc-200"></i>
        <h1 className="text-2xl font-bold tracking-tight">Your wishlist is empty</h1>
        <p className="text-gray-500 text-sm">
          Save items you love and come back to them later.
        </p>
        <Link
          href="/products"
          className="bg-black text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-zinc-800 transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Wishlist{" "}
          <span className="text-gray-400 font-normal text-xl">
            ({items.length} items)
          </span>
        </h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {items.map((item) => (
          <div key={item.id} className="group relative">
            {/* Image */}
            <Link href={`/products/${item.slug}`}>
              <div className="relative overflow-hidden rounded-2xl bg-zinc-100 aspect-[3/4]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Remove Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    removeItem(item.id);
                  }}
                  className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-red-50 transition-colors"
                  aria-label="Remove from wishlist"
                >
                  <i className="bi bi-heart-fill text-sm text-red-500"></i>
                </button>
              </div>
            </Link>

            {/* Info */}
            <div className="mt-3 flex flex-col gap-2">
              <Link href={`/products/${item.slug}`}>
                <p className="text-sm font-medium leading-snug hover:underline">
                  {item.name}
                </p>
              </Link>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">₹{item.price}</span>
                {item.originalPrice && (
                  <span className="text-xs text-gray-400 line-through">
                    ₹{item.originalPrice}
                  </span>
                )}
              </div>
              <button
                onClick={() => handleMoveToCart(item)}
                className="w-full border border-zinc-200 py-2 rounded-full text-xs font-medium hover:bg-black hover:text-white hover:border-black transition-all"
              >
                Move to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}