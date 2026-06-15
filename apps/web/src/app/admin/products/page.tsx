"use client";

import { useState } from "react";

const products = [
  {
    id: "1",
    name: "Classic Black Oversized Tee",
    category: "Oversized",
    price: 699,
    mrp: 999,
    stock: 45,
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=100",
  },
  {
    id: "2",
    name: "White Linen Shirt",
    category: "Tops",
    price: 1199,
    mrp: 1199,
    stock: 28,
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=100",
  },
  {
    id: "3",
    name: "Cargo Olive Pants",
    category: "Bottoms",
    price: 1499,
    mrp: 1999,
    stock: 4,
    status: "Low Stock",
    image:
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=100",
  },
  {
    id: "4",
    name: "Striped Polo Tee",
    category: "Tops",
    price: 799,
    mrp: 799,
    stock: 0,
    status: "Out of Stock",
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=100",
  },
];

const statusStyles: Record<string, string> = {
  Active: "bg-green-50 text-green-600",
  "Low Stock": "bg-yellow-50 text-yellow-600",
  "Out of Stock": "bg-red-50 text-red-500",
};

export default function AdminProductsPage() {
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 flex flex-col gap-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Products</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage your product catalog
          </p>
        </div>
        <button className="bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-zinc-800 transition-colors flex items-center gap-2">
          <i className="bi bi-plus-lg"></i>
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <i className="bi bi-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 text-sm outline-none focus:border-black transition-colors"
          />
        </div>
        <select className="px-4 py-2.5 rounded-xl border border-zinc-200 text-sm outline-none cursor-pointer">
          <option>All Categories</option>
          <option>Tops</option>
          <option>Bottoms</option>
          <option>Oversized</option>
        </select>
        <select className="px-4 py-2.5 rounded-xl border border-zinc-200 text-sm outline-none cursor-pointer">
          <option>All Status</option>
          <option>Active</option>
          <option>Low Stock</option>
          <option>Out of Stock</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border border-zinc-100 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-100">
              <th className="text-left text-xs font-medium text-gray-500 px-6 py-4">
                Product
              </th>
              <th className="text-left text-xs font-medium text-gray-500 px-6 py-4">
                Category
              </th>
              <th className="text-left text-xs font-medium text-gray-500 px-6 py-4">
                Price
              </th>
              <th className="text-left text-xs font-medium text-gray-500 px-6 py-4">
                Stock
              </th>
              <th className="text-left text-xs font-medium text-gray-500 px-6 py-4">
                Status
              </th>
              <th className="text-left text-xs font-medium text-gray-500 px-6 py-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((product) => (
              <tr
                key={product.id}
                className="border-b border-zinc-50 last:border-0 hover:bg-zinc-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl overflow-hidden bg-zinc-100 flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-sm font-medium">{product.name}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-600">{product.category}</p>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-semibold">₹{product.price}</p>
                    {product.mrp !== product.price && (
                      <p className="text-xs text-gray-400 line-through">
                        ₹{product.mrp}
                      </p>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p
                    className={`text-sm font-medium ${
                      product.stock === 0
                        ? "text-red-500"
                        : product.stock <= 5
                        ? "text-yellow-600"
                        : "text-gray-700"
                    }`}
                  >
                    {product.stock}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      statusStyles[product.status]
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="w-8 h-8 rounded-lg border border-zinc-200 flex items-center justify-center hover:border-black transition-colors">
                      <i className="bi bi-pencil text-xs"></i>
                    </button>
                    <button className="w-8 h-8 rounded-lg border border-zinc-200 flex items-center justify-center hover:border-red-500 hover:text-red-500 transition-colors">
                      <i className="bi bi-trash text-xs"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}