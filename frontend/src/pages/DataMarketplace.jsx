import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { dataBundles, networkLogos } from '../data/mockData';
import { Wifi, Star, X, AlertCircle, CheckCircle } from 'lucide-react';

const networks = Object.keys(dataBundles);

export default function DataMarketplace() {
    const { state, dispatch } = useApp();
    const [activeNetwork, setActiveNetwork] = useState('MTN');
    const [showModal, setShowModal] = useState(false);
    const [selectedBundle, setSelectedBundle] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [purchaseResult, setPurchaseResult] = useState(null);

    const bundles = dataBundles[activeNetwork] || [];

    const handleBuyNow = (bundle) => {
        setSelectedBundle(bundle);
        setPhoneNumber('');
        setPurchaseResult(null);
        setShowModal(true);
    };

    const handleConfirmPurchase = () => {
        if (!phoneNumber || phoneNumber.length < 10) return;

        if (state.user.walletBalance < selectedBundle.price) {
            setPurchaseResult({ success: false, message: 'Insufficient wallet balance. Please top up first.' });
            return;
        }

        dispatch({
            type: 'ADD_ORDER',
            payload: {
                type: 'Data',
                network: selectedBundle.network,
                recipient: phoneNumber,
                amount: selectedBundle.price,
                dataAmount: selectedBundle.data,
                points: selectedBundle.points,
            },
        });

        setPurchaseResult({ success: true, message: `Successfully purchased ${selectedBundle.data} for ${phoneNumber}` });
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-2xl font-bold text-navy-900">Data Marketplace</h1>
                <p className="text-sm text-navy-500 mt-1">Browse and purchase affordable data bundles</p>
            </div>

            {/* Network Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                {networks.map((network) => (
                    <button
                        key={network}
                        onClick={() => setActiveNetwork(network)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${activeNetwork === network
                            ? 'bg-primary-500 text-white shadow-md shadow-primary-500/25'
                            : 'bg-white text-navy-600 border border-gray-200 hover:border-primary-200 hover:bg-primary-50'
                            }`}
                    >
                        <span>{networkLogos[network]}</span>
                        {network}
                    </button>
                ))}
            </div>

            {/* Bundle Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {bundles.map((bundle) => (
                    <div key={bundle.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary-100 transition-all">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-lg">{networkLogos[bundle.network]}</span>
                            <div className="flex items-center gap-1 px-2 py-0.5 bg-amber-50 rounded-full">
                                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                <span className="text-xs font-medium text-amber-700">+{bundle.points} pts</span>
                            </div>
                        </div>

                        <h3 className="text-xl font-bold text-navy-900 mb-1">{bundle.data}</h3>
                        <p className="text-xs text-navy-400 mb-4">Valid for {bundle.validity}</p>

                        <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-primary-600">₵{bundle.price.toFixed(2)}</span>
                            <button
                                onClick={() => handleBuyNow(bundle)}
                                className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-sm"
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Purchase Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
                    <div className="bg-white rounded-2xl w-full max-w-md p-6 animate-slide-up" onClick={e => e.stopPropagation()}>
                        {!purchaseResult ? (
                            <>
                                <div className="flex items-center justify-between mb-5">
                                    <h2 className="text-lg font-bold text-navy-900">Confirm Purchase</h2>
                                    <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                                        <X className="w-5 h-5 text-navy-400" />
                                    </button>
                                </div>

                                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-lg">{networkLogos[selectedBundle.network]}</span>
                                        <span className="font-semibold text-navy-900">{selectedBundle.network}</span>
                                    </div>
                                    <div className="text-2xl font-bold text-navy-900">{selectedBundle.data}</div>
                                    <div className="text-sm text-primary-600 font-medium mt-1">₵{selectedBundle.price.toFixed(2)}</div>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-navy-700 mb-2">Recipient Phone Number</label>
                                    <input
                                        type="tel"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        placeholder="024XXXXXXX"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
                                    />
                                    {phoneNumber && phoneNumber.length < 10 && (
                                        <p className="text-xs text-red-500 mt-1">Please enter a valid phone number</p>
                                    )}
                                </div>

                                <div className="text-xs text-navy-400 mb-4 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" />
                                    Wallet balance: ₵{state.user.walletBalance.toFixed(2)}
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 py-3 text-sm font-medium text-navy-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleConfirmPurchase}
                                        disabled={!phoneNumber || phoneNumber.length < 10}
                                        className="flex-1 py-3 text-sm font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl hover:from-primary-600 hover:to-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                    >
                                        Confirm
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-4">
                                <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${purchaseResult.success ? 'bg-green-50' : 'bg-red-50'}`}>
                                    {purchaseResult.success ? (
                                        <CheckCircle className="w-8 h-8 text-green-500" />
                                    ) : (
                                        <AlertCircle className="w-8 h-8 text-red-500" />
                                    )}
                                </div>
                                <h3 className={`text-lg font-bold mb-2 ${purchaseResult.success ? 'text-green-600' : 'text-red-600'}`}>
                                    {purchaseResult.success ? 'Purchase Successful!' : 'Purchase Failed'}
                                </h3>
                                <p className="text-sm text-navy-500 mb-6">{purchaseResult.message}</p>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="w-full py-3 text-sm font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all"
                                >
                                    Done
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}