import Link from "next/link";

const accountLinks = [
  { label: "Profile", href: "/account/profile", icon: "bi-person" },
  { label: "Orders", href: "/account/orders", icon: "bi-box" },
  { label: "Addresses", href: "/account/addresses", icon: "bi-geo-alt" },
  { label: "Wishlist", href: "/wishlist", icon: "bi-heart" },
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-4 flex flex-col gap-1">
            <div className="px-3 py-3 mb-2 border-b border-zinc-200">
              <p className="text-sm font-semibold">My Account</p>
            </div>
            {accountLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-white hover:text-black transition-all"
              >
                <i className={`bi ${link.icon} text-base`}></i>
                {link.label}
              </Link>
            ))}
            <div className="border-t border-zinc-200 mt-2 pt-2">
              <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-all w-full">
                <i className="bi bi-box-arrow-right text-base"></i>
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="md:col-span-3">
          {children}
        </div>
      </div>
    </div>
  );
}