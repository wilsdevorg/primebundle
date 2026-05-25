import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { networkLogos } from '../data/mockData';
import { Search, Filter, ShoppingCart, Receipt, X } from 'lucide-react';

export default function Orders() {
    const { state } = useApp();
    const { orders } = state;
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedOrder, setSelectedOrder] = useState(null);

    const filtered = orders.filter(o => {
        const matchSearch = !search || o.id.toLowerCase().includes(search.toLowerCase()) || o.recipient.includes(search) || o.network.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === 'all' || o.status === statusFilter;
        return matchSearch && matchStatus;
    });

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-2xl font-bold text-navy-900">My Orders</h1>
                <p className="text-sm text-navy-500 mt-1">Track and manage your orders</p>
            </div>

            {/* Search & Filter */}
            <div className="flex gap-3">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-300" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search orders..."
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
                    />
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-navy-600 focus:outline-none focus:border-primary-400"
                >
                    <option value="all">All Status</option>
                    <option value="successful">Successful</option>
                    <option value="processing">Processing</option>
                    <option value="failed">Failed</option>
                </select>
            </div>

            {/* Orders List */}
            <div className="space-y-3">
                {filtered.length === 0 ? (
                    <div className="bg-white rounded-2xl p-10 text-center border border-gray-100">
                        <ShoppingCart className="w-12 h-12 text-navy-200 mx-auto mb-3" />
                        <h3 className="font-semibold text-navy-900 mb-1">No orders found</h3>
                        <p className="text-sm text-navy-400">Try adjusting your search or filter</p>
                    </div>
                ) : (
                    filtered.map((order) => (
                        <div key={order.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-lg">
                                        {networkLogos[order.network] || '📦'}
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-navy-900">{order.dataAmount}</div>
                                        <div className="text-xs text-navy-400">{order.network} • {order.recipient}</div>
                                    </div>
                                </div>
                                <div className="text-right flex items-center gap-3">
                                    <div>
                                        <div className="text-sm font-bold text-navy-900">₵{order.amount.toFixed(2)}</div>
                                        <span className={`text-xs font-medium ${order.status === 'successful' ? 'text-green-600' : order.status === 'processing' ? 'text-amber-600' : 'text-red-600'}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <button onClick={() => setSelectedOrder(order)} className="p-2 hover:bg-gray-50 rounded-lg" title="View Receipt">
                                        <Receipt className="w-4 h-4 text-navy-400" />
                                    </button>
                                </div>
                            </div>
                            <div className="text-xs text-navy-300 mt-2">{order.date}</div>
                        </div>
                    ))
                )}
            </div>

            {/* Order Detail Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedOrder(null)}>
                    <div className="bg-white rounded-2xl w-full max-w-sm p-6 animate-slide-up" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-navy-900">Order Receipt</h2>
                            <button onClick={() => setSelectedOrder(null)} className="p-1 hover:bg-gray-100 rounded-lg">
                                <X className="w-5 h-5 text-navy-400" />
                            </button>
                        </div>
                        <div className="space-y-3">
                            {[
                                ['Order ID', selectedOrder.id],
                                ['Type', selectedOrder.type],
                                ['Network', selectedOrder.network],
                                ['Recipient', selectedOrder.recipient],
                                ['Amount', `₵${selectedOrder.amount.toFixed(2)}`],
                                ['Data', selectedOrder.dataAmount],
                                ['Points Earned', selectedOrder.points > 0 ? `+${selectedOrder.points}` : '0'],
                                ['Status', selectedOrder.status],
                                ['Date', selectedOrder.date],
                            ].map(([label, value], i) => (
                                <div key={i} className="flex justify-between py-2 border-b border-gray-50 last:border-0">
                                    <span className="text-sm text-navy-400">{label}</span>
                                    <span className={`text-sm font-medium ${label === 'Status' ? (value === 'successful' ? 'text-green-600' : value === 'processing' ? 'text-amber-600' : 'text-red-600') : 'text-navy-900'}`}>
                                        {value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}