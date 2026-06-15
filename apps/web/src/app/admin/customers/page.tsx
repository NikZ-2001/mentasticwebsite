"use client";

import { useState } from "react";

const customers = [
  {
    id: "1",
    name: "Nikson Andrew",
    email: "nikson@mentastic.com",
    phone: "+91 98765 43210",
    orders: 5,
    spent: 6240,
    joined: "Jan 2025",
    status: "Active",
  },
  {
    id: "2",
    name: "Arjun R.",
    email: "arjun@gmail.com",
    phone: "+91 87654 32109",
    orders: 3,
    spent: 3597,
    joined: "Feb 2025",
    status: "Active",
  },
  {
    id: "3",
    name: "Karthik M.",
    email: "karthik@gmail.com",
    phone: "+91 76543 21098",
    orders: 7,
    spent: 8743,
    joined: "Dec 2024",
    status: "Active",
  },
  {
    id: "4",
    name: "Rahul S.",
    email: "rahul@gmail.com",
    phone: "+91 65432 10987",
    orders: 1,
    spent: 799,
    joined: "Mar 2025",
    status: "Active",
  },
  {
    id: "5",
    name: "Vikram P.",
    email: "vikram@gmail.com",
    phone: "+91 54321 09876",
    orders: 2,
    spent: 1998,
    joined: "Apr 2025",
    status: "Inactive",
  },
];

export default function AdminCustomersPage() {
  const [search, setSearch] = useState("");

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalCustomers = customers.length;
  const totalRevenue = customers.reduce((acc, c) => acc + c.spent, 0);
  const avgOrderValue = Math.round(
    totalRevenue / customers.reduce((acc, c) => acc + c.orders, 0)
  );

  return (
    <div className="p-8 flex flex-col gap-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Customers</h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage your customer base
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border border-zinc-100 rounded-2xl p-5">
          <p className="text-sm text-gray-500">Total Customers</p>
          <p className="text-2xl font-bold mt-1">{totalCustomers}</p>
        </div>
        <div className="bg-white border border-zinc-100 rounded-2xl p-5">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="text-2xl font-bold mt-1">
            ₹{totalRevenue.toLocaleString()}
          </p>
        </div>
        <div className="bg-white border border-zinc-100 rounded-2xl p-5">
          <p className="text-sm text-gray-500">Avg. Order Value</p>
          <p className="text-2xl font-bold mt-1">₹{avgOrderValue}</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <i className="bi bi-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
        <input
          type="text"
          placeholder="Search customers..."
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
                Customer
              </th>
              <th className="text-left text-xs font-medium text-gray-500 px-6 py-4">
                Phone
              </th>
              <th className="text-left text-xs font-medium text-gray-500 px-6 py-4">
                Orders
              </th>
              <th className="text-left text-xs font-medium text-gray-500 px-6 py-4">
                Total Spent
              </th>
              <th className="text-left text-xs font-medium text-gray-500 px-6 py-4">
                Joined
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
            {filtered.map((customer) => (
              <tr
                key={customer.id}
                className="border-b border-zinc-50 last:border-0 hover:bg-zinc-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-zinc-950 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {customer.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{customer.name}</p>
                      <p className="text-xs text-gray-400">{customer.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-600">{customer.phone}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-medium">{customer.orders}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-semibold">
                    ₹{customer.spent.toLocaleString()}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-500">{customer.joined}</p>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      customer.status === "Active"
                        ? "bg-green-50 text-green-600"
                        : "bg-zinc-100 text-zinc-500"
                    }`}
                  >
                    {customer.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="w-8 h-8 rounded-lg border border-zinc-200 flex items-center justify-center hover:border-black transition-colors">
                    <i className="bi bi-eye text-xs"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}