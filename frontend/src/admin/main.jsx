import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import "../user.css"; // reuse main styles
import { AdminProvider } from "./AdminContext";
import AdminLogin from "./AdminLogin";
import AdminLayout from "./AdminLayout";
import AdminDashboard from "./AdminDashboard";
import AdminOrders from "./AdminOrders";
import AdminSMM from "./AdminSMM";
import AdminUsers from "./AdminUsers";
import AdminTransactions from "./AdminTransactions";
import AdminAnalytics from "./AdminAnalytics";
import AdminSettings from "./AdminSettings";

ReactDOM.createRoot(document.getElementById("admin-root")).render(
  <React.StrictMode>
    <HashRouter>
      <AdminProvider>
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/dashboard" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="smm" element={<AdminSMM />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="transactions" element={<AdminTransactions />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AdminProvider>
    </HashRouter>
  </React.StrictMode>,
);
