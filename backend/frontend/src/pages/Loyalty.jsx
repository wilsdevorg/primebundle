import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Gift, Star, Calendar, Trophy, ArrowRight } from 'lucide-react';

const tierThresholds = [
    { tier: 'Bronze', min: 0, color: 'bg-orange-100 text-orange-700' },
    { tier: 'Silver', min: 200, color: 'bg-gray-100 text-gray-700' },
    { tier: 'Gold', min: 500, color: 'bg-amber-100 text-amber-700' },
    { tier: 'Platinum', min: 1000, color: 'bg-blue-100 text-blue-700' },
];

export default function Loyalty() {
    const { state, dispatch } = useApp();
    const { user, loyaltyHistory, dailyRewards } = state;
    const [redeemPoints, setRedeemPoints] = useState('');

    const ghsValue = redeemPoints ? (parseFloat(redeemPoints) * 0.01).toFixed(2) : '0.00';
    const nextReward = dailyRewards.find(r => !r.claimed);

    const handleRedeem = () => {
        const pts = parseInt(redeemPoints);
        if (pts > 0 && pts <= user.loyaltyPoints) {
            dispatch({ type: 'REDEEM_POINTS', payload: pts });
            setRedeemPoints('');
        }
    };

    const handleClaimReward = () => {
        if (nextReward) {
            const idx = dailyRewards.indexOf(nextReward);
            dispatch({ type: 'CLAIM_DAILY_REWARD', payload: idx });
        }
    };

    const currentTier = tierThresholds.filter(t => user.loyaltyPoints >= t.min).pop();
    const nextTier = tierThresholds.find(t => t.min > user.loyaltyPoints);

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-2xl font-bold text-navy-900">Loyalty Points System</h1>
                <p className="text-sm text-navy-500 mt-1">Earn and redeem points for rewards</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Points Card */}
                <div className="bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl p-6 text-white shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                            <Trophy className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-sm text-amber-100">Your Points</div>
                            <div className="text-3xl font-bold">{user.loyaltyPoints}</div>
                        </div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4">
                        <label className="text-sm text-amber-100 block mb-2">Points to redeem</label>
                        <input
                            type="number"
                            value={redeemPoints}
                            onChange={(e) => setRedeemPoints(e.target.value)}
                            placeholder="Enter points"
                            max={user.loyaltyPoints}
                            className="w-full px-4 py-2.5 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 text-sm focus:outline-none focus:bg-white/30 transition-all"
                        />
                        <p className="text-sm text-amber-100 mt-2">
                            You will receive: <strong className="text-white">₵{ghsValue}</strong>
                        </p>
                        <button
                            onClick={handleRedeem}
                            disabled={!redeemPoints || parseInt(redeemPoints) <= 0 || parseInt(redeemPoints) > user.loyaltyPoints}
                            className="w-full mt-3 py-2.5 bg-white text-amber-700 text-sm font-semibold rounded-xl hover:bg-amber-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Redeem Points
                        </button>
                    </div>
                </div>

                {/* Daily Rewards */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-navy-900 flex items-center gap-2 mb-4">
                        <Calendar className="w-4 h-4 text-primary-500" />
                        Daily Rewards
                    </h3>
                    <div className="space-y-2">
                        {dailyRewards.map((reward) => (
                            <div key={reward.day} className="flex items-center justify-between py-2 px-3 rounded-lg bg-gray-50">
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${reward.claimed ? 'bg-primary-500 text-white' : 'bg-gray-200 text-navy-400'}`}>
                                        {reward.claimed ? '✓' : `D${reward.day}`}
                                    </div>
                                    <span className="text-sm font-medium text-navy-700">Day {reward.day}</span>
                                </div>
                                <span className="text-sm font-semibold text-amber-600">+{reward.points} pts</span>
                            </div>
                        ))}
                    </div>
                    {nextReward && (
                        <button
                            onClick={handleClaimReward}
                            className="w-full mt-4 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-semibold rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all"
                        >
                            Claim Day {nextReward.day} Reward
                        </button>
                    )}
                </div>
            </div>

            {/* Tier Progress */}
            {nextTier && (
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-navy-900 mb-3">Tier Progress</h3>
                    <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${currentTier?.color}`}>
                            {currentTier?.tier}
                        </span>
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full transition-all duration-500"
                                style={{ width: `${Math.min(((user.loyaltyPoints - (currentTier?.min || 0)) / (nextTier.min - (currentTier?.min || 0))) * 100, 100)}%` }}
                            />
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${nextTier.color}`}>
                            {nextTier.tier}
                        </span>
                    </div>
                    <p className="text-xs text-navy-400 mt-2">{nextTier.min - user.loyaltyPoints} points to {nextTier.tier}</p>
                </div>
            )}

            {/* Points History */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-navy-900 mb-4">Points History</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="text-left py-2 text-navy-400 font-medium">Type</th>
                                <th className="text-left py-2 text-navy-400 font-medium">Points</th>
                                <th className="text-left py-2 text-navy-400 font-medium">Description</th>
                                <th className="text-left py-2 text-navy-400 font-medium">Date & Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loyaltyHistory.map((entry, i) => (
                                <tr key={i} className="border-b border-gray-50 last:border-0">
                                    <td className="py-2.5">
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${entry.type === 'earn' ? 'bg-green-50 text-green-700' :
                                            entry.type === 'redeem' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'
                                            }`}>
                                            {entry.type}
                                        </span>
                                    </td>
                                    <td className={`py-2.5 font-semibold ${entry.points > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {entry.points > 0 ? '+' : ''}{entry.points}
                                    </td>
                                    <td className="py-2.5 text-navy-600">{entry.description}</td>
                                    <td className="py-2.5 text-navy-400">{entry.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}