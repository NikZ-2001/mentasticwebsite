"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit() {
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="bg-zinc-50 border border-zinc-100 rounded-3xl px-8 py-14 flex flex-col items-center text-center gap-6">
        <p className="text-xs tracking-[0.4em] uppercase text-zinc-400">
          Stay in the loop
        </p>
        <h2 className="text-3xl font-bold tracking-tight">
          Get Early Access to New Drops
        </h2>
        <p className="text-gray-500 text-sm max-w-md">
          Subscribe to get notified about new arrivals, exclusive offers and weekend stall updates.
        </p>
        {submitted ? (
          <div className="flex items-center gap-2 text-green-600 font-medium">
            <i className="bi bi-check-circle-fill"></i>
            <span>You're in! We'll be in touch soon.</span>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3 rounded-full border border-zinc-200 text-sm outline-none focus:border-black transition-colors"
            />
            <button
              onClick={handleSubmit}
              className="w-full sm:w-auto bg-black text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-zinc-800 transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </div>
        )}
        <p className="text-xs text-gray-400">No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}