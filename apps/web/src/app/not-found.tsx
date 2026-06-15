import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center gap-6">
      <p className="text-8xl font-bold tracking-tighter text-zinc-100">404</p>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Page not found</h1>
        <p className="text-gray-500 text-sm max-w-sm">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="bg-black text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-zinc-800 transition-colors"
        >
          Go Home
        </Link>
        <Link
          href="/products"
          className="border border-zinc-200 px-8 py-3 rounded-full text-sm font-medium hover:border-black transition-colors"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
}