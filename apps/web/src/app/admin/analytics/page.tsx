"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const revenueData = [
  { month: "Jan", revenue: 12400, orders: 45 },
  { month: "Feb", revenue: 18600, orders: 62 },
  { month: "Mar", revenue: 15200, orders: 54 },
  { month: "Apr", revenue: 21800, orders: 78 },
  { month: "May", revenue: 19400, orders: 71 },
  { month: "Jun", revenue: 24500, orders: 89 },
];

const categoryData = [
  { category: "Oversized", sales: 145 },
  { category: "Tops", sales: 98 },
  { category: "Bottoms", sales: 76 },
  { category: "Shirts", sales: 54 },
  { category: "Co-ords", sales: 32 },
];

const stats = [
  {
    label: "Total Revenue",
    value: "₹1,11,900",
    change: "+18.2%",
    positive: true,
    icon: "bi-currency-rupee",
  },
  {
    label: "Total Orders",
    value: "399",
    change: "+12.5%",
    positive: true,
    icon: "bi-bag",
  },
  {
    label: "Avg Order Value",
    value: "₹1,245",
    change: "+5.3%",
    positive: true,
    icon: "bi-graph-up",
  },
  {
    label: "Return Rate",
    value: "2.4%",
    change: "-0.8%",
    positive: true,
    icon: "bi-arrow-return-left",
  },
];

export default function AdminAnalyticsPage() {
  return (
    <div className="p-8 flex flex-col gap-8">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
          <p className="text-gray-500 text-sm mt-1">
            Track your business performance
          </p>
        </div>
        <select className="px-4 py-2.5 rounded-xl border border-zinc-200 text-sm outline-none cursor-pointer">
          <option>Last 6 months</option>
          <option>Last 3 months</option>
          <option>Last month</option>
          <option>This year</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white border border-zinc-100 rounded-2xl p-5 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">{stat.label}</p>
              <div className="w-9 h-9 bg-zinc-50 rounded-xl flex items-center justify-center">
                <i className={`bi ${stat.icon} text-base`}></i>
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p
                className={`text-xs mt-1 ${
                  stat.positive ? "text-green-600" : "text-red-500"
                }`}
              >
                {stat.change} from last period
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="bg-white border border-zinc-100 rounded-2xl p-6">
        <h2 className="font-semibold mb-6">Revenue Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              formatter={(value) => [
  `₹${Number(value ?? 0).toLocaleString()}`,
  "Revenue",
]}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#000000"
              strokeWidth={2}
              dot={{ fill: "#000000", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Orders Chart */}
        <div className="bg-white border border-zinc-100 rounded-2xl p-6">
          <h2 className="font-semibold mb-6">Orders Per Month</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                formatter={(value) => [
  Number(value ?? 0),
  "Orders",
]}
              />
              <Bar
                dataKey="orders"
                fill="#000000"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Chart */}
        <div className="bg-white border border-zinc-100 rounded-2xl p-6">
          <h2 className="font-semibold mb-6">Sales by Category</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={categoryData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" />
              <XAxis
                type="number"
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                dataKey="category"
                type="category"
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                width={70}
              />
              <Tooltip
                formatter={(value) => [
  Number(value ?? 0),
  "Units Sold",
]}
              />
              <Bar
                dataKey="sales"
                fill="#18181b"
                radius={[0, 6, 6, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}