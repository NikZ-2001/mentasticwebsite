"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } =
    useCartStore();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col items-center justify-center gap-6 text-center">
        <i className="bi bi-bag text-6xl text-zinc-200"></i>
        <h1 className="text-2xl font-bold tracking-tight">Your cart is empty</h1>
        <p className="text-gray-500 text-sm">
          Looks like you haven't added anything yet.
        </p>
        <Link
          href="/products"
          className="bg-black text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-zinc-800 transition-colors"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-8">
        Your Cart{" "}
        <span className="text-gray-400 font-normal text-xl">
          ({totalItems()} items)
        </span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Cart Items */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {items.map((item) => (
            <div
              key={`${item.id}-${item.size}`}
              className="flex gap-4 p-4 border border-zinc-100 rounded-2xl"
            >
              {/* Image */}
              <div className="w-24 h-28 rounded-xl overflow-hidden bg-zinc-100 flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-gray-400 mt-1">Size: {item.size}</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id, item.size)}
                    className="text-gray-400 hover:text-black transition-colors"
                    aria-label="Remove item"
                  >
                    <i className="bi bi-x-lg text-sm"></i>
                  </button>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  {/* Quantity */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.size,
                          Math.max(1, item.quantity - 1)
                        )
                      }
                      className="w-7 h-7 rounded-full border border-zinc-200 flex items-center justify-center hover:border-black transition-colors text-sm"
                    >
                      <i className="bi bi-dash"></i>
                    </button>
                    <span className="text-sm font-medium w-5 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.size, item.quantity + 1)
                      }
                      className="w-7 h-7 rounded-full border border-zinc-200 flex items-center justify-center hover:border-black transition-colors text-sm"
                    >
                      <i className="bi bi-plus"></i>
                    </button>
                  </div>

                  {/* Price */}
                  <p className="text-sm font-semibold">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-6 flex flex-col gap-4 sticky top-24">
            <h2 className="text-lg font-bold tracking-tight">Order Summary</h2>

            <div className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium">₹{totalPrice()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span className="font-medium">
                  {totalPrice() >= 999 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    "₹99"
                  )}
                </span>
              </div>
              <div className="border-t border-zinc-200 pt-3 flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-base">
                  ₹{totalPrice() >= 999 ? totalPrice() : totalPrice() + 99}
                </span>
              </div>
            </div>

            {totalPrice() < 999 && (
              <p className="text-xs text-gray-500 bg-yellow-50 border border-yellow-100 rounded-xl px-3 py-2">
                Add ₹{999 - totalPrice()} more for free shipping
              </p>
            )}

            <Link
              href="/checkout"
              className="w-full bg-black text-white py-4 rounded-full text-sm font-medium tracking-wide hover:bg-zinc-800 transition-colors text-center"
            >
              Proceed to Checkout
            </Link>

            <Link
              href="/products"
              className="w-full border border-zinc-200 py-4 rounded-full text-sm font-medium tracking-wide hover:border-black transition-colors text-center"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}