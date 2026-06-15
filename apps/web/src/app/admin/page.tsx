const stats = [
  {
    label: "Total Revenue",
    value: "₹1,24,500",
    change: "+12.5%",
    positive: true,
    icon: "bi-currency-rupee",
  },
  {
    label: "Total Orders",
    value: "342",
    change: "+8.2%",
    positive: true,
    icon: "bi-bag",
  },
  {
    label: "Total Customers",
    value: "189",
    change: "+5.1%",
    positive: true,
    icon: "bi-people",
  },
  {
    label: "Low Stock Items",
    value: "12",
    change: "-3",
    positive: false,
    icon: "bi-exclamation-triangle",
  },
];

const recentOrders = [
  {
    id: "ORD-001",
    customer: "Nikson Andrew",
    amount: 1398,
    status: "Delivered",
    date: "2 Jun 2025",
  },
  {
    id: "ORD-002",
    customer: "Arjun R.",
    amount: 1199,
    status: "Shipped",
    date: "1 Jun 2025",
  },
  {
    id: "ORD-003",
    customer: "Karthik M.",
    amount: 799,
    status: "Confirmed",
    date: "31 May 2025",
  },
  {
    id: "ORD-004",
    customer: "Rahul S.",
    amount: 2499,
    status: "Pending",
    date: "30 May 2025",
  },
  {
    id: "ORD-005",
    customer: "Vikram P.",
    amount: 999,
    status: "Cancelled",
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

const topProducts = [
  { name: "Classic Black Oversized Tee", sold: 48, revenue: 33552 },
  { name: "White Linen Shirt", sold: 32, revenue: 38368 },
  { name: "Cargo Olive Pants", sold: 27, revenue: 40473 },
  { name: "Striped Polo Tee", sold: 21, revenue: 16779 },
];

export default function AdminDashboard() {
  return (
    <div className="p-8 flex flex-col gap-8">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">
          Welcome back. Here's what's happening today.
        </p>
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
                {stat.change} from last month
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white border border-zinc-100 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold">Recent Orders</h2>
            <button className="text-sm text-gray-500 hover:text-black transition-colors">
              View all →
            </button>
          </div>
          <div className="flex flex-col gap-1">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between py-3 border-b border-zinc-50 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-xs font-bold">
                    {order.customer[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{order.customer}</p>
                    <p className="text-xs text-gray-400">
                      {order.id} · {order.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      statusStyles[order.status]
                    }`}
                  >
                    {order.status}
                  </span>
                  <p className="text-sm font-semibold">₹{order.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white border border-zinc-100 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold">Top Products</h2>
          </div>
          <div className="flex flex-col gap-4">
            {topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center gap-3">
                <span className="text-sm font-bold text-zinc-300 w-4">
                  {index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{product.name}</p>
                  <p className="text-xs text-gray-400">{product.sold} sold</p>
                </div>
                <p className="text-sm font-semibold flex-shrink-0">
                  ₹{product.revenue.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}