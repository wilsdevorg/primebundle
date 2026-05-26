import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { usePaystackPayment } from "react-paystack";
import {
  CreditCard,
  CheckCircle,
  AlertCircle,
  Info,
  Loader2,
} from "lucide-react";

export default function Wallet() {
  const { state, dispatch } = useApp();
  const { user } = state;
  const [amount, setAmount] = useState("");
  const [topUpResult, setTopUpResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [publicKey, setPublicKey] = useState("");

  useEffect(() => {
    // Fetch Paystack public key from backend
    fetch(`${import.meta.env.VITE_API_URL}/api/paystack/config`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setPublicKey(data.data.publicKey);
      })
      .catch((err) => console.error("Failed to load Paystack config:", err));
  }, []);

  const config = {
    reference: "",
    email: user.email,
    amount: parseFloat(amount) * 100, // Paystack expects pesewas
    publicKey: publicKey,
    currency: "GHS",
    metadata: {
      custom_fields: [
        {
          display_name: "User ID",
          variable_name: "user_id",
          value: user.userId,
        },
      ],
    },
  };

  const onSuccess = async (reference) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/paystack/verify`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            reference: reference.reference || reference.trxref,
          }),
        },
      );
      const data = await res.json();

      if (data.success) {
        dispatch({
          type: "UPDATE_WALLET",
          payload: {
            amount: data.data.amount,
            description: "Wallet Top-up via Paystack",
          },
        });
        setTopUpResult({
          success: true,
          message: `₵${data.data.amount.toFixed(2)} added to your wallet successfully!`,
        });
        setAmount("");
      } else {
        setTopUpResult({
          success: false,
          message:
            data.message || "Payment verification failed. Contact support.",
        });
      }
    } catch {
      setTopUpResult({
        success: false,
        message:
          "Could not verify payment. Contact support with your reference.",
      });
    }
    setIsLoading(false);
  };

  const onClose = () => {
    setIsLoading(false);
  };

  const initializePayment = usePaystackPayment(config);

  const handlePaystackTopUp = async () => {
    const amt = parseFloat(amount);
    if (amt < 1) return;

    setIsLoading(true);

    try {
      // Get a reference from the backend
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/paystack/initialize`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: amt }),
        },
      );
      const data = await res.json();

      if (data.success) {
        // Update config reference and trigger Paystack popup
        config.reference = data.data.reference;
        initializePayment({
          reference: data.data.reference,
          onSuccess,
          onClose,
        });
      } else {
        setTopUpResult({
          success: false,
          message: data.message || "Failed to initialize payment.",
        });
        setIsLoading(false);
      }
    } catch {
      setTopUpResult({
        success: false,
        message: "Network error. Please try again.",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Topup Wallet</h1>
        <p className="text-sm text-navy-500 mt-1">
          Add funds to your wallet via Paystack
        </p>
      </div>

      {/* Balance Card */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-2xl p-6 text-white shadow-lg shadow-primary-500/20">
        <p className="text-sm text-primary-100">Current Balance</p>
        <p className="text-3xl font-bold mt-1">
          ₵{user.walletBalance.toFixed(2)}
        </p>
      </div>

      {/* Topup Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-primary-600" />
            <h3 className="text-sm font-medium text-navy-900">
              Paystack Top-Up
            </h3>
          </div>
        </div>

        <div className="p-6">
          {topUpResult ? (
            <div className="text-center py-6">
              <div
                className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${topUpResult.success ? "bg-green-50" : "bg-red-50"}`}
              >
                {topUpResult.success ? (
                  <CheckCircle className="w-8 h-8 text-green-500" />
                ) : (
                  <AlertCircle className="w-8 h-8 text-red-500" />
                )}
              </div>
              <h3
                className={`text-lg font-bold mb-2 ${topUpResult.success ? "text-green-600" : "text-red-600"}`}
              >
                {topUpResult.success ? "Top-Up Successful!" : "Top-Up Failed"}
              </h3>
              <p className="text-sm text-navy-500 mb-4">
                {topUpResult.message}
              </p>
              <button
                onClick={() => setTopUpResult(null)}
                className="px-6 py-2.5 bg-primary-500 text-white text-sm font-semibold rounded-xl hover:bg-primary-600 transition-colors"
              >
                Top Up Again
              </button>
            </div>
          ) : (
            <>
              {/* Quick Amount Buttons */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[5, 10, 20, 50, 100, 200].map((quickAmount) => (
                  <button
                    key={quickAmount}
                    onClick={() => setAmount(String(quickAmount))}
                    className={`py-2.5 text-sm font-medium rounded-xl border transition-all ${
                      amount === String(quickAmount)
                        ? "border-primary-500 bg-primary-50 text-primary-700"
                        : "border-gray-200 text-navy-600 hover:border-primary-300 hover:bg-primary-50/50"
                    }`}
                  >
                    ₵{quickAmount}
                  </button>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-navy-700 mb-2">
                  Custom Amount (GHS)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  min="1"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
                />
                <p className="text-xs text-navy-400 mt-2 flex items-center gap-1">
                  <Info className="w-3 h-3" />
                  Minimum top-up: ₵1.00
                </p>
              </div>

              {/* Pay Button */}
              <button
                onClick={handlePaystackTopUp}
                disabled={
                  !amount || parseFloat(amount) < 1 || isLoading || !publicKey
                }
                className="w-full py-3 text-sm font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl hover:from-primary-600 hover:to-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    Pay with Paystack
                  </>
                )}
              </button>

              {!publicKey && (
                <p className="text-xs text-amber-600 mt-2 text-center">
                  Paystack is not configured. Add your keys to backend/.env
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
