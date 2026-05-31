import { useState } from "react";
import { useApp } from "../context/AppContext";
import { dataBundles, networkLogos } from "../data/mockData";
import {
  Store,
  Link2,
  TrendingUp,
  Copy,
  CheckCircle,
  ExternalLink,
} from "lucide-react";

export default function Reseller() {
  const { state } = useApp();
  const { user } = state;
  const [activeNetwork, setActiveNetwork] = useState("MTN");
  const [copiedId, setCopiedId] = useState(null);

  const resellerUrl = (network, bundleId) =>
    `https://primebundle.com/r/${user.referralCode}/data/${network}/${bundleId}`;
  const bundles = dataBundles[activeNetwork] || [];
  const networks = Object.keys(dataBundles);

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Reseller Store</h1>
        <p className="text-sm text-navy-500 mt-1">
          Sell data bundles with your own markup
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center mb-3">
            <Store className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-navy-900">Active</div>
          <div className="text-xs text-navy-400 mt-1">Store Status</div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center mb-3">
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-navy-900">
            ₵{user.totalEarned.toFixed(2)}
          </div>
          <div className="text-xs text-navy-400 mt-1">Total Revenue</div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 col-span-2 lg:col-span-1">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-3">
            <Link2 className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-navy-900">
            {user.totalReferrals}
          </div>
          <div className="text-xs text-navy-400 mt-1">Total Sales</div>
        </div>
      </div>

      {/* Shareable Store Link */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-700 rounded-2xl p-6 text-white shadow-lg">
        <h3 className="font-semibold mb-2">Your Reseller Storefront</h3>
        <p className="text-sm text-purple-100 mb-4">
          Share this link with customers to start selling
        </p>
        <div className="flex gap-2">
          <input
            readOnly
            value={`https://primebundle.com/store/${user.referralCode}`}
            className="flex-1 px-4 py-2.5 bg-white/20 border border-white/30 rounded-xl text-sm text-white placeholder-white/50"
          />
          <button
            onClick={() =>
              handleCopy(
                "store",
                `https://primebundle.com/store/${user.referralCode}`,
              )
            }
            className="px-4 py-2.5 bg-white text-purple-700 text-sm font-medium rounded-xl hover:bg-purple-50 transition-colors flex items-center gap-2"
          >
            {copiedId === "store" ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            {copiedId === "store" ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      {/* Network Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {networks.map((network) => (
          <button
            key={network}
            onClick={() => setActiveNetwork(network)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              activeNetwork === network
                ? "bg-primary-500 text-white shadow-md"
                : "bg-white text-navy-600 border border-gray-200 hover:border-primary-200"
            }`}
          >
            <span>{networkLogos[network]}</span>
            {network}
          </button>
        ))}
      </div>

      {/* Bundle Links */}
      <div className="space-y-3">
        {bundles.map((bundle) => {
          const url = resellerUrl(activeNetwork, bundle.id);
          return (
            <div
              key={bundle.id}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{networkLogos[activeNetwork]}</span>
                  <div>
                    <span className="font-semibold text-navy-900">
                      {bundle.data}
                    </span>
                    <span className="text-xs text-navy-400 ml-2">
                      {bundle.validity}
                    </span>
                  </div>
                </div>
                <span className="text-lg font-bold text-primary-600">
                  ₵{bundle.price.toFixed(2)}
                </span>
              </div>
              <div className="flex gap-2">
                <input
                  readOnly
                  value={url}
                  className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-navy-500 truncate"
                />
                <button
                  onClick={() => handleCopy(bundle.id, url)}
                  className="px-3 py-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors"
                >
                  {copiedId === bundle.id ? (
                    <CheckCircle className="w-3.5 h-3.5" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
