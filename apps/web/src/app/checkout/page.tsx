"use client";

import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

export default function CheckoutPage() {
  const { items, totalPrice } = useCartStore();
  const [step, setStep] = useState<"details" | "payment">("details");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleContinue() {
    const { firstName, lastName, email, phone, address, city, state, pincode } = form;
    if (!firstName || !lastName || !email || !phone || !address || !city || !state || !pincode) {
      alert("Please fill in all fields");
      return;
    }
    setStep("payment");
  }

  const shipping = totalPrice() >= 999 ? 0 : 99;
  const total = totalPrice() + shipping;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col items-center justify-center gap-6 text-center">
        <i className="bi bi-bag text-6xl text-zinc-200"></i>
        <h1 className="text-2xl font-bold tracking-tight">Your cart is empty</h1>
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
      <h1 className="text-3xl font-bold tracking-tight mb-8">Checkout</h1>

      {/* Steps */}
      <div className="flex items-center gap-4 mb-10">
        <div className={`flex items-center gap-2 text-sm font-medium ${step === "details" ? "text-black" : "text-green-600"}`}>
          <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step === "details" ? "bg-black text-white" : "bg-green-600 text-white"}`}>
            {step === "payment" ? <i className="bi bi-check-lg"></i> : "1"}
          </span>
          Delivery Details
        </div>
        <div className="flex-1 h-px bg-zinc-200"></div>
        <div className={`flex items-center gap-2 text-sm font-medium ${step === "payment" ? "text-black" : "text-gray-400"}`}>
          <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step === "payment" ? "bg-black text-white" : "bg-zinc-200 text-gray-400"}`}>
            2
          </span>
          Payment
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Left - Form */}
        <div className="lg:col-span-2">
          {step === "details" && (
            <div className="flex flex-col gap-6">
              <h2 className="text-lg font-semibold">Delivery Details</h2>

              {/* Name */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">First Name</label>
                  <input
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="Nikson"
                    className="px-4 py-3 rounded-xl border border-zinc-200 text-sm outline-none focus:border-black transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <input
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Andrew"
                    className="px-4 py-3 rounded-xl border border-zinc-200 text-sm outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>

              {/* Contact */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@email.com"
                    className="px-4 py-3 rounded-xl border border-zinc-200 text-sm outline-none focus:border-black transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Phone</label>
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="px-4 py-3 rounded-xl border border-zinc-200 text-sm outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Address</label>
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Flat no, Street, Area"
                  className="px-4 py-3 rounded-xl border border-zinc-200 text-sm outline-none focus:border-black transition-colors"
                />
              </div>

              {/* City, State, Pincode */}
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">City</label>
                  <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="Chennai"
                    className="px-4 py-3 rounded-xl border border-zinc-200 text-sm outline-none focus:border-black transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">State</label>
                  <input
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    placeholder="Tamil Nadu"
                    className="px-4 py-3 rounded-xl border border-zinc-200 text-sm outline-none focus:border-black transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Pincode</label>
                  <input
                    name="pincode"
                    value={form.pincode}
                    onChange={handleChange}
                    placeholder="600040"
                    className="px-4 py-3 rounded-xl border border-zinc-200 text-sm outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>

              <button
                onClick={handleContinue}
                className="w-full bg-black text-white py-4 rounded-full text-sm font-medium tracking-wide hover:bg-zinc-800 transition-colors mt-2"
              >
                Continue to Payment
              </button>
            </div>
          )}

          {step === "payment" && (
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setStep("details")}
                  className="text-sm text-gray-500 hover:text-black transition-colors flex items-center gap-1"
                >
                  <i className="bi bi-arrow-left"></i> Back
                </button>
                <h2 className="text-lg font-semibold">Payment Method</h2>
              </div>

              {/* Payment Options */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-4 p-4 border-2 border-black rounded-2xl cursor-pointer">
                  <div className="w-5 h-5 rounded-full border-2 border-black flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-black"></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Razorpay</p>
                    <p className="text-xs text-gray-500">UPI, Cards, Net Banking, Wallets</p>
                  </div>
                  <i className="bi bi-shield-check text-green-600"></i>
                </div>

                <div className="flex items-center gap-4 p-4 border border-zinc-200 rounded-2xl cursor-pointer opacity-50">
                  <div className="w-5 h-5 rounded-full border-2 border-zinc-300"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Cash on Delivery</p>
                    <p className="text-xs text-gray-500">Coming soon</p>
                  </div>
                </div>
              </div>

              {/* Delivery Address Summary */}
              <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium">Delivering to</p>
                  <button
                    onClick={() => setStep("details")}
                    className="text-xs text-gray-500 underline hover:text-black transition-colors"
                  >
                    Edit
                  </button>
                </div>
                <p className="text-sm text-gray-600">
                  {form.firstName} {form.lastName}
                </p>
                <p className="text-sm text-gray-500">
                  {form.address}, {form.city}, {form.state} — {form.pincode}
                </p>
                <p className="text-sm text-gray-500">{form.phone}</p>
              </div>

              <button className="w-full bg-black text-white py-4 rounded-full text-sm font-medium tracking-wide hover:bg-zinc-800 transition-colors">
                Place Order — ₹{total}
              </button>

              <p className="text-xs text-center text-gray-400 flex items-center justify-center gap-1">
                <i className="bi bi-lock-fill"></i>
                Secure checkout powered by Razorpay
              </p>
            </div>
          )}
        </div>

        {/* Right - Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-6 flex flex-col gap-4 sticky top-24">
            <h2 className="text-lg font-bold tracking-tight">Order Summary</h2>

            {/* Items */}
            <div className="flex flex-col gap-3">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex items-center gap-3">
                  <div className="w-14 h-16 rounded-xl overflow-hidden bg-zinc-100 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{item.name}</p>
                    <p className="text-xs text-gray-400">Size: {item.size} · Qty: {item.quantity}</p>
                  </div>
                  <p className="text-xs font-semibold flex-shrink-0">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-zinc-200 pt-4 flex flex-col gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium">₹{totalPrice()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    `₹${shipping}`
                  )}
                </span>
              </div>
              <div className="border-t border-zinc-200 pt-3 flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-base">₹{total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}