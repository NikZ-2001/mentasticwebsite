import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <h2 className="text-xl font-bold tracking-widest uppercase mb-4">MENTASTIC</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Premium fashion for men. Look fantastic every day.
          </p>
          <div className="flex items-center gap-4 mt-6 text-xl">
            <a href="#" aria-label="Instagram">
              <i className="bi bi-instagram hover:text-gray-400 transition-colors"></i>
            </a>
            <a href="#" aria-label="Facebook">
              <i className="bi bi-facebook hover:text-gray-400 transition-colors"></i>
            </a>
            <a href="#" aria-label="Twitter">
              <i className="bi bi-twitter-x hover:text-gray-400 transition-colors"></i>
            </a>
            <a href="#" aria-label="YouTube">
              <i className="bi bi-youtube hover:text-gray-400 transition-colors"></i>
            </a>
          </div>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-sm font-semibold tracking-widest uppercase mb-4">Shop</h3>
          <ul className="flex flex-col gap-3 text-sm text-gray-400">
            <li><Link href="/products?sort=newest" className="hover:text-white transition-colors">New Arrivals</Link></li>
            <li><Link href="/categories/tops" className="hover:text-white transition-colors">Tops</Link></li>
            <li><Link href="/categories/bottoms" className="hover:text-white transition-colors">Bottoms</Link></li>
            <li><Link href="/categories/oversized" className="hover:text-white transition-colors">Oversized</Link></li>
            <li><Link href="/products?sale=true" className="hover:text-white transition-colors">Sale</Link></li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h3 className="text-sm font-semibold tracking-widest uppercase mb-4">Help</h3>
          <ul className="flex flex-col gap-3 text-sm text-gray-400">
            <li><Link href="/track-order" className="hover:text-white transition-colors">Track Order</Link></li>
            <li><Link href="/returns" className="hover:text-white transition-colors">Returns</Link></li>
            <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            <li><Link href="/size-guide" className="hover:text-white transition-colors">Size Guide</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-sm font-semibold tracking-widest uppercase mb-4">Company</h3>
          <ul className="flex flex-col gap-3 text-sm text-gray-400">
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            <li><Link href="/shipping-policy" className="hover:text-white transition-colors">Shipping Policy</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© 2025 MENTASTIC. All rights reserved.</p>
          <p>Made with ❤ in Chennai, India</p>
        </div>
      </div>
    </footer>
  );
}