"use client";

import { useState } from "react";

const orders = [
  {
    id: "ORD-001",
    customer: "Nikson Andrew",
    email: "nikson@mentastic.com",
    items: 2,
    amount: 1398,
    status: "Delivered",
    payment: "Paid",
    date: "2 Jun 2025",
  },
  {
    id: "ORD-002",
    customer: "Arjun R.",
    email: "arjun@gmail.com",
    items: 1,
    amount: 1199,
    status: "Shipped",
    payment: "Paid",
    date: "1 Jun 2025",
  },
  {
    id: "ORD-003",
    customer: "Karthik M.",
    email: "karthik@gmail.com",
    items: 3,
    amount: 2397,
    status: "Confirmed",
    payment: "Paid",
    date: "31 May 2025",
  },
  {
    id: "ORD-004",
    customer: "Rahul S.",
    email: "rahul@gmail.com",
    items: 1,
    amount: 799,
    status: "Pending",
    payment: "Pending",
    date: "30 May 2025",
  },
  {
    id: "ORD-005",
    customer: "Vikram P.",
    email: "vikram@gmail.com",
    items: 2,
    amount: 1998,
    status: "Cancelled",
    payment: "Refunded",
    date: "29 May 2025",
  },
];

const statusStyles: Record<string, string> = {
  Delivered: "bg-green-50 text-green-600",
  Shipped: "bg-blue-50 text-blue-600",
  Confirmed: "bg-purple-50 text-purple-600",
  Pending: "bg-yellow-50 text-yellow-600",
  Cancelled: "bg-red-50 text-red-500",
};

const paymentStyles: Record<string, string> = {
  Paid: "text-green-600",
  Pending: "text-yellow-600",
  Refunded: "text-red-500",
};

export default function AdminOrdersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      statusFilter === "All" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-8 flex flex-col gap-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage and track all orders
          </p>
        </div>
        <button className="border border-zinc-200 px-5 py-2.5 rounded-full text-sm font-medium hover:border-black transition-colors flex items-center gap-2">
          <i className="bi bi-download"></i>
          Export
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4">
        {["All", "Pending", "Confirmed", "Shipped", "Delivered"].map(
          (status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`py-3 rounded-2xl text-sm font-medium border transition-all ${
                statusFilter === status
                  ? "bg-black text-white border-black"
                  : "bg-white border-zinc-100 hover:border-black"
              }`}
            >
              {status}
            </button>
          )
        )}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <i className="bi bi-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
        <input
          type="text"
          placeholder="Search orders..."
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
                Order
              </th>
              <th className="text-left text-xs font-medium text-gray-500 px-6 py-4">
                Customer
              </th>
              <th className="text-left text-xs font-medium text-gray-500 px-6 py-4">
                Items
              </th>
              <th className="text-left text-xs font-medium text-gray-500 px-6 py-4">
                Amount
              </th>
              <th className="text-left text-xs font-medium text-gray-500 px-6 py-4">
                Payment
              </th>
              <th className="text-left text-xs font-medium text-gray-500 px-6 py-4">
                Status
              </th>
              <th className="text-left text-xs font-medium text-gray-500 px-6 py-4">
                Date
              </th>
              <th className="text-left text-xs font-medium text-gray-500 px-6 py-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => (
              <tr
                key={order.id}
                className="border-b border-zinc-50 last:border-0 hover:bg-zinc-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <p className="text-sm font-semibold">{order.id}</p>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-medium">{order.customer}</p>
                    <p className="text-xs text-gray-400">{order.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-600">{order.items} items</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-semibold">₹{order.amount}</p>
                </td>
                <td className="px-6 py-4">
                  <p
                    className={`text-sm font-medium ${
                      paymentStyles[order.payment]
                    }`}
                  >
                    {order.payment}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      statusStyles[order.status]
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-500">{order.date}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="w-8 h-8 rounded-lg border border-zinc-200 flex items-center justify-center hover:border-black transition-colors">
                      <i className="bi bi-eye text-xs"></i>
                    </button>
                    <select className="text-xs border border-zinc-200 rounded-lg px-2 py-1.5 outline-none cursor-pointer hover:border-black transition-colors">
                      <option>Update</option>
                      <option>Confirmed</option>
                      <option>Packed</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                      <option>Cancelled</option>
                    </select>
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