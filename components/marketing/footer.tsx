import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">FundAid for Health</h3>
            <p className="text-sm">
              AI-powered grant writing for healthcare innovators. Save $10,000+ and 100+ hours.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/pricing" className="hover:text-white hover:underline transition-all">Pricing</Link></li>
              <li><Link href="/features/profiler" className="hover:text-white hover:underline transition-all">Company Profiler</Link></li>
              <li><Link href="/features/discovery" className="hover:text-white hover:underline transition-all">Grant Discovery</Link></li>
              <li><Link href="/features/analysis" className="hover:text-white hover:underline transition-all">Grant Analysis</Link></li>
              <li><Link href="/features/generation" className="hover:text-white hover:underline transition-all">Document Generation</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white hover:underline transition-all">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white hover:underline transition-all">Contact</Link></li>
              <li><Link href="/careers" className="hover:text-white hover:underline transition-all">Careers</Link></li>
              <li><Link href="/blog" className="hover:text-white hover:underline transition-all">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="hover:text-white hover:underline transition-all">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white hover:underline transition-all">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} FundAid for Health. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
