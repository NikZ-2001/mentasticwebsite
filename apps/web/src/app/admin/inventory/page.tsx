"use client";

import { useState } from "react";

const inventory = [
  {
    id: "1",
    sku: "BLK-OVR-S",
    product: "Classic Black Oversized Tee",
    size: "S",
    price: 699,
    stock: 10,
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=100",
  },
  {
    id: "2",
    sku: "BLK-OVR-M",
    product: "Classic Black Oversized Tee",
    size: "M",
    price: 699,
    stock: 15,
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=100",
  },
  {
    id: "3",
    sku: "BLK-OVR-L",
    product: "Classic Black Oversized Tee",
    size: "L",
    price: 699,
    stock: 2,
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=100",
  },
  {
    id: "4",
    sku: "BLK-OVR-XL",
    product: "Classic Black Oversized Tee",
    size: "XL",
    price: 699,
    stock: 0,
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=100",
  },
  {
    id: "5",
    sku: "WHT-LIN-S",
    product: "White Linen Shirt",
    size: "S",
    price: 1199,
    stock: 8,
    image:
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=100",
  },
  {
    id: "6",
    sku: "WHT-LIN-M",
    product: "White Linen Shirt",
    size: "M",
    price: 1199,
    stock: 10,
    image:
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=100",
  },
  {
    id: "7",
    sku: "OLV-CGO-M",
    product: "Cargo Olive Pants",
    size: "M",
    price: 1499,
    stock: 3,
    image:
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=100",
  },
  {
    id: "8",
    sku: "OLV-CGO-L",
    product: "Cargo Olive Pants",
    size: "L",
    price: 1499,
    stock: 0,
    image:
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=100",
  },
];

function getStockStatus(stock: number) {
  if (stock === 0) return { label: "Out of Stock", style: "bg-red-50 text-red-500" };
  if (stock <= 3) return { label: "Critical", style: "bg-red-50 text-red-500" };
  if (stock <= 8) return { label: "Low Stock", style: "bg-yellow-50 text-yellow-600" };
  return { label: "In Stock", style: "bg-green-50 text-green-600" };
}

export default function AdminInventoryPage() {
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editStock, setEditStock] = useState<number>(0);
  const [items, setItems] = useState(inventory);

  const filtered = items.filter(
    (i) =>
      i.product.toLowerCase().includes(search.toLowerCase()) ||
      i.sku.toLowerCase().includes(search.toLowerCase())
  );

  function handleEdit(id: string, stock: number) {
    setEditId(id);
    setEditStock(stock);
  }

  function handleSave(id: string) {
    setItems(
      items.map((i) => (i.id === id ? { ...i, stock: editStock } : i))
    );
    setEditId(null);
  }

  const totalItems = items.reduce((acc, i) => acc + i.stock, 0);
  const outOfStock = items.filter((i) => i.stock === 0).length;
  const lowStock = items.filter((i) => i.stock > 0 && i.stock <= 5).length;

  return (
    <div className="p-8 flex flex-col gap-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Inventory</h1>
        <p className="text-gray-500 text-sm mt-1">
          Track and manage stock levels
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border border-zinc-100 rounded-2xl p-5">
          <p className="text-sm text-gray-500">Total Units</p>
          <p className="text-2xl font-bold mt-1">{totalItems}</p>
        </div>
        <div className="bg-white border border-zinc-100 rounded-2xl p-5">
          <p className="text-sm text-gray-500">Low Stock</p>
          <p className="text-2xl font-bold mt-1 text-yellow-600">{lowStock}</p>
        </div>
        <div className="bg-white border border-zinc-100 rounded-2xl p-5">
          <p className="text-sm text-gray-500">Out of Stock</p>
          <p className="text-2xl font-bold mt-1 text-red-500">{outOfStock}</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <i className="bi bi-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
        <input
          type="text"
          placeholder="Search by product or SKU..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 text-sm outline-none focus:border-black transition-colors"
        />
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
                SKU
              </th>
              <th className="text-left text-xs font-medium text-gray-500 px-6 py-4">
                Size
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
            {filtered.map((item) => {
              const status = getStockStatus(item.stock);
              return (
                <tr
                  key={item.id}
                  className="border-b border-zinc-50 last:border-0 hover:bg-zinc-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-zinc-100 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.product}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-sm font-medium">{item.product}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-mono text-gray-600">
                      {item.sku}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm bg-zinc-100 px-2 py-1 rounded-lg font-medium">
                      {item.size}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold">₹{item.price}</p>
                  </td>
                  <td className="px-6 py-4">
                    {editId === item.id ? (
                      <input
                        type="number"
                        value={editStock}
                        onChange={(e) => setEditStock(Number(e.target.value))}
                        className="w-20 px-3 py-1.5 rounded-lg border border-black text-sm outline-none"
                        min={0}
                        autoFocus
                      />
                    ) : (
                      <p
                        className={`text-sm font-medium ${
                          item.stock === 0
                            ? "text-red-500"
                            : item.stock <= 5
                            ? "text-yellow-600"
                            : "text-gray-700"
                        }`}
                      >
                        {item.stock}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${status.style}`}
                    >
                      {status.label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {editId === item.id ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleSave(item.id)}
                          className="text-xs bg-black text-white px-3 py-1.5 rounded-lg hover:bg-zinc-800 transition-colors"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditId(null)}
                          className="text-xs border border-zinc-200 px-3 py-1.5 rounded-lg hover:border-black transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEdit(item.id, item.stock)}
                        className="w-8 h-8 rounded-lg border border-zinc-200 flex items-center justify-center hover:border-black transition-colors"
                      >
                        <i className="bi bi-pencil text-xs"></i>
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}