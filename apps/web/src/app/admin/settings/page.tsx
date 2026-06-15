"use client";

import { useState } from "react";

export default function AdminSettingsPage() {
  const [store, setStore] = useState({
    name: "MENTASTIC",
    tagline: "Look Fantastic",
    email: "hello@mentastic.com",
    phone: "+91 98765 43210",
    address: "Anna Nagar, Chennai, Tamil Nadu 600040",
    currency: "INR",
    gst: "33AAACM0000A1Z5",
  });

  const [shipping, setShipping] = useState({
    freeShippingThreshold: 999,
    standardShipping: 99,
  });

  const [saved, setSaved] = useState(false);

  function handleStoreChange(e: React.ChangeEvent<HTMLInputElement>) {
    setStore({ ...store, [e.target.name]: e.target.value });
  }

  function handleShippingChange(e: React.ChangeEvent<HTMLInputElement>) {
    setShipping({ ...shipping, [e.target.name]: Number(e.target.value) });
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="p-8 flex flex-col gap-8">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage your store settings
        </p>
      </div>

      {/* Store Info */}
      <div className="bg-white border border-zinc-100 rounded-2xl p-6 flex flex-col gap-5">
        <h2 className="font-semibold">Store Information</h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Store Name</label>
            <input
              name="name"
              value={store.name}
              onChange={handleStoreChange}
              className="px-4 py-3 rounded-xl border border-zinc-200 text-sm outline-none focus:border-black transition-colors"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Tagline</label>
            <input
              name="tagline"
              value={store.tagline}
              onChange={handleStoreChange}
              className="px-4 py-3 rounded-xl border border-zinc-200 text-sm outline-none focus:border-black transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              value={store.email}
              onChange={handleStoreChange}
              className="px-4 py-3 rounded-xl border border-zinc-200 text-sm outline-none focus:border-black transition-colors"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Phone</label>
            <input
              name="phone"
              value={store.phone}
              onChange={handleStoreChange}
              className="px-4 py-3 rounded-xl border border-zinc-200 text-sm outline-none focus:border-black transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Address</label>
          <input
            name="address"
            value={store.address}
            onChange={handleStoreChange}
            className="px-4 py-3 rounded-xl border border-zinc-200 text-sm outline-none focus:border-black transition-colors"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Currency</label>
            <input
              name="currency"
              value={store.currency}
              onChange={handleStoreChange}
              className="px-4 py-3 rounded-xl border border-zinc-200 text-sm outline-none focus:border-black transition-colors"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">GST Number</label>
            <input
              name="gst"
              value={store.gst}
              onChange={handleStoreChange}
              className="px-4 py-3 rounded-xl border border-zinc-200 text-sm outline-none focus:border-black transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Shipping */}
      <div className="bg-white border border-zinc-100 rounded-2xl p-6 flex flex-col gap-5">
        <h2 className="font-semibold">Shipping Settings</h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">
              Free Shipping Threshold (₹)
            </label>
            <input
              name="freeShippingThreshold"
              type="number"
              value={shipping.freeShippingThreshold}
              onChange={handleShippingChange}
              className="px-4 py-3 rounded-xl border border-zinc-200 text-sm outline-none focus:border-black transition-colors"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">
              Standard Shipping Charge (₹)
            </label>
            <input
              name="standardShipping"
              type="number"
              value={shipping.standardShipping}
              onChange={handleShippingChange}
              className="px-4 py-3 rounded-xl border border-zinc-200 text-sm outline-none focus:border-black transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Integrations */}
      <div className="bg-white border border-zinc-100 rounded-2xl p-6 flex flex-col gap-5">
        <h2 className="font-semibold">Integrations</h2>
        <div className="flex flex-col gap-3">
          {[
            { name: "Razorpay", desc: "Payment gateway", status: "Connected", icon: "bi-credit-card" },
            { name: "Shiprocket", desc: "Shipping partner", status: "Not Connected", icon: "bi-truck" },
            { name: "Cloudinary", desc: "Image storage", status: "Connected", icon: "bi-cloud" },
            { name: "Google Analytics", desc: "Website analytics", status: "Not Connected", icon: "bi-bar-chart" },
          ].map((integration) => (
            <div
              key={integration.name}
              className="flex items-center justify-between p-4 border border-zinc-100 rounded-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center">
                  <i className={`bi ${integration.icon} text-base`}></i>
                </div>
                <div>
                  <p className="text-sm font-medium">{integration.name}</p>
                  <p className="text-xs text-gray-400">{integration.desc}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    integration.status === "Connected"
                      ? "bg-green-50 text-green-600"
                      : "bg-zinc-100 text-zinc-500"
                  }`}
                >
                  {integration.status}
                </span>
                <button className="text-xs border border-zinc-200 px-3 py-1.5 rounded-lg hover:border-black transition-colors">
                  {integration.status === "Connected" ? "Configure" : "Connect"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className={`w-full py-4 rounded-full text-sm font-medium tracking-wide transition-all ${
          saved
            ? "bg-green-600 text-white"
            : "bg-black text-white hover:bg-zinc-800"
        }`}
      >
        {saved ? (
          <span className="flex items-center justify-center gap-2">
            <i className="bi bi-check-lg"></i> Settings Saved
          </span>
        ) : (
          "Save Settings"
        )}
      </button>
    </div>
  );
}