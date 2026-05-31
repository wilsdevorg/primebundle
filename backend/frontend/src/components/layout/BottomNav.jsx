import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Wifi, Share2, ShoppingCart, CreditCard } from 'lucide-react';

const bottomItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/data', icon: Wifi, label: 'Buy Data' },
    { to: '/smm', icon: Share2, label: 'SMM' },
    { to: '/orders', icon: ShoppingCart, label: 'Orders' },
    { to: '/wallet', icon: CreditCard, label: 'Top up' },
];

export default function BottomNav() {
    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-30 lg:hidden">
            <div className="flex items-center justify-around py-2">
                {bottomItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            `flex flex-col items-center gap-1 px-3 py-1 rounded-lg transition-colors ${isActive
                                ? 'text-primary-600'
                                : 'text-navy-400 hover:text-navy-600'
                            }`
                        }
                    >
                        <item.icon className="w-5 h-5" />
                        <span className="text-[10px] font-medium">{item.label}</span>
                    </NavLink>
                ))}
            </div>
        </nav>
    );
}