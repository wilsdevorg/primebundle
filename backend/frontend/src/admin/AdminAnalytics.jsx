import { BarChart3, TrendingUp, Users, ShoppingCart } from 'lucide-react';

const monthlyData = [
    { month: 'Jan', revenue: 1200, orders: 85 },
    { month: 'Feb', revenue: 1450, orders: 102 },
    { month: 'Mar', revenue: 1680, orders: 118 },
    { month: 'Apr', revenue: 1520, orders: 95 },
    { month: 'May', revenue: 2100, orders: 134 },
];

const platformBreakdown = [
    { name: 'MTN', percentage: 45, color: 'bg-amber-500' },
    { name: 'Instagram', percentage: 22, color: 'bg-pink-500' },
    { name: 'YouTube', percentage: 15, color: 'bg-red-500' },
    { name: 'TikTok', percentage: 10, color: 'bg-gray-800' },
    { name: 'Others', percentage: 8, color: 'bg-gray-400' },
];

const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));

export default function AdminAnalytics() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-navy-900">Analytics</h1>
                <p className="text-sm text-navy-500 mt-1">Store performance and insights</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Monthly Revenue', value: '₵2,100', change: '+38%', icon: TrendingUp, color: 'bg-emerald-500' },
                    { label: 'Monthly Orders', value: '134', change: '+41%', icon: ShoppingCart, color: 'bg-primary-500' },
                    { label: 'New Users', value: '28', change: '+15%', icon: Users, color: 'bg-violet-500' },
                    { label: 'Avg. Order Value', value: '₵15.67', change: '-2%', icon: BarChart3, color: 'bg-amber-500' },
                ].map(kpi => (
                    <div key={kpi.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                        <div className={`w-10 h-10 rounded-xl ${kpi.color} flex items-center justify-center mb-3`}>
                            <kpi.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-2xl font-bold text-navy-900">{kpi.value}</div>
                        <div className="flex items-center justify-between mt-1">
                            <span className="text-xs text-navy-400">{kpi.label}</span>
                            <span className={`text-xs font-semibold ${kpi.change.startsWith('+') ? 'text-emerald-600' : 'text-red-500'}`}>{kpi.change}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Revenue Chart (CSS bars) */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <h2 className="font-bold text-navy-900 mb-4">Monthly Revenue</h2>
                    <div className="flex items-end gap-3 h-48">
                        {monthlyData.map(d => (
                            <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                                <span className="text-xs font-bold text-navy-700">₵{(d.revenue / 1000).toFixed(1)}k</span>
                                <div className="w-full bg-gray-100 rounded-t-lg relative overflow-hidden" style={{ height: `${(d.revenue / maxRevenue) * 100}%` }}>
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary-600 to-primary-400 rounded-t-lg" />
                                </div>
                                <span className="text-xs text-navy-400">{d.month}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Platform Breakdown */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <h2 className="font-bold text-navy-900 mb-4">Platform Breakdown</h2>
                    <div className="space-y-4">
                        {platformBreakdown.map(p => (
                            <div key={p.name}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="font-medium text-navy-700">{p.name}</span>
                                    <span className="text-navy-400">{p.percentage}%</span>
                                </div>
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div className={`h-full rounded-full ${p.color}`} style={{ width: `${p.percentage}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}