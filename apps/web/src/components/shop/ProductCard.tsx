import Link from "next/link";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  slug: string;
  isNew?: boolean;
  isSale?: boolean;
}

export default function ProductCard({
  name,
  price,
  originalPrice,
  image,
  slug,
  isNew,
  isSale,
}: ProductCardProps) {
  return (
    <div className="group relative">
      {/* Image */}
      <Link href={`/products/${slug}`}>
        <div className="relative overflow-hidden rounded-2xl bg-zinc-100 aspect-[3/4]">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {isNew && (
              <span className="bg-black text-white text-xs px-2 py-1 rounded-full">
                New
              </span>
            )}
            {isSale && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                Sale
              </span>
            )}
          </div>
          {/* Wishlist */}
          <button
            className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
            aria-label="Add to wishlist"
          >
            <i className="bi bi-heart text-sm"></i>
          </button>
        </div>
      </Link>

      {/* Info */}
      <div className="mt-3 flex items-start justify-between gap-2">
        <div>
          <Link href={`/products/${slug}`}>
            <p className="text-sm font-medium leading-snug hover:underline">{name}</p>
          </Link>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-semibold">₹{price}</span>
            {originalPrice && (
              <span className="text-xs text-gray-400 line-through">₹{originalPrice}</span>
            )}
          </div>
        </div>
        <button
          className="flex-shrink-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center hover:bg-zinc-700 transition-colors"
          aria-label="Add to cart"
        >
          <i className="bi bi-plus text-lg"></i>
        </button>
      </div>
    </div>
  );
}