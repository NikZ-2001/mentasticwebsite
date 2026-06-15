"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  function handleSubmit() {
    if (!email) {
      alert("Please enter your email");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 2000);
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold tracking-widest uppercase">
            MENTASTIC
          </Link>
          <h1 className="text-xl font-semibold mt-4 tracking-tight">
            Forgot your password?
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Enter your email and we'll send you a reset link
          </p>
        </div>

        {sent ? (
          <div className="flex flex-col items-center gap-4 text-center py-8">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
              <i className="bi bi-envelope-check text-3xl text-green-600"></i>
            </div>
            <h2 className="text-lg font-semibold">Check your email</h2>
            <p className="text-gray-500 text-sm max-w-sm">
              We've sent a password reset link to{" "}
              <span className="font-medium text-black">{email}</span>
            </p>
            <p className="text-xs text-gray-400">
              Didn't receive it? Check your spam folder or try again.
            </p>
            <button
              onClick={() => setSent(false)}
              className="text-sm text-black font-medium hover:underline"
            >
              Try again
            </button>
            <Link
              href="/login"
              className="w-full bg-black text-white py-4 rounded-full text-sm font-medium tracking-wide hover:bg-zinc-800 transition-colors text-center mt-2"
            >
              Back to Sign In
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="px-4 py-3 rounded-xl border border-zinc-200 text-sm outline-none focus:border-black transition-colors"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-black text-white py-4 rounded-full text-sm font-medium tracking-wide hover:bg-zinc-800 transition-colors disabled:opacity-50 mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="bi bi-arrow-repeat animate-spin"></i>
                  Sending...
                </span>
              ) : (
                "Send Reset Link"
              )}
            </button>

            <p className="text-center text-sm text-gray-500 mt-2">
              Remembered your password?{" "}
              <Link
                href="/login"
                className="text-black font-medium hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}