import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Gift,
  Wifi,
  Share2,
  Users,
  ShoppingCart,
  CreditCard,
  TrendingUp,
  Store,
  Code,
  X,
  Zap,
} from "lucide-react";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/loyalty", icon: Gift, label: "Loyalty", badge: "New" },
  { to: "/data", icon: Wifi, label: "Buy Data" },
  { to: "/smm", icon: Share2, label: "SMM Services" },
  { to: "/affiliate", icon: Users, label: "Affiliates" },
  { to: "/orders", icon: ShoppingCart, label: "My Orders" },
  { to: "/wallet", icon: CreditCard, label: "Topup Wallet" },
  { to: "/smm-orders", icon: TrendingUp, label: "SMM Orders" },
  { to: "/transactions", icon: TrendingUp, label: "Transactions" },
  { to: "/reseller", icon: Store, label: "Reseller Store" },
  { to: "/reseller-api", icon: Code, label: "Reseller API" },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:z-auto`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-navy-900">PrimeBundle</span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1 hover:bg-gray-100 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100%-80px)]">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-primary-50 text-primary-700 shadow-sm"
                    : "text-navy-600 hover:bg-gray-50 hover:text-navy-900"
                }`
              }
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="px-2 py-0.5 text-xs font-bold bg-primary-500 text-white rounded-full">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
