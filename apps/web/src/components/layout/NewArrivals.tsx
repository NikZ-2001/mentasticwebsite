import Link from "next/link";
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

export default async function NewArrivals() {
  let products: Product[] = [];

  try {
    const all = (await productsApi.getAll({ sort: "newest" })) as Product[];
    products = all.slice(0, 4);
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold tracking-tight">New Arrivals</h2>
        <Link
          href="/products?sort=newest"
          className="text-sm text-gray-500 hover:text-black transition-colors"
        >
          View all →
        </Link>
      </div>
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
                "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600"
              }
              isNew={product.isFeatured}
              isSale={isOnSale}
            />
          );
        })}
      </div>
    </section>
  );
}