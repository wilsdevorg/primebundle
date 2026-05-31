import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Wallet, Gift, ShoppingCart, CheckCircle, Plus, Award, Wifi, Star, ChevronRight, Calendar } from 'lucide-react';
import { dataBundles, networkLogos } from '../data/mockData';

export default function Dashboard() {
    const { state, dispatch } = useApp();
    const { user, dailyRewards, orders } = state;

    const nextReward = dailyRewards.find(r => !r.claimed);
    const recentOrders = orders.slice(0, 5);

    const handleClaimReward = () => {
        if (nextReward) {
            const idx = dailyRewards.indexOf(nextReward);
            dispatch({ type: 'CLAIM_DAILY_REWARD', payload: idx });
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Welcome Card */}
            <div className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-2xl p-6 text-white shadow-lg shadow-primary-500/20">
                <div className="flex items-start justify-between">
                    <div>
                        <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold mb-3">MEMBERSHIP STATUS</span>
                        <h1 className="text-xl sm:text-2xl font-bold mb-1">Welcome back, {user.name}</h1>
                        <p className="text-primary-100 text-sm">User ID: {user.userId}</p>
                    </div>
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-lg font-bold">
                        {user.avatar}
                    </div>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                            <Wallet className="w-5 h-5 text-green-600" />
                        </div>
                        <Link to="/wallet" className="px-3 py-1 bg-navy-900 text-white text-xs font-medium rounded-full hover:bg-navy-800 transition-colors">
                            Top Up
                        </Link>
                    </div>
                    <div className="text-2xl font-bold text-navy-900">₵{user.walletBalance.toFixed(2)}</div>
                    <div className="text-xs text-navy-400 mt-1">Wallet Balance</div>
                </div>

                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
                            <Gift className="w-5 h-5 text-amber-600" />
                        </div>
                        <Link to="/loyalty" className="px-3 py-1 bg-primary-500 text-white text-xs font-medium rounded-full hover:bg-primary-600 transition-colors">
                            Redeem
                        </Link>
                    </div>
                    <div className="text-2xl font-bold text-navy-900">{user.loyaltyPoints}</div>
                    <div className="text-xs text-navy-400 mt-1">Loyalty Points</div>
                </div>

                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                            <ShoppingCart className="w-5 h-5 text-blue-600" />
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-navy-900">{user.totalOrders}</div>
                    <div className="text-xs text-navy-400 mt-1">Total Orders</div>
                </div>

                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-emerald-600" />
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-navy-900">{user.successfulOrders}</div>
                    <div className="text-xs text-navy-400 mt-1">Successful</div>
                </div>
            </div>

            {/* Weekly Reward Progress */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-navy-900 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary-500" />
                        Weekly Reward Progress
                    </h3>
                </div>
                <div className="flex items-center justify-between gap-2">
                    {dailyRewards.map((reward) => (
                        <div key={reward.day} className="flex flex-col items-center gap-1">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${reward.claimed
                                ? 'bg-primary-500 text-white'
                                : 'bg-gray-100 text-navy-400'
                                }`}>
                                {reward.claimed ? '✓' : `D${reward.day}`}
                            </div>
                            <span className="text-[10px] text-navy-400">+{reward.points}</span>
                        </div>
                    ))}
                </div>
                {nextReward && (
                    <button
                        onClick={handleClaimReward}
                        className="mt-4 w-full py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-semibold rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-sm"
                    >
                        Claim Day {nextReward.day} Reward (+{nextReward.points} pts)
                    </button>
                )}
            </div>

            {/* Data & Bonus Banner */}
            <div className="bg-gradient-to-r from-navy-900 to-navy-800 rounded-2xl p-5 text-white">
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Award className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                        <h3 className="font-semibold mb-1">Earn loyalty points on data & bonuses!</h3>
                        <p className="text-sm text-navy-300">Every purchase adds points to your balance for free data and airtime.</p>
                    </div>
                </div>
            </div>

            {/* Quick Data Purchase */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-navy-900">Quick Data Purchase</h3>
                    <Link to="/data" className="text-sm text-primary-600 font-medium flex items-center gap-1 hover:text-primary-700">
                        View All <ChevronRight className="w-3 h-3" />
                    </Link>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {Object.entries(dataBundles).map(([network, bundles]) => (
                        <Link
                            key={network}
                            to="/data"
                            className="p-4 bg-gray-50 rounded-xl hover:bg-primary-50 hover:border-primary-100 border border-gray-100 transition-all"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-lg">{networkLogos[network]}</span>
                                <span className="text-sm font-semibold text-navy-900">{network}</span>
                            </div>
                            <div className="text-xs text-navy-400">{bundles.length} bundles available</div>
                            <div className="text-sm font-bold text-primary-600 mt-1">from ₵{bundles[0].price.toFixed(2)}</div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-navy-900">Recent Orders</h3>
                    <Link to="/orders" className="text-sm text-primary-600 font-medium flex items-center gap-1 hover:text-primary-700">
                        View All <ChevronRight className="w-3 h-3" />
                    </Link>
                </div>
                <div className="space-y-3">
                    {recentOrders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                            <div className="flex items-center gap-3">
                                <span className="text-lg">{networkLogos[order.network]}</span>
                                <div>
                                    <div className="text-sm font-medium text-navy-900">{order.dataAmount}</div>
                                    <div className="text-xs text-navy-400">{order.network} • {order.recipient}</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm font-semibold text-navy-900">₵{order.amount.toFixed(2)}</div>
                                <span className={`text-xs font-medium ${order.status === 'successful' ? 'text-green-600' :
                                    order.status === 'processing' ? 'text-amber-600' : 'text-red-600'
                                    }`}>
                                    {order.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}