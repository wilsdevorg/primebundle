import { useState } from "react";
import { useApp } from "../context/AppContext";
import { Code, Key, Copy, CheckCircle, Eye, EyeOff } from "lucide-react";

export default function ResellerAPI() {
  const { state } = useApp();
  const { user } = state;
  const [showApiKey, setShowApiKey] = useState(false);
  const [copied, setCopied] = useState("");
  const [activeEndpoint, setActiveEndpoint] = useState(null);

  const apiKey = `pk_live_${user.referralCode}_${btoa(user.userId).slice(0, 12)}`;

  const handleCopy = (key, text) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(key);
    setTimeout(() => setCopied(""), 2000);
  };

  const endpoints = [
    {
      method: "GET",
      path: "/api/v1/services",
      description: "List all available services and pricing",
      response: JSON.stringify(
        { services: [{ id: 1, name: "MTN 1GB", price: 5.0, network: "MTN" }] },
        null,
        2,
      ),
    },
    {
      method: "POST",
      path: "/api/v1/order",
      description: "Place a new data or SMM order",
      body: JSON.stringify(
        { service_id: 1, recipient: "024XXXXXXX", network: "MTN" },
        null,
        2,
      ),
      response: JSON.stringify(
        { order_id: "ORD-12345", status: "processing", amount: 5.0 },
        null,
        2,
      ),
    },
    {
      method: "GET",
      path: "/api/v1/balance",
      description: "Check your wallet balance",
      response: JSON.stringify(
        { balance: user.walletBalance, currency: "GHS" },
        null,
        2,
      ),
    },
    {
      method: "GET",
      path: "/api/v1/orders",
      description: "List your recent orders",
      response: JSON.stringify(
        { orders: [{ id: "ORD-12345", status: "successful", amount: 5.0 }] },
        null,
        2,
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Reseller API</h1>
        <p className="text-sm text-navy-500 mt-1">
          Integrate PrimeBundle services into your app
        </p>
      </div>

      {/* API Key */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-navy-900 flex items-center gap-2 mb-3">
          <Key className="w-4 h-4 text-primary-500" />
          Your API Key
        </h3>
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              readOnly
              type={showApiKey ? "text" : "password"}
              value={apiKey}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono text-navy-600"
            />
            <button
              onClick={() => setShowApiKey(!showApiKey)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400 hover:text-navy-600"
            >
              {showApiKey ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          <button
            onClick={() => handleCopy("apikey", apiKey)}
            className="px-4 py-2.5 bg-primary-500 text-white text-sm font-medium rounded-xl hover:bg-primary-600 transition-colors flex items-center gap-2"
          >
            {copied === "apikey" ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
        <p className="text-xs text-red-500 mt-2">
          Keep this key secret. Do not share it publicly.
        </p>
      </div>

      {/* Base URL */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-navy-900 flex items-center gap-2 mb-3">
          <Code className="w-4 h-4 text-primary-500" />
          Base URL
        </h3>
        <div className="flex gap-2">
          <input
            readOnly
            value="https://api.primebundle.com"
            className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono text-navy-600"
          />
          <button
            onClick={() => handleCopy("baseurl", "https://api.primebundle.com")}
            className="px-4 py-2.5 bg-gray-100 text-navy-600 text-sm font-medium rounded-xl hover:bg-gray-200 transition-colors"
          >
            {copied === "baseurl" ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* API Access Header */}
      <div className="bg-navy-900 rounded-2xl p-5 text-white">
        <h3 className="font-semibold mb-2 text-sm">API Access Header</h3>
        <p className="text-xs text-navy-300 mb-3">
          Include this header in all API requests
        </p>
        <pre className="bg-navy-800 rounded-xl p-4 text-sm font-mono text-green-400 overflow-x-auto">
          {`Authorization: Bearer ${apiKey}\nContent-Type: application/json`}
        </pre>
      </div>

      {/* Endpoints */}
      <div className="space-y-4">
        <h3 className="font-semibold text-navy-900">API Endpoints</h3>
        {endpoints.map((ep, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <button
              onClick={() => setActiveEndpoint(activeEndpoint === i ? null : i)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold ${ep.method === "GET" ? "bg-green-50 text-green-700" : "bg-blue-50 text-blue-700"}`}
                >
                  {ep.method}
                </span>
                <span className="text-sm font-mono font-medium text-navy-900">
                  {ep.path}
                </span>
              </div>
            </button>
            {activeEndpoint === i && (
              <div className="px-4 pb-4 space-y-3 border-t border-gray-100 pt-3">
                <p className="text-sm text-navy-500">{ep.description}</p>
                {ep.body && (
                  <div>
                    <p className="text-xs font-semibold text-navy-700 mb-1">
                      Request Body:
                    </p>
                    <pre className="bg-gray-50 rounded-xl p-3 text-xs font-mono text-navy-600 overflow-x-auto">
                      {ep.body}
                    </pre>
                  </div>
                )}
                <div>
                  <p className="text-xs font-semibold text-navy-700 mb-1">
                    Response:
                  </p>
                  <pre className="bg-gray-50 rounded-xl p-3 text-xs font-mono text-navy-600 overflow-x-auto">
                    {ep.response}
                  </pre>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
