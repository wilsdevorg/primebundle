import { useApp } from "../context/AppContext";
import { affiliateCommissions } from "../data/mockData";
import {
  Users,
  Copy,
  DollarSign,
  UserPlus,
  TrendingUp,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";

export default function Affiliate() {
  const { state } = useApp();
  const { user } = state;
  const [copied, setCopied] = useState(false);

  const referralLink = `https://primebundle.com/ref/${user.referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Affiliate Program</h1>
        <p className="text-sm text-navy-500 mt-1">
          Earn commissions by referring others
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center mb-3">
            <DollarSign className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-navy-900">
            ₵{user.affiliateBalance.toFixed(2)}
          </div>
          <div className="text-xs text-navy-400 mt-1">Affiliate Balance</div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-3">
            <Copy className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-sm font-bold text-navy-900 truncate">
            {user.referralCode}
          </div>
          <div className="text-xs text-navy-400 mt-1">Referral Code</div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center mb-3">
            <UserPlus className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-navy-900">
            {user.totalReferrals}
          </div>
          <div className="text-xs text-navy-400 mt-1">Total Referrals</div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center mb-3">
            <TrendingUp className="w-5 h-5 text-amber-600" />
          </div>
          <div className="text-2xl font-bold text-navy-900">
            ₵{user.totalEarned.toFixed(2)}
          </div>
          <div className="text-xs text-navy-400 mt-1">Total Earned</div>
        </div>
      </div>

      {/* Share Link */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-navy-900 mb-3">Your Referral Link</h3>
        <div className="flex gap-2">
          <input
            readOnly
            value={referralLink}
            className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-navy-600"
          />
          <button
            onClick={handleCopy}
            className="px-4 py-2.5 bg-primary-500 text-white text-sm font-medium rounded-xl hover:bg-primary-600 transition-colors flex items-center gap-2"
          >
            {copied ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      {/* How It Works */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          {
            step: 1,
            title: "Share Link",
            desc: "Share your unique referral link with friends and family",
            icon: "🔗",
          },
          {
            step: 2,
            title: "Friend Joins",
            desc: "When someone signs up using your link",
            icon: "👋",
          },
          {
            step: 3,
            title: "Earn Commission",
            desc: "Get paid for every purchase they make",
            icon: "💰",
          },
        ].map((s) => (
          <div
            key={s.step}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center"
          >
            <div className="text-3xl mb-3">{s.icon}</div>
            <div className="text-xs font-bold text-primary-500 mb-1">
              STEP {s.step}
            </div>
            <h4 className="font-semibold text-navy-900 mb-1">{s.title}</h4>
            <p className="text-xs text-navy-400">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* Commissions Log */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-navy-900 mb-4">Commissions Log</h3>
        {affiliateCommissions.length === 0 ? (
          <p className="text-sm text-navy-400 text-center py-6">
            No commissions yet. Start sharing your link!
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 text-navy-400 font-medium">
                    User ID
                  </th>
                  <th className="text-left py-2 text-navy-400 font-medium">
                    Level
                  </th>
                  <th className="text-left py-2 text-navy-400 font-medium">
                    Amount
                  </th>
                  <th className="text-left py-2 text-navy-400 font-medium">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {affiliateCommissions.map((c, i) => (
                  <tr key={i} className="border-b border-gray-50 last:border-0">
                    <td className="py-2.5 text-navy-600">{c.userId}</td>
                    <td className="py-2.5 text-navy-600">Level {c.level}</td>
                    <td className="py-2.5 font-semibold text-green-600">
                      +₵{c.amount.toFixed(2)}
                    </td>
                    <td className="py-2.5 text-navy-400">{c.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
