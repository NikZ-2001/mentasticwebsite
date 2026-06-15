export default function ProductsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* Header Skeleton */}
      <div className="mb-8">
        <div className="h-8 w-48 bg-zinc-100 rounded-xl animate-pulse"></div>
        <div className="h-4 w-24 bg-zinc-100 rounded-xl animate-pulse mt-2"></div>
      </div>

      {/* Sort Bar Skeleton */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-100">
        <div className="h-4 w-24 bg-zinc-100 rounded-xl animate-pulse"></div>
        <div className="h-9 w-40 bg-zinc-100 rounded-full animate-pulse"></div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3">
            <div className="aspect-[3/4] bg-zinc-100 rounded-2xl animate-pulse"></div>
            <div className="h-4 bg-zinc-100 rounded-xl animate-pulse"></div>
            <div className="h-4 w-20 bg-zinc-100 rounded-xl animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
}