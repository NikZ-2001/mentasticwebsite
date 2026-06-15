import ProductCard from "@/components/shop/ProductCard";
import { productsApi } from "@/lib/api";

interface Variant {
  id: string;
  price: number;
  mrp: number;
  size: string;
  stock: number;
}

interface ProductImage {
  url: string;
  isPrimary: boolean;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  variants: Variant[];
  images: ProductImage[];
  isFeatured: boolean;
}

export default async function ProductsPage() {
  let products: Product[] = [];

  try {
    products = (await productsApi.getAll()) as Product[];
  } catch (error) {
    console.error('Failed to fetch products:', error);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">All Products</h1>
        <p className="text-gray-500 text-sm mt-1">{products.length} products</p>
      </div>

      {/* Sort Bar */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-100">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <i className="bi bi-funnel"></i>
          <span>Filter</span>
        </div>
        <select className="text-sm border border-zinc-200 rounded-full px-4 py-2 outline-none cursor-pointer">
          <option value="newest">Newest First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="best-selling">Best Selling</option>
        </select>
      </div>

      {/* Product Grid */}
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
          <i className="bi bi-bag text-6xl text-zinc-200"></i>
          <p className="text-lg font-semibold">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => {
            const primaryImage = product.images.find((i) => i.isPrimary);
            const lowestVariant = product.variants.reduce((a, b) =>
              a.price < b.price ? a : b
            );
            const highestMrp = product.variants.reduce((a, b) =>
              a.mrp > b.mrp ? a : b
            );
            const isOnSale = lowestVariant.price < highestMrp.mrp;

            return (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                slug={product.slug}
                price={lowestVariant.price}
                originalPrice={isOnSale ? highestMrp.mrp : undefined}
                image={
                  primaryImage?.url ||
                  'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600'
                }
                isNew={product.isFeatured}
                isSale={isOnSale}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}