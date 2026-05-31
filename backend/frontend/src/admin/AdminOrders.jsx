import { Search, Filter, CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';

const allOrders = [
    { id: 'ORD-1247', user: 'kwame@email.com', type: 'Data', network: 'MTN', amount: 14.50, status: 'successful', date: '2025-05-20 14:30' },
    { id: 'ORD-1246', user: 'adwoa@email.com', type: 'SMM', network: 'Instagram', amount: 8.00, status: 'processing', date: '2025-05-20 14:25' },
    { id: 'ORD-1245', user: 'kofi@email.com', type: 'Data', network: 'MTN', amount: 40.00, status: 'successful', date: '2025-05-20 14:18' },
    { id: 'ORD-1244', user: 'ama@email.com', type: 'Wallet', network: '-', amount: 50.00, status: 'successful', date: '2025-05-20 14:12' },
    { id: 'ORD-1243', user: 'yaw@email.com', type: 'SMM', network: 'YouTube', amount: 15.00, status: 'processing', date: '2025-05-20 14:05' },
    { id: 'ORD-1242', user: 'esi@email.com', type: 'Data', network: 'AirtelTigo', amount: 20.00, status: 'successful', date: '2025-05-20 13:55' },
    { id: 'ORD-1241', user: 'kwesi@email.com', type: 'Data', network: 'Telecel', amount: 35.00, status: 'failed', date: '2025-05-20 13:40' },
    { id: 'ORD-1240', user: 'abena@email.com', type: 'SMM', network: 'TikTok', amount: 10.00, status: 'successful', date: '2025-05-20 13:30' },
];

const statusIcon = { successful: CheckCircle, processing: Clock, failed: XCircle, partial: AlertCircle };
const statusColor = { successful: 'text-emerald-600 bg-emerald-50', processing: 'text-amber-600 bg-amber-50', failed: 'text-red-600 bg-red-50', partial: 'text-orange-600 bg-orange-50' };

export default function AdminOrders() {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');

    const filtered = allOrders.filter(o => {
        const matchSearch = !search || o.id.toLowerCase().includes(search.toLowerCase()) || o.user.toLowerCase().includes(search.toLowerCase());
        const matchFilter = filter === 'all' || o.status === filter;
        return matchSearch && matchFilter;
    });

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-navy-900">All Orders</h1>
                <p className="text-sm text-navy-500 mt-1">Manage and track all customer orders</p>
            </div>

            <div className="flex gap-3">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-300" />
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by order ID or user..." className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400" />
                </div>
                <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-navy-600 focus:outline-none focus:border-primary-400">
                    <option value="all">All Status</option>
                    <option value="successful">Successful</option>
                    <option value="processing">Processing</option>
                    <option value="failed">Failed</option>
                </select>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="text-left text-xs font-semibold text-navy-400 uppercase tracking-wider px-5 py-3">Order ID</th>
                                <th className="text-left text-xs font-semibold text-navy-400 uppercase tracking-wider px-5 py-3">User</th>
                                <th className="text-left text-xs font-semibold text-navy-400 uppercase tracking-wider px-5 py-3">Type</th>
                                <th className="text-left text-xs font-semibold text-navy-400 uppercase tracking-wider px-5 py-3">Network</th>
                                <th className="text-left text-xs font-semibold text-navy-400 uppercase tracking-wider px-5 py-3">Amount</th>
                                <th className="text-left text-xs font-semibold text-navy-400 uppercase tracking-wider px-5 py-3">Status</th>
                                <th className="text-left text-xs font-semibold text-navy-400 uppercase tracking-wider px-5 py-3">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filtered.map(order => {
                                const Icon = statusIcon[order.status];
                                const color = statusColor[order.status];
                                return (
                                    <tr key={order.id} className="hover:bg-gray-50">
                                        <td className="px-5 py-3 text-sm font-mono font-medium text-navy-900">{order.id}</td>
                                        <td className="px-5 py-3 text-sm text-navy-600">{order.user}</td>
                                        <td className="px-5 py-3"><span className="text-xs font-medium px-2 py-1 rounded-lg bg-gray-100 text-navy-600">{order.type}</span></td>
                                        <td className="px-5 py-3 text-sm text-navy-600">{order.network}</td>
                                        <td className="px-5 py-3 text-sm font-bold text-navy-900">₵{order.amount.toFixed(2)}</td>
                                        <td className="px-5 py-3"><span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg ${color}`}><Icon className="w-3 h-3" />{order.status}</span></td>
                                        <td className="px-5 py-3 text-xs text-navy-400">{order.date}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}