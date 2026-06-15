"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  }

  async function handleSubmit() {
    if (!form.email || !form.password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await authApi.login(form) as any;

      useAuthStore.getState().setAuth(
        res.user,
        res.access_token
      );

      router.push("/account/profile");
    } catch (err: any) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
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
            Welcome back
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            Sign in to your account
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        {/* Form */}
        <div className="flex flex-col gap-4">
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
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Password</label>

              <Link
                href="/forgot-password"
                className="text-xs text-gray-500 hover:text-black transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
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
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-2">
            <div className="flex-1 h-px bg-zinc-200"></div>
            <span className="text-xs text-gray-400">or</span>
            <div className="flex-1 h-px bg-zinc-200"></div>
          </div>

          {/* Google */}
          <button className="w-full border border-zinc-200 py-4 rounded-full text-sm font-medium hover:border-black transition-colors flex items-center justify-center gap-3">
            <i className="bi bi-google"></i>
            Continue with Google
          </button>

          <p className="text-center text-sm text-gray-500 mt-2">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-black font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}