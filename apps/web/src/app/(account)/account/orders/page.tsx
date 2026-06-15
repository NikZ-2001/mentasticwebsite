import Link from "next/link";

const orders = [
  {
    id: "ORD-001",
    date: "2 Jun 2025",
    status: "Delivered",
    total: 1398,
    items: [
      {
        name: "Classic Black Oversized Tee",
        size: "M",
        quantity: 1,
        price: 699,
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600",
      },
      {
        name: "Cargo Olive Pants",
        size: "L",
        quantity: 1,
        price: 699,
        image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600",
      },
    ],
  },
  {
    id: "ORD-002",
    date: "28 May 2025",
    status: "Shipped",
    total: 1199,
    items: [
      {
        name: "White Linen Shirt",
        size: "L",
        quantity: 1,
        price: 1199,
        image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600",
      },
    ],
  },
  {
    id: "ORD-003",
    date: "20 May 2025",
    status: "Cancelled",
    total: 799,
    items: [
      {
        name: "Striped Polo Tee",
        size: "S",
        quantity: 1,
        price: 799,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600",
      },
    ],
  },
];

const statusStyles: Record<string, string> = {
  Delivered: "bg-green-50 text-green-600",
  Shipped: "bg-blue-50 text-blue-600",
  Cancelled: "bg-red-50 text-red-500",
  Pending: "bg-yellow-50 text-yellow-600",
  Confirmed: "bg-purple-50 text-purple-600",
};

export default function OrdersPage() {
  return (
    <div className="flex flex-col gap-8">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Orders</h1>
        <p className="text-gray-500 text-sm mt-1">
          Track and manage your orders
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
          <i className="bi bi-box text-6xl text-zinc-200"></i>
          <p className="text-lg font-semibold">No orders yet</p>
          <p className="text-gray-500 text-sm">
            When you place an order it will appear here.
          </p>
          <Link
            href="/products"
            className="bg-black text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-zinc-800 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-zinc-50 border border-zinc-100 rounded-2xl p-5 flex flex-col gap-4"
            >
              {/* Order Header */}
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-4">
                  <p className="text-sm font-semibold">{order.id}</p>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${statusStyles[order.status]}`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{order.date}</span>
                  <span className="font-semibold text-black">
                    ₹{order.total}
                  </span>
                </div>
              </div>

              {/* Order Items */}
              <div className="flex flex-col gap-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-14 h-16 rounded-xl overflow-hidden bg-zinc-200 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-gray-400">
                        Size: {item.size} · Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-semibold flex-shrink-0">
                      ₹{item.price}
                    </p>
                  </div>
                ))}
              </div>

              {/* Order Footer */}
              <div className="flex items-center gap-3 pt-2 border-t border-zinc-200">
                <button className="flex-1 border border-zinc-200 py-2.5 rounded-full text-xs font-medium hover:border-black transition-colors">
                  View Details
                </button>
                {order.status === "Delivered" && (
                  <button className="flex-1 border border-zinc-200 py-2.5 rounded-full text-xs font-medium hover:border-black transition-colors">
                    Return Order
                  </button>
                )}
                {order.status === "Shipped" && (
                  <button className="flex-1 bg-black text-white py-2.5 rounded-full text-xs font-medium hover:bg-zinc-800 transition-colors">
                    Track Order
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}