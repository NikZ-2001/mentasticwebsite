"use client";

import { useState } from "react";

export default function ProfilePage() {
  const [form, setForm] = useState({
    firstName: "Nikson",
    lastName: "Andrew",
    email: "nikson@mentastic.com",
    phone: "+91 98765 43210",
  });
  const [saved, setSaved] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="flex flex-col gap-8">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage your personal information
        </p>
      </div>

      {/* Avatar */}
      <div className="flex items-center gap-5">
        <div className="w-20 h-20 rounded-full bg-zinc-950 text-white flex items-center justify-center text-2xl font-bold">
          {form.firstName[0]}{form.lastName[0]}
        </div>
        <div>
          <p className="font-semibold">
            {form.firstName} {form.lastName}
          </p>
          <p className="text-sm text-gray-500">{form.email}</p>
          <button className="text-xs text-gray-500 underline hover:text-black transition-colors mt-1">
            Change photo
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-6 flex flex-col gap-5">
        <h2 className="text-base font-semibold">Personal Information</h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">First Name</label>
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              className="px-4 py-3 rounded-xl border border-zinc-200 bg-white text-sm outline-none focus:border-black transition-colors"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Last Name</label>
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              className="px-4 py-3 rounded-xl border border-zinc-200 bg-white text-sm outline-none focus:border-black transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="px-4 py-3 rounded-xl border border-zinc-200 bg-white text-sm outline-none focus:border-black transition-colors"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Phone</label>
          <input
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            className="px-4 py-3 rounded-xl border border-zinc-200 bg-white text-sm outline-none focus:border-black transition-colors"
          />
        </div>

        <button
          onClick={handleSave}
          className={`w-full py-3 rounded-full text-sm font-medium tracking-wide transition-all ${
            saved
              ? "bg-green-600 text-white"
              : "bg-black text-white hover:bg-zinc-800"
          }`}
        >
          {saved ? (
            <span className="flex items-center justify-center gap-2">
              <i className="bi bi-check-lg"></i> Saved
            </span>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>

      {/* Password Section */}
      <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-6 flex flex-col gap-4">
        <h2 className="text-base font-semibold">Password</h2>
        <p className="text-sm text-gray-500">
          Change your password to keep your account secure.
        </p>
        <button className="w-full border border-zinc-200 py-3 rounded-full text-sm font-medium hover:border-black transition-colors">
          Change Password
        </button>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 border border-red-100 rounded-2xl p-6 flex flex-col gap-4">
        <h2 className="text-base font-semibold text-red-600">Danger Zone</h2>
        <p className="text-sm text-gray-500">
          Permanently delete your account and all associated data.
        </p>
        <button className="w-full border border-red-200 text-red-500 py-3 rounded-full text-sm font-medium hover:bg-red-500 hover:text-white transition-all">
          Delete Account
        </button>
      </div>
    </div>
  );
}