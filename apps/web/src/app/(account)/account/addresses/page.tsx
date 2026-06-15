"use client";

import { useState } from "react";

const defaultAddresses = [
  {
    id: "1",
    name: "Nikson Andrew",
    phone: "+91 98765 43210",
    address: "12, 4th Cross Street, Anna Nagar",
    city: "Chennai",
    state: "Tamil Nadu",
    pincode: "600040",
    isDefault: true,
  },
];

export default function AddressesPage() {
  const [addresses, setAddresses] = useState(defaultAddresses);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleAdd() {
    if (!form.name || !form.phone || !form.address || !form.city || !form.state || !form.pincode) {
      alert("Please fill in all fields");
      return;
    }
    setAddresses([
      ...addresses,
      { ...form, id: Date.now().toString(), isDefault: false },
    ]);
    setForm({ name: "", phone: "", address: "", city: "", state: "", pincode: "" });
    setShowForm(false);
  }

  function handleDelete(id: string) {
    setAddresses(addresses.filter((a) => a.id !== id));
  }

  function handleSetDefault(id: string) {
    setAddresses(
      addresses.map((a) => ({ ...a, isDefault: a.id === id }))
    );
  }

  return (
    <div className="flex flex-col gap-8">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Addresses</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage your saved addresses
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-zinc-800 transition-colors flex items-center gap-2"
        >
          <i className="bi bi-plus-lg"></i>
          Add New
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-6 flex flex-col gap-4">
          <h2 className="text-base font-semibold">New Address</h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Nikson Andrew"
                className="px-4 py-3 rounded-xl border border-zinc-200 bg-white text-sm outline-none focus:border-black transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="px-4 py-3 rounded-xl border border-zinc-200 bg-white text-sm outline-none focus:border-black transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Address</label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Flat no, Street, Area"
              className="px-4 py-3 rounded-xl border border-zinc-200 bg-white text-sm outline-none focus:border-black transition-colors"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">City</label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="Chennai"
                className="px-4 py-3 rounded-xl border border-zinc-200 bg-white text-sm outline-none focus:border-black transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">State</label>
              <input
                name="state"
                value={form.state}
                onChange={handleChange}
                placeholder="Tamil Nadu"
                className="px-4 py-3 rounded-xl border border-zinc-200 bg-white text-sm outline-none focus:border-black transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Pincode</label>
              <input
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
                placeholder="600040"
                className="px-4 py-3 rounded-xl border border-zinc-200 bg-white text-sm outline-none focus:border-black transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleAdd}
              className="flex-1 bg-black text-white py-3 rounded-full text-sm font-medium hover:bg-zinc-800 transition-colors"
            >
              Save Address
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="flex-1 border border-zinc-200 py-3 rounded-full text-sm font-medium hover:border-black transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Address List */}
      {addresses.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
          <i className="bi bi-geo-alt text-6xl text-zinc-200"></i>
          <p className="text-lg font-semibold">No addresses saved</p>
          <p className="text-gray-500 text-sm">
            Add a delivery address to speed up checkout.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`border rounded-2xl p-5 flex flex-col gap-3 ${
                addr.isDefault
                  ? "border-black bg-zinc-50"
                  : "border-zinc-100 bg-white"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-semibold">{addr.name}</p>
                    {addr.isDefault && (
                      <span className="text-xs bg-black text-white px-2 py-0.5 rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{addr.address}</p>
                  <p className="text-sm text-gray-500">
                    {addr.city}, {addr.state} — {addr.pincode}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{addr.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-zinc-200">
                {!addr.isDefault && (
                  <button
                    onClick={() => handleSetDefault(addr.id)}
                    className="text-xs text-gray-500 hover:text-black transition-colors"
                  >
                    Set as Default
                  </button>
                )}
                <button className="text-xs text-gray-500 hover:text-black transition-colors">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(addr.id)}
                  className="text-xs text-red-500 hover:text-red-700 transition-colors ml-auto"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}