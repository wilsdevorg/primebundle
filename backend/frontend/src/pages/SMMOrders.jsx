import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
    Share2, ChevronRight, Search, Filter, Package, Clock, CheckCircle,
    XCircle, AlertCircle, ExternalLink, Copy, Eye, X, Zap, DollarSign, BarChart3
} from 'lucide-react';

const platformIcons = {
    YouTube: '🎬',
    Instagram: '📸',
    TikTok: '🎵',
    Twitter: '🐦',
    Facebook: '👥',
    Telegram: '✈️',
    Spotify: '🎧',
};

const platformColors = {
    YouTube: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-100', accent: 'bg-red-500' },
    Instagram: { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-100', accent: 'bg-pink-500' },
    TikTok: { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200', accent: 'bg-gray-800' },
    Twitter: { bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-100', accent: 'bg-sky-500' },
    Facebook: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-100', accent: 'bg-blue-500' },
    Telegram: { bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-100', accent: 'bg-cyan-500' },
    Spotify: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-100', accent: 'bg-green-500' },
};

const statusConfig = {
    processing: {
        icon: Clock,
        label: 'Processing',
        bg: 'bg-amber-50',
        text: 'text-amber-700',
        border: 'border-amber-200',
        dot: 'bg-amber-500',
        progress: 33,
    },
    in_progress: {
        icon: AlertCircle,
        label: 'In Progress',
        bg: 'bg-blue-50',
        text: 'text-blue-700',
        border: 'border-blue-200',
        dot: 'bg-blue-500',
        progress: 66,
    },
    completed: {
        icon: CheckCircle,
        label: 'Completed',
        bg: 'bg-emerald-50',
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        dot: 'bg-emerald-500',
        progress: 100,
    },
    partial: {
        icon: AlertCircle,
        label: 'Partial',
        bg: 'bg-orange-50',
        text: 'text-orange-700',
        border: 'border-orange-200',
        dot: 'bg-orange-500',
        progress: 75,
    },
    cancelled: {
        icon: XCircle,
        label: 'Cancelled',
        bg: 'bg-red-50',
        text: 'text-red-700',
        border: 'border-red-200',
        dot: 'bg-red-500',
        progress: 0,
    },
    successful: {
        icon: CheckCircle,
        label: 'Successful',
        bg: 'bg-emerald-50',
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        dot: 'bg-emerald-500',
        progress: 100,
    },
};

export default function SMMOrders() {
    const { state } = useApp();
    const { smmOrders } = state;

    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [copied, setCopied] = useState(false);

    const filtered = useMemo(() => {
        let result = [...smmOrders];

        if (search) {
            const q = search.toLowerCase();
            result = result.filter(o =>
                o.service?.toLowerCase().includes(q) ||
                o.category?.toLowerCase().includes(q) ||
                o.id?.toLowerCase().includes(q) ||
                o.link?.toLowerCase().includes(q)
            );
        }

        if (statusFilter !== 'all') {
            result = result.filter(o => o.status === statusFilter);
        }

        return result;
    }, [smmOrders, search, statusFilter]);

    const stats = useMemo(() => ({
        total: smmOrders.length,
        totalSpent: smmOrders.reduce((sum, o) => sum + (o.totalCost || 0), 0),
        active: smmOrders.filter(o => o.status === 'processing' || o.status === 'in_progress').length,
        completed: smmOrders.filter(o => o.status === 'completed' || o.status === 'successful').length,
    }), [smmOrders]);

    const handleCopy = (text) => {
        navigator.clipboard?.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-navy-900 flex items-center gap-2">
                        <Package className="w-6 h-6 text-primary-500" />
                        SMM Orders
                    </h1>
                    <p className="text-sm text-navy-500 mt-1">Track and manage your social media marketing orders</p>
                </div>
                <Link
                    to="/smm"
                    className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-sm"
                >
                    <Zap className="w-4 h-4" />
                    New Order
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                            <Package className="w-4 h-4 text-primary-500" />
                        </div>
                    </div>
                    <div className="text-xl font-bold text-navy-900">{stats.total}</div>
                    <div className="text-xs text-navy-400">Total Orders</div>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                            <Clock className="w-4 h-4 text-amber-500" />
                        </div>
                    </div>
                    <div className="text-xl font-bold text-navy-900">{stats.active}</div>
                    <div className="text-xs text-navy-400">Active</div>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-emerald-500" />
                        </div>
                    </div>
                    <div className="text-xl font-bold text-navy-900">{stats.completed}</div>
                    <div className="text-xs text-navy-400">Completed</div>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center">
                            <DollarSign className="w-4 h-4 text-violet-500" />
                        </div>
                    </div>
                    <div className="text-xl font-bold text-navy-900">₵{stats.totalSpent.toFixed(2)}</div>
                    <div className="text-xs text-navy-400">Total Spent</div>
                </div>
            </div>

            {/* Search & Filter */}
            {smmOrders.length > 0 && (
                <div className="flex gap-3">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-300" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by service, ID, or link..."
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-navy-600 focus:outline-none focus:border-primary-400"
                    >
                        <option value="all">All Status</option>
                        <option value="processing">Processing</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="successful">Successful</option>
                        <option value="partial">Partial</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            )}

            {/* Orders List */}
            {smmOrders.length === 0 ? (
                /* Empty State */
                <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
                    <div className="w-20 h-20 rounded-full bg-primary-50 mx-auto mb-5 flex items-center justify-center">
                        <Share2 className="w-10 h-10 text-primary-300" />
                    </div>
                    <h3 className="text-lg font-bold text-navy-900 mb-2">No SMM orders yet</h3>
                    <p className="text-sm text-navy-400 mb-6 max-w-sm mx-auto">
                        Boost your social media presence! Browse our services for YouTube, Instagram, TikTok, and more.
                    </p>
                    <Link
                        to="/smm"
                        className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-sm"
                    >
                        <Zap className="w-4 h-4" />
                        Browse SMM Services
                    </Link>
                </div>
            ) : filtered.length === 0 ? (
                /* No Results */
                <div className="bg-white rounded-2xl p-10 text-center border border-gray-100">
                    <Search className="w-12 h-12 text-navy-200 mx-auto mb-3" />
                    <h3 className="font-semibold text-navy-900 mb-1">No orders match your search</h3>
                    <p className="text-sm text-navy-400">Try adjusting your search or filter</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {filtered.map(order => {
                        const pColors = platformColors[order.category] || {};
                        const icon = platformIcons[order.category] || '🌐';
                        const sConfig = statusConfig[order.status] || statusConfig.processing;
                        const StatusIcon = sConfig.icon;

                        return (
                            <div
                                key={order.id}
                                className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all overflow-hidden cursor-pointer"
                                onClick={() => setSelectedOrder(order)}
                            >
                                <div className="p-4">
                                    <div className="flex items-start gap-3">
                                        {/* Platform Icon */}
                                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${pColors.bg || 'bg-gray-50'}`}>
                                            {icon}
                                        </div>

                                        {/* Order Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2">
                                                <h3 className="font-semibold text-navy-900 text-sm truncate">{order.service}</h3>
                                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${sConfig.bg} ${sConfig.text} ${sConfig.border} border flex-shrink-0`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${sConfig.dot}`} />
                                                    {sConfig.label}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-2 mt-1">
                                                <span className={`text-xs font-medium ${pColors.text || 'text-navy-500'}`}>{order.category}</span>
                                                <span className="text-navy-200">•</span>
                                                <span className="text-xs text-navy-400">{order.quantity?.toLocaleString()} units</span>
                                            </div>

                                            {/* Link */}
                                            {order.link && (
                                                <div className="flex items-center gap-1 mt-1.5">
                                                    <ExternalLink className="w-3 h-3 text-navy-300 flex-shrink-0" />
                                                    <span className="text-xs text-navy-300 truncate max-w-[250px]">{order.link}</span>
                                                </div>
                                            )}

                                            {/* Bottom Row */}
                                            <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-gray-50">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-xs text-navy-300">
                                                        <span className="text-navy-400 font-medium">{order.id}</span>
                                                    </span>
                                                    <span className="text-xs text-navy-300">{order.date}</span>
                                                </div>
                                                <div className="text-sm font-bold text-primary-600">₵{(order.totalCost || 0).toFixed(2)}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    {order.status !== 'cancelled' && (
                                        <div className="mt-3 mx-14">
                                            <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-500 ${sConfig.dot}`}
                                                    style={{ width: `${sConfig.progress}%` }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Order Detail Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedOrder(null)}>
                    <div className="bg-white rounded-2xl w-full max-w-md animate-slide-up max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
                        {/* Modal Header */}
                        <div className="p-5 border-b border-gray-100">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${platformColors[selectedOrder.category]?.bg || 'bg-gray-50'}`}>
                                        {platformIcons[selectedOrder.category] || '🌐'}
                                    </div>
                                    <div>
                                        <h2 className="text-base font-bold text-navy-900">{selectedOrder.service}</h2>
                                        <p className="text-xs text-navy-400">{selectedOrder.category}</p>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                                    <X className="w-5 h-5 text-navy-400" />
                                </button>
                            </div>
                        </div>

                        {/* Status Badge */}
                        <div className="px-5 pt-4">
                            {(() => {
                                const sc = statusConfig[selectedOrder.status] || statusConfig.processing;
                                const ScIcon = sc.icon;
                                return (
                                    <div className={`flex items-center gap-3 p-3 rounded-xl ${sc.bg} border ${sc.border}`}>
                                        <ScIcon className={`w-5 h-5 ${sc.text}`} />
                                        <div>
                                            <div className={`text-sm font-semibold ${sc.text}`}>{sc.label}</div>
                                            <div className="text-xs text-navy-400">
                                                {selectedOrder.status === 'processing' ? 'Your order is being processed' :
                                                    selectedOrder.status === 'in_progress' ? 'Delivery is in progress' :
                                                        selectedOrder.status === 'completed' || selectedOrder.status === 'successful' ? 'Delivery completed successfully' :
                                                            selectedOrder.status === 'partial' ? 'Partially delivered' :
                                                                'Order was cancelled'}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })()}
                        </div>

                        {/* Progress Bar */}
                        {selectedOrder.status !== 'cancelled' && (
                            <div className="px-5 pt-4">
                                <div className="flex items-center justify-between text-xs text-navy-400 mb-1.5">
                                    <span>Progress</span>
                                    <span>{(statusConfig[selectedOrder.status] || statusConfig.processing).progress}%</span>
                                </div>
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-500 ${(statusConfig[selectedOrder.status] || statusConfig.processing).dot}`}
                                        style={{ width: `${(statusConfig[selectedOrder.status] || statusConfig.processing).progress}%` }}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Order Details */}
                        <div className="p-5 space-y-3">
                            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-navy-400">Order ID</span>
                                    <div className="flex items-center gap-1.5">
                                        <span className="font-mono font-medium text-navy-700">{selectedOrder.id}</span>
                                        <button
                                            onClick={() => handleCopy(selectedOrder.id)}
                                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                                        >
                                            <Copy className="w-3.5 h-3.5 text-navy-400" />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-navy-400">Service</span>
                                    <span className="font-medium text-navy-700">{selectedOrder.service}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-navy-400">Category</span>
                                    <span className="font-medium text-navy-700">{selectedOrder.category}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-navy-400">Quantity</span>
                                    <span className="font-medium text-navy-700">{selectedOrder.quantity?.toLocaleString()}</span>
                                </div>
                                {selectedOrder.pricePer1k && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-navy-400">Price per 1K</span>
                                        <span className="font-medium text-navy-700">₵{selectedOrder.pricePer1k.toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="border-t border-gray-200 pt-3 flex justify-between">
                                    <span className="text-sm font-medium text-navy-700">Total Cost</span>
                                    <span className="text-lg font-bold text-primary-600">₵{(selectedOrder.totalCost || 0).toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Target Link */}
                            {selectedOrder.link && (
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <div className="text-xs text-navy-400 mb-1.5">Target Link</div>
                                    <div className="flex items-center gap-2">
                                        <ExternalLink className="w-4 h-4 text-navy-300 flex-shrink-0" />
                                        <span className="text-sm text-primary-600 truncate flex-1">{selectedOrder.link}</span>
                                        <button
                                            onClick={() => handleCopy(selectedOrder.link)}
                                            className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors flex-shrink-0"
                                        >
                                            <Copy className="w-3.5 h-3.5 text-navy-400" />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Order Date */}
                            <div className="bg-gray-50 rounded-xl p-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-navy-400">Order Date</span>
                                    <span className="font-medium text-navy-700">{selectedOrder.date}</span>
                                </div>
                            </div>

                            {/* Copy Notification */}
                            {copied && (
                                <div className="text-center text-xs text-emerald-600 font-medium animate-fade-in">
                                    ✓ Copied to clipboard
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="p-5 pt-0">
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="w-full py-3 text-sm font-semibold text-navy-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}