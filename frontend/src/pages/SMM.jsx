import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { smmServices, smmCategories } from '../data/mockData';
import { Search, X, AlertCircle, CheckCircle, Zap, TrendingUp, Clock, Wallet, ChevronRight, Star } from 'lucide-react';

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
    YouTube: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-100', active: 'bg-red-600 text-white' },
    Instagram: { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-100', active: 'bg-pink-600 text-white' },
    TikTok: { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200', active: 'bg-gray-800 text-white' },
    Twitter: { bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-100', active: 'bg-sky-600 text-white' },
    Facebook: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-100', active: 'bg-blue-600 text-white' },
    Telegram: { bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-100', active: 'bg-cyan-600 text-white' },
    Spotify: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-100', active: 'bg-green-600 text-white' },
};

export default function SMM() {
    const { state, dispatch } = useApp();
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [showModal, setShowModal] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [quantity, setQuantity] = useState('');
    const [link, setLink] = useState('');
    const [orderResult, setOrderResult] = useState(null);
    const [sortBy, setSortBy] = useState('popular'); // popular, price-low, price-high

    const filtered = useMemo(() => {
        let result = smmServices.filter(s => {
            const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.category.toLowerCase().includes(search.toLowerCase());
            const matchCategory = category === 'All' || s.category === category;
            return matchSearch && matchCategory;
        });

        if (sortBy === 'price-low') result.sort((a, b) => a.pricePer1k - b.pricePer1k);
        else if (sortBy === 'price-high') result.sort((a, b) => b.pricePer1k - a.pricePer1k);

        return result;
    }, [search, category, sortBy]);

    const stats = useMemo(() => ({
        totalServices: smmServices.length,
        categories: smmCategories.length - 1, // exclude 'All'
        totalPlatforms: [...new Set(smmServices.map(s => s.category))].length,
    }), []);

    const handleBuyNow = (service) => {
        setSelectedService(service);
        setQuantity(String(service.minOrder));
        setLink('');
        setOrderResult(null);
        setShowModal(true);
    };

    const totalCost = selectedService && quantity
        ? (parseFloat(quantity) / 1000 * selectedService.pricePer1k).toFixed(2)
        : '0.00';

    const canAfford = state.user.walletBalance >= parseFloat(totalCost);

    const handleConfirm = () => {
        const qty = parseInt(quantity);
        if (!selectedService || qty < selectedService.minOrder || qty > selectedService.maxOrder) return;
        const cost = parseFloat(totalCost);

        if (state.user.walletBalance < cost) {
            setOrderResult({ success: false, message: 'Insufficient wallet balance. Please top up your wallet first.' });
            return;
        }

        dispatch({
            type: 'ADD_SMM_ORDER',
            payload: {
                service: selectedService.name,
                category: selectedService.category,
                quantity: qty,
                link,
                totalCost: cost,
                pricePer1k: selectedService.pricePer1k,
            },
        });
        setOrderResult({ success: true, message: `${qty.toLocaleString()} ${selectedService.name} ordered successfully!` });
    };

    const quickQtyPresets = selectedService
        ? [
            selectedService.minOrder,
            Math.round((selectedService.minOrder + selectedService.maxOrder) / 4),
            Math.round((selectedService.minOrder + selectedService.maxOrder) / 2),
            Math.round(selectedService.maxOrder * 0.75),
        ].filter((v, i, a) => a.indexOf(v) === i).slice(0, 4)
        : [];

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-navy-900 flex items-center gap-2">
                        <Zap className="w-6 h-6 text-primary-500" />
                        SMM Services
                    </h1>
                    <p className="text-sm text-navy-500 mt-1">Boost your social media presence across all platforms</p>
                </div>
                <div className="flex items-center gap-2">
                    <Link to="/smm-orders" className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-xl hover:bg-primary-100 transition-colors">
                        My Orders <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-3">
                <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-4 text-white">
                    <Zap className="w-5 h-5 opacity-80 mb-1" />
                    <div className="text-xl font-bold">{stats.totalServices}</div>
                    <div className="text-xs opacity-80">Services</div>
                </div>
                <div className="bg-gradient-to-br from-violet-500 to-violet-600 rounded-2xl p-4 text-white">
                    <TrendingUp className="w-5 h-5 opacity-80 mb-1" />
                    <div className="text-xl font-bold">{stats.totalPlatforms}</div>
                    <div className="text-xs opacity-80">Platforms</div>
                </div>
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-4 text-white">
                    <Wallet className="w-5 h-5 opacity-80 mb-1" />
                    <div className="text-xl font-bold">₵{state.user.walletBalance.toFixed(2)}</div>
                    <div className="text-xs opacity-80">Balance</div>
                </div>
            </div>

            {/* Search & Filters */}
            <div className="space-y-3">
                <div className="flex gap-3">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-300" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search services or platforms..."
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
                        />
                    </div>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-navy-600 focus:outline-none focus:border-primary-400"
                    >
                        <option value="popular">Popular</option>
                        <option value="price-low">Price: Low→High</option>
                        <option value="price-high">Price: High→Low</option>
                    </select>
                </div>

                {/* Category Pills */}
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                    {smmCategories.map(c => {
                        const isActive = category === c;
                        const colors = c !== 'All' ? platformColors[c] : null;
                        return (
                            <button
                                key={c}
                                onClick={() => setCategory(c)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${isActive
                                    ? (c === 'All' ? 'bg-navy-900 text-white' : colors.active)
                                    : 'bg-white text-navy-500 border border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                {c !== 'All' && <span>{platformIcons[c]}</span>}
                                {c}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-navy-400">
                    Showing <span className="font-medium text-navy-700">{filtered.length}</span> service{filtered.length !== 1 ? 's' : ''}
                </p>
            </div>

            {/* Service Grid */}
            {filtered.length === 0 ? (
                <div className="bg-white rounded-2xl p-10 text-center border border-gray-100">
                    <Search className="w-12 h-12 text-navy-200 mx-auto mb-3" />
                    <h3 className="font-semibold text-navy-900 mb-1">No services found</h3>
                    <p className="text-sm text-navy-400">Try a different search or category</p>
                </div>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map(service => {
                        const colors = platformColors[service.category] || {};
                        const icon = platformIcons[service.category] || '🌐';
                        return (
                            <div key={service.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all overflow-hidden group">
                                {/* Card Header */}
                                <div className={`px-5 pt-4 pb-3 ${colors.bg || 'bg-gray-50'}`}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg">{icon}</span>
                                            <span className={`text-xs font-semibold ${colors.text || 'text-navy-700'}`}>{service.category}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-navy-400">
                                            <Clock className="w-3 h-3" />
                                            {service.deliveryTime}
                                        </div>
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="p-5">
                                    <h3 className="font-semibold text-navy-900 text-sm mb-1">{service.name}</h3>
                                    <p className="text-xs text-navy-400 mb-4">{service.description}</p>

                                    <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                                        <div className="bg-gray-50 rounded-lg p-2 text-center">
                                            <div className="text-navy-400 text-[10px] uppercase tracking-wider">Min Order</div>
                                            <div className="font-semibold text-navy-700">{service.minOrder.toLocaleString()}</div>
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-2 text-center">
                                            <div className="text-navy-400 text-[10px] uppercase tracking-wider">Max Order</div>
                                            <div className="font-semibold text-navy-700">{service.maxOrder.toLocaleString()}</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                        <div>
                                            <div className="text-xl font-bold text-primary-600">₵{service.pricePer1k.toFixed(2)}</div>
                                            <div className="text-[10px] text-navy-400 uppercase tracking-wider">per 1,000</div>
                                        </div>
                                        <button
                                            onClick={() => handleBuyNow(service)}
                                            className="px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-sm hover:shadow-md group-hover:shadow-md"
                                        >
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Order Modal */}
            {showModal && selectedService && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
                    <div className="bg-white rounded-2xl w-full max-w-md animate-slide-up max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
                        {!orderResult ? (
                            <>
                                {/* Modal Header */}
                                <div className="p-5 border-b border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${platformColors[selectedService.category]?.bg || 'bg-gray-50'}`}>
                                                {platformIcons[selectedService.category] || '🌐'}
                                            </div>
                                            <div>
                                                <h2 className="text-base font-bold text-navy-900">{selectedService.name}</h2>
                                                <p className="text-xs text-navy-400">{selectedService.category} • {selectedService.deliveryTime}</p>
                                            </div>
                                        </div>
                                        <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                                            <X className="w-5 h-5 text-navy-400" />
                                        </button>
                                    </div>
                                </div>

                                {/* Modal Body */}
                                <div className="p-5 space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-navy-700 mb-1.5">
                                            Target Link <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            type="url"
                                            value={link}
                                            onChange={(e) => setLink(e.target.value)}
                                            placeholder={`https://${selectedService.category.toLowerCase()}.com/...`}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
                                        />
                                        <p className="text-[10px] text-navy-400 mt-1">Enter the URL of the profile, post, or video</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-navy-700 mb-1.5">
                                            Quantity
                                            <span className="text-navy-400 font-normal ml-1">
                                                ({selectedService.minOrder.toLocaleString()} — {selectedService.maxOrder.toLocaleString()})
                                            </span>
                                        </label>
                                        <input
                                            type="number"
                                            value={quantity}
                                            onChange={(e) => setQuantity(e.target.value)}
                                            min={selectedService.minOrder}
                                            max={selectedService.maxOrder}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
                                        />
                                        {/* Quick Quantity Presets */}
                                        <div className="flex gap-2 mt-2">
                                            {quickQtyPresets.map(preset => (
                                                <button
                                                    key={preset}
                                                    onClick={() => setQuantity(String(preset))}
                                                    className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${parseInt(quantity) === preset
                                                        ? 'bg-primary-100 text-primary-700 border border-primary-200'
                                                        : 'bg-gray-50 text-navy-500 border border-gray-200 hover:bg-gray-100'
                                                        }`}
                                                >
                                                    {preset >= 1000 ? `${(preset / 1000).toFixed(preset % 1000 === 0 ? 0 : 1)}K` : preset.toLocaleString()}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Price Summary */}
                                    <div className="bg-gray-50 rounded-xl p-4 space-y-2.5">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-navy-400">Price per 1K</span>
                                            <span className="font-medium text-navy-700">₵{selectedService.pricePer1k.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-navy-400">Quantity</span>
                                            <span className="font-medium text-navy-700">{parseInt(quantity || 0).toLocaleString()}</span>
                                        </div>
                                        <div className="border-t border-gray-200 pt-2.5 flex justify-between">
                                            <span className="text-sm font-medium text-navy-700">Total Cost</span>
                                            <span className="text-lg font-bold text-primary-600">₵{totalCost}</span>
                                        </div>
                                    </div>

                                    {/* Wallet Info */}
                                    <div className={`flex items-center justify-between p-3 rounded-xl text-sm ${canAfford ? 'bg-emerald-50 border border-emerald-100' : 'bg-red-50 border border-red-100'
                                        }`}>
                                        <div className="flex items-center gap-2">
                                            <Wallet className={`w-4 h-4 ${canAfford ? 'text-emerald-500' : 'text-red-500'}`} />
                                            <span className={canAfford ? 'text-emerald-700' : 'text-red-700'}>
                                                Wallet: ₵{state.user.walletBalance.toFixed(2)}
                                            </span>
                                        </div>
                                        {!canAfford && (
                                            <a href="/wallet" className="text-xs font-semibold text-red-600 hover:text-red-700 underline">
                                                Top Up
                                            </a>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-3 pt-1">
                                        <button
                                            onClick={() => setShowModal(false)}
                                            className="flex-1 py-3 text-sm font-medium text-navy-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleConfirm}
                                            disabled={!link || !quantity || parseInt(quantity) < selectedService.minOrder || parseInt(quantity) > selectedService.maxOrder}
                                            className="flex-1 py-3 text-sm font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl hover:from-primary-600 hover:to-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                                        >
                                            Confirm & Pay
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            /* Order Result */
                            <div className="p-8 text-center">
                                <div className={`w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center ${orderResult.success ? 'bg-emerald-50' : 'bg-red-50'
                                    }`}>
                                    {orderResult.success
                                        ? <CheckCircle className="w-10 h-10 text-emerald-500" />
                                        : <AlertCircle className="w-10 h-10 text-red-500" />
                                    }
                                </div>
                                <h3 className={`text-lg font-bold mb-2 ${orderResult.success ? 'text-emerald-600' : 'text-red-600'}`}>
                                    {orderResult.success ? '🎉 Order Placed!' : '❌ Order Failed'}
                                </h3>
                                <p className="text-sm text-navy-500 mb-2">{orderResult.message}</p>
                                {orderResult.success && (
                                    <p className="text-xs text-navy-400 mb-6">
                                        Track your order in <a href="/smm-orders" className="text-primary-600 font-medium hover:underline">SMM Orders</a>
                                    </p>
                                )}
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="w-full py-3 text-sm font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all"
                                >
                                    {orderResult.success ? 'Continue Browsing' : 'Try Again'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}