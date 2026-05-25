import { TrendingUp, Users, ShoppingCart, DollarSign, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const stats = [
    { label: 'Total Revenue', value: '₵2,450.80', change: '+12.5%', up: true, icon: DollarSign, color: 'bg-emerald-500' },
    { label: 'Total Orders', value: '1,247', change: '+8.2%', up: true, icon: ShoppingCart, color: 'bg-primary-500' },
    { label: 'Active Users', value: '389', change: '+23.1%', up: true, icon: Users, color: 'bg-violet-500' },
    { label: 'SMM Orders', value: '342', change: '-2.4%', up: false, icon: Activity, color: 'bg-amber-500' },
];

const recentOrders = [
    { id: 'ORD-1247', user: 'kwame@email.com', type: 'Data', amount: 14.50, status: 'successful', time: '2 min ago' },
    { id: 'ORD-1246', user: 'adwoa@email.com', type: 'SMM', amount: 8.00, status: 'processing', time: '5 min ago' },
    { id: 'ORD-1245', user: 'kofi@email.com', type: 'Data', amount: 40.00, status: 'successful', time: '12 min ago' },
    { id: 'ORD-1244', user: 'ama@email.com', type: 'Wallet', amount: 50.00, status: 'successful', time: '18 min ago' },
    { id: 'ORD-1243', user: 'yaw@email.com', type: 'SMM', amount: 15.00, status: 'processing', time: '25 min ago' },
];

const topServices = [
    { name: 'MTN Data 2GB', orders: 245, revenue: 2425.50 },
    { name: 'Instagram Followers', orders: 189, revenue: 1512.00 },
    { name: 'MTN Data 5GB', orders: 156, revenue: 3432.00 },
    { name: 'TikTok Views', orders: 134, revenue: 201.00 },
    { name: 'YouTube Subscribers', orders: 98, revenue: 1470.00 },
];

export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-navy-900">Dashboard</h1>
                <p className="text-sm text-navy-500 mt-1">Overview of your store performance</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                            <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}>
                                <stat.icon className="w-5 h-5 text-white" />
                            </div>
                            <span className={`flex items-center gap-0.5 text-xs font-semibold ${stat.up ? 'text-emerald-600' : 'text-red-500'}`}>
                                {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                {stat.change}
                            </span>
                        </div>
                        <div className="text-2xl font-bold text-navy-900">{stat.value}</div>
                        <div className="text-xs text-navy-400 mt-1">{stat.label}</div>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <div className="p-5 border-b border-gray-100">
                        <h2 className="font-bold text-navy-900">Recent Orders</h2>
                    </div>
                    <div className="divide-y divide-gray-50">
                        {recentOrders.map(order => (
                            <div key={order.id} className="px-5 py-3 flex items-center justify-between hover:bg-gray-50">
                                <div>
                                    <div className="text-sm font-medium text-navy-900">{order.id}</div>
                                    <div className="text-xs text-navy-400">{order.user} • {order.time}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-bold text-navy-900">₵{order.amount.toFixed(2)}</div>
                                    <span className={`text-[10px] font-semibold ${order.status === 'successful' ? 'text-emerald-600' : 'text-amber-600'}`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Services */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <div className="p-5 border-b border-gray-100">
                        <h2 className="font-bold text-navy-900">Top Services</h2>
                    </div>
                    <div className="divide-y divide-gray-50">
                        {topServices.map((service, i) => (
                            <div key={service.name} className="px-5 py-3 flex items-center justify-between hover:bg-gray-50">
                                <div className="flex items-center gap-3">
                                    <span className="w-6 h-6 rounded-full bg-primary-50 text-primary-600 text-xs font-bold flex items-center justify-center">
                                        {i + 1}
                                    </span>
                                    <div>
                                        <div className="text-sm font-medium text-navy-900">{service.name}</div>
                                        <div className="text-xs text-navy-400">{service.orders} orders</div>
                                    </div>
                                </div>
                                <div className="text-sm font-bold text-navy-900">₵{service.revenue.toFixed(2)}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}