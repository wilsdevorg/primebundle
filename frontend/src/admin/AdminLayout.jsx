import { NavLink, Outlet, Navigate, useNavigate } from "react-router-dom";
import { useAdmin } from "./AdminContext";
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Share2,
  CreditCard,
  Settings,
  LogOut,
  Zap,
  Menu,
  X,
  BarChart3,
  AlertTriangle,
} from "lucide-react";
import { useState, useEffect } from "react";
import { API_URL } from "../utils/api";

const adminNavItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/dashboard/orders", icon: ShoppingCart, label: "All Orders" },
  { to: "/dashboard/smm", icon: Share2, label: "SMM Services" },
  { to: "/dashboard/users", icon: Users, label: "Users" },
  { to: "/dashboard/transactions", icon: CreditCard, label: "Transactions" },
  { to: "/dashboard/analytics", icon: BarChart3, label: "Analytics" },
  { to: "/dashboard/settings", icon: Settings, label: "Settings" },
];

export default function AdminLayout() {
  const { isAuthenticated, admin, logout } = useAdmin();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/api/admin/settings/system`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMaintenanceMode(data.data.maintenanceMode);
        }
      })
      .catch(console.error);
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 w-64 bg-navy-900 z-50 transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 flex flex-col`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b border-navy-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-white text-sm">PrimeBundle</span>
              <span className="text-[10px] text-primary-400 block -mt-0.5">
                ADMIN PANEL
              </span>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 hover:bg-navy-700 rounded text-navy-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {adminNavItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary-500/20 text-primary-400"
                    : "text-navy-300 hover:bg-navy-800 hover:text-white"
                }`
              }
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* User & Logout */}
        <div className="p-3 border-t border-navy-700">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white text-xs font-bold">
              {admin?.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white truncate">
                {admin?.name}
              </div>
              <div className="text-xs text-navy-400">{admin?.role}</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-3 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-xl"
          >
            <Menu className="w-5 h-5 text-navy-600" />
          </button>
          <div className="hidden lg:block">
            <h2 className="text-sm font-medium text-navy-400">
              Welcome back, {admin?.name}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            {maintenanceMode ? (
              <span className="text-xs bg-red-100 text-red-700 px-3 py-1.5 rounded-full font-bold flex items-center gap-1.5 shadow-sm border border-red-200">
                <AlertTriangle className="w-3.5 h-3.5" /> MAINTENANCE MODE
                ACTIVE
              </span>
            ) : (
              <span className="text-xs bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full font-medium">
                ● System Live
              </span>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
