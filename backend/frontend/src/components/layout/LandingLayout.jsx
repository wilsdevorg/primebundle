import { Link, Outlet } from "react-router-dom";
import { Zap, Menu, X } from "lucide-react";
import { useState } from "react";

export default function LandingLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-50">
      {/* Header */}
      <header className="glass sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-navy-900">
                PrimeBundle
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <a
                href="#services"
                className="text-sm font-medium text-navy-600 hover:text-navy-900 transition-colors"
              >
                Services
              </a>
              <a
                href="#pricing"
                className="text-sm font-medium text-navy-600 hover:text-navy-900 transition-colors"
              >
                Pricing
              </a>
              <a
                href="#faq"
                className="text-sm font-medium text-navy-600 hover:text-navy-900 transition-colors"
              >
                FAQs
              </a>
              <a
                href="#support"
                className="text-sm font-medium text-navy-600 hover:text-navy-900 transition-colors"
              >
                Support
              </a>
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/dashboard"
                className="px-4 py-2 text-sm font-medium text-navy-700 hover:text-navy-900 transition-colors"
              >
                Open Dashboard
              </Link>
              <Link
                to="/data"
                className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl hover:from-primary-600 hover:to-primary-700 shadow-lg shadow-primary-500/25 transition-all duration-200"
              >
                Explore Services
              </Link>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-xl"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white">
            <div className="px-4 py-3 space-y-2">
              <a
                href="#services"
                className="block px-3 py-2 text-sm font-medium text-navy-600 rounded-lg hover:bg-gray-50"
              >
                Services
              </a>
              <a
                href="#pricing"
                className="block px-3 py-2 text-sm font-medium text-navy-600 rounded-lg hover:bg-gray-50"
              >
                Pricing
              </a>
              <a
                href="#faq"
                className="block px-3 py-2 text-sm font-medium text-navy-600 rounded-lg hover:bg-gray-50"
              >
                FAQs
              </a>
              <a
                href="#support"
                className="block px-3 py-2 text-sm font-medium text-navy-600 rounded-lg hover:bg-gray-50"
              >
                Support
              </a>
              <div className="pt-2 border-t border-gray-100 space-y-2">
                <Link
                  to="/dashboard"
                  className="block w-full text-center px-4 py-2.5 text-sm font-medium text-navy-700 bg-gray-50 rounded-xl"
                >
                  Open Dashboard
                </Link>
                <Link
                  to="/data"
                  className="block w-full text-center px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl"
                >
                  Explore Services
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <Outlet />

      {/* Footer */}
      <footer className="bg-navy-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg">PrimeBundle</span>
              </div>
              <p className="text-navy-300 text-sm">
                Your ultimate hub for affordable digital services in Ghana.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Services</h4>
              <ul className="space-y-2 text-sm text-navy-300">
                <li>
                  <Link
                    to="/data"
                    className="hover:text-white transition-colors"
                  >
                    Data Bundles
                  </Link>
                </li>
                <li>
                  <Link
                    to="/smm"
                    className="hover:text-white transition-colors"
                  >
                    SMM Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="/wallet"
                    className="hover:text-white transition-colors"
                  >
                    Wallet Top-Up
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-navy-300">
                <li>
                  <a
                    href="#about"
                    className="hover:text-white transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-navy-300">
                <li>
                  <a
                    href="#terms"
                    className="hover:text-white transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#privacy"
                    className="hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-navy-700 text-center text-sm text-navy-400">
            <p>&copy; 2025 PrimeBundle. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
