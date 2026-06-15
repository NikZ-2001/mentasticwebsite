import ProductCard from "@/components/shop/ProductCard";

const categoryData: Record<string, { title: string; description: string }> = {
  tops: { title: "Tops", description: "T-shirts, shirts and more" },
  bottoms: { title: "Bottoms", description: "Pants, joggers and chinos" },
  oversized: { title: "Oversized", description: "Relaxed fit oversized styles" },
  shirts: { title: "Shirts", description: "Casual and formal shirts" },
  coords: { title: "Co-ords", description: "Matching sets for every occasion" },
  accessories: { title: "Accessories", description: "Caps, bags and more" },
};

const allProducts = [
  {
    id: "1",
    name: "Classic Black Oversized Tee",
    price: 699,
    originalPrice: 999,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600",
    slug: "classic-black-oversized-tee",
    isNew: true,
    isSale: true,
  },
  {
    id: "2",
    name: "White Linen Shirt",
    price: 1199,
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600",
    slug: "white-linen-shirt",
    isNew: true,
  },
  {
    id: "3",
    name: "Cargo Olive Pants",
    price: 1499,
    originalPrice: 1999,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600",
    slug: "cargo-olive-pants",
    isSale: true,
  },
  {
    id: "4",
    name: "Striped Polo Tee",
    price: 799,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600",
    slug: "striped-polo-tee",
    isNew: true,
  },
  {
    id: "5",
    name: "Navy Blue Slim Fit Shirt",
    price: 1099,
    originalPrice: 1499,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600",
    slug: "navy-blue-slim-fit-shirt",
    isSale: true,
  },
  {
    id: "6",
    name: "Beige Relaxed Chinos",
    price: 1299,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600",
    slug: "beige-relaxed-chinos",
  },
  {
    id: "7",
    name: "Graphic Print Tee",
    price: 599,
    originalPrice: 799,
    image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=600",
    slug: "graphic-print-tee",
    isSale: true,
  },
  {
    id: "8",
    name: "Black Jogger Pants",
    price: 999,
    image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600",
    slug: "black-jogger-pants",
  },
];

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;

  const category = categoryData[categorySlug] || {
    title: categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1),
    description: "Browse our collection",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* Category Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{category.title}</h1>
        <p className="text-gray-500 text-sm mt-1">{category.description}</p>
      </div>

      {/* Sort Bar */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-100">
        <p className="text-sm text-gray-500">{allProducts.length} products</p>
        <select className="text-sm border border-zinc-200 rounded-full px-4 py-2 outline-none cursor-pointer">
          <option value="newest">Newest First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="best-selling">Best Selling</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {allProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}