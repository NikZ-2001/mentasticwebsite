"use client";

import { useState, useEffect } from "react";
import { productsApi } from "@/lib/api";

interface Variant {
  id: string;
  sku: string;
  size: string;
  price: number;
  mrp: number;
  stock: number;
}

interface ProductImage {
  url: string;
  isPrimary: boolean;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  variants: Variant[];
  images: ProductImage[];
}

interface POSCartItem {
  variantId: string;
  productName: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
}

const GST_RATE = 0.05;

export default function POSPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<POSCartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<"CASH" | "UPI" | "CARD">("CASH");
  const [discount, setDiscount] = useState(0);
  const [saleComplete, setSaleComplete] = useState(false);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await productsApi.getAll() as Product[];
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    }
    loadProducts();
  }, []);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  function addToCart(product: Product, variant: Variant) {
    const existing = cart.find((i) => i.variantId === variant.id);
    const image = product.images.find((i) => i.isPrimary)?.url || "";

    if (existing) {
      setCart(
        cart.map((i) =>
          i.variantId === variant.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      );
    } else {
      setCart([
        ...cart,
        {
          variantId: variant.id,
          productName: product.name,
          size: variant.size,
          price: variant.price,
          quantity: 1,
          image,
        },
      ]);
    }
  }

  function removeFromCart(variantId: string) {
    setCart(cart.filter((i) => i.variantId !== variantId));
  }

  function updateQuantity(variantId: string, quantity: number) {
    if (quantity < 1) {
      removeFromCart(variantId);
      return;
    }
    setCart(
      cart.map((i) =>
        i.variantId === variantId ? { ...i, quantity } : i
      )
    );
  }

  const subtotal = cart.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const tax = Math.round(subtotal * GST_RATE);
  const total = subtotal + tax - discount;

  function handleCompleteSale() {
    if (cart.length === 0) return;
    setSaleComplete(true);
    setTimeout(() => {
      setCart([]);
      setDiscount(0);
      setSaleComplete(false);
    }, 3000);
  }

  return (
    <div className="h-screen flex flex-col bg-zinc-50">

      {/* Header */}
      <div className="bg-black text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <i className="bi bi-shop text-xl"></i>
          <div>
            <p className="font-bold tracking-widest text-sm uppercase">MENTASTIC POS</p>
            <p className="text-xs text-zinc-400">Anna Nagar, Chennai</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-zinc-400">
            {new Date().toLocaleDateString("en-IN", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </span>
          <div className="w-2 h-2 rounded-full bg-green-400"></div>
          <span className="text-zinc-400">Live</span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">

        {/* Left - Products */}
        <div className="flex-1 flex flex-col overflow-hidden border-r border-zinc-200">

          {/* Search */}
          <div className="p-4 bg-white border-b border-zinc-100">
            <div className="relative">
              <i className="bi bi-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-200 text-sm outline-none focus:border-black transition-colors"
              />
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {filtered.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border border-zinc-100 rounded-2xl overflow-hidden"
                >
                  {/* Image */}
                  <div className="aspect-square bg-zinc-100 overflow-hidden">
                    <img
                      src={
                        product.images.find((i) => i.isPrimary)?.url ||
                        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400"
                      }
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="p-3">
                    <p className="text-xs font-semibold truncate">{product.name}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      ₹{Math.min(...product.variants.map((v) => v.price))}
                    </p>

                    {/* Size Buttons */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {product.variants.map((variant) => (
                        <button
                          key={variant.id}
                          onClick={() => addToCart(product, variant)}
                          disabled={variant.stock === 0}
                          className={`text-xs px-2 py-1 rounded-lg border transition-all ${
                            variant.stock === 0
                              ? "border-zinc-100 text-zinc-300 cursor-not-allowed"
                              : "border-zinc-200 hover:bg-black hover:text-white hover:border-black"
                          }`}
                        >
                          {variant.size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right - Cart */}
        <div className="w-96 flex flex-col bg-white">

          {/* Cart Header */}
          <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
            <h2 className="font-semibold">
              Cart{" "}
              <span className="text-gray-400 font-normal text-sm">
                ({cart.length} items)
              </span>
            </h2>
            {cart.length > 0 && (
              <button
                onClick={() => setCart([])}
                className="text-xs text-red-500 hover:text-red-700 transition-colors"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-5 py-3 flex flex-col gap-3">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
                <i className="bi bi-cart3 text-5xl text-zinc-200"></i>
                <p className="text-sm text-gray-400">
                  Click a size to add items
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.variantId}
                  className="flex items-center gap-3 p-3 bg-zinc-50 rounded-xl"
                >
                  <div className="w-12 h-14 rounded-lg overflow-hidden bg-zinc-200 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">
                      {item.productName}
                    </p>
                    <p className="text-xs text-gray-400">
                      Size: {item.size} · ₹{item.price}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() =>
                          updateQuantity(item.variantId, item.quantity - 1)
                        }
                        className="w-5 h-5 rounded-full border border-zinc-200 flex items-center justify-center text-xs hover:border-black transition-colors"
                      >
                        <i className="bi bi-dash"></i>
                      </button>
                      <span className="text-xs font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.variantId, item.quantity + 1)
                        }
                        className="w-5 h-5 rounded-full border border-zinc-200 flex items-center justify-center text-xs hover:border-black transition-colors"
                      >
                        <i className="bi bi-plus"></i>
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <p className="text-xs font-semibold">
                      ₹{item.price * item.quantity}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.variantId)}
                      className="text-red-400 hover:text-red-600 transition-colors"
                    >
                      <i className="bi bi-x text-sm"></i>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer */}
          {cart.length > 0 && (
            <div className="border-t border-zinc-100 p-5 flex flex-col gap-4">

              {/* Discount */}
              <div className="flex items-center gap-3">
                <label className="text-xs font-medium text-gray-500 w-20">
                  Discount
                </label>
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                  className="flex-1 px-3 py-2 rounded-xl border border-zinc-200 text-sm outline-none focus:border-black transition-colors"
                  placeholder="₹0"
                  min={0}
                />
              </div>

              {/* Totals */}
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>GST (5%)</span>
                  <span>₹{tax}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-base border-t border-zinc-100 pt-2">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              {/* Payment Method */}
              <div className="flex items-center gap-2">
                {(["CASH", "UPI", "CARD"] as const).map((method) => (
                  <button
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`flex-1 py-2 rounded-xl text-xs font-medium border transition-all ${
                      paymentMethod === method
                        ? "bg-black text-white border-black"
                        : "border-zinc-200 hover:border-black"
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>

              {/* Complete Sale */}
              <button
                onClick={handleCompleteSale}
                className={`w-full py-4 rounded-full text-sm font-medium tracking-wide transition-all ${
                  saleComplete
                    ? "bg-green-600 text-white"
                    : "bg-black text-white hover:bg-zinc-800"
                }`}
              >
                {saleComplete ? (
                  <span className="flex items-center justify-center gap-2">
                    <i className="bi bi-check-lg"></i>
                    Sale Complete!
                  </span>
                ) : (
                  `Collect ₹${total} · ${paymentMethod}`
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}