export default function Loading() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm text-gray-500 tracking-wide">Loading...</p>
      </div>
    </div>
  );
}