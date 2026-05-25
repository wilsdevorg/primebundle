import { AlertTriangle, Settings, RefreshCw } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Maintenance({ onSystemLive }) {
    const [checking, setChecking] = useState(false);
    const [countdown, setCountdown] = useState(10);

    // Auto-poll every 10 seconds to check if system is back live
    useEffect(() => {
        const interval = setInterval(() => {
            setChecking(true);
            fetch('/api/health')
                .then(res => res.json())
                .then(data => {
                    setChecking(false);
                    if (data && !data.maintenanceMode) {
                        // System is live again — reload the page
                        if (onSystemLive) {
                            onSystemLive();
                        } else {
                            window.location.reload();
                        }
                    }
                })
                .catch(() => setChecking(false));
        }, 10000);

        return () => clearInterval(interval);
    }, [onSystemLive]);

    // Countdown timer for visual feedback
    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown(prev => (prev <= 1 ? 10 : prev - 1));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-gray-100 flex flex-col items-center justify-center p-4 text-center">
            {/* Animated gear icon */}
            <div className="w-24 h-24 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mb-8 shadow-lg border-4 border-orange-200">
                <Settings className="w-12 h-12 animate-spin" style={{ animationDuration: '3s' }} />
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-3">We'll be back soon!</h1>
            <p className="text-gray-500 max-w-md mx-auto mb-8 leading-relaxed text-lg">
                Sorry for the inconvenience but we're performing some maintenance at the moment.
                We'll be back online shortly!
            </p>

            {/* Auto-check status indicator */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-md flex flex-col items-center gap-3 text-sm text-gray-600 max-w-sm w-full mb-6">
                <div className="flex items-center gap-2">
                    <RefreshCw className={`w-4 h-4 text-orange-500 ${checking ? 'animate-spin' : ''}`} />
                    <span>
                        {checking
                            ? 'Checking if system is back online...'
                            : `Auto-checking in ${countdown}s...`
                        }
                    </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                    <div
                        className="h-full bg-orange-400 rounded-full transition-all duration-1000 ease-linear"
                        style={{ width: `${((10 - countdown) / 10) * 100}%` }}
                    />
                </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3 text-sm text-gray-600 max-w-sm">
                <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <span className="text-left">If you need immediate assistance, please contact our support team.</span>
            </div>
        </div>
    );
}
