import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import LandingLayout from './components/layout/LandingLayout';
import AppLayout from './components/layout/AppLayout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import DataMarketplace from './pages/DataMarketplace';
import Loyalty from './pages/Loyalty';
import Wallet from './pages/Wallet';
import Orders from './pages/Orders';
import SMM from './pages/SMM';
import SMMOrders from './pages/SMMOrders';
import Affiliate from './pages/Affiliate';
import Transactions from './pages/Transactions';
import Reseller from './pages/Reseller';
import ResellerAPI from './pages/ResellerAPI';
import Maintenance from './pages/Maintenance';
import { useState, useEffect } from 'react';

export default function App() {
    const [maintenanceMode, setMaintenanceMode] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/health')
            .then(res => {
                if (res.status === 503) {
                    return res.json();
                }
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then(data => {
                if (data && data.maintenanceMode) {
                    setMaintenanceMode(true);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return null;

    if (maintenanceMode) {
        return <Maintenance onSystemLive={() => setMaintenanceMode(false)} />;
    }

    return (
        <AppProvider>
            <BrowserRouter>
                <Routes>
                    {/* Public Landing Route */}
                    <Route element={<LandingLayout />}>
                        <Route path="/" element={<Landing />} />
                    </Route>

                    {/* App Routes - All accessible without authentication */}
                    <Route element={<AppLayout />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/data" element={<DataMarketplace />} />
                        <Route path="/loyalty" element={<Loyalty />} />
                        <Route path="/wallet" element={<Wallet />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/smm" element={<SMM />} />
                        <Route path="/smm-orders" element={<SMMOrders />} />
                        <Route path="/affiliate" element={<Affiliate />} />
                        <Route path="/transactions" element={<Transactions />} />
                        <Route path="/reseller" element={<Reseller />} />
                        <Route path="/reseller-api" element={<ResellerAPI />} />
                    </Route>

                    {/* Catch all */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </AppProvider>
    );
}
