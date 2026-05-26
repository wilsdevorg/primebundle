import { useState, useEffect, useCallback, useRef } from "react";
import {
  Save,
  Globe,
  Bell,
  Shield,
  Power,
  Loader2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import { API_URL } from "../utils/api";

export default function AdminSettings() {
  const [saveStatus, setSaveStatus] = useState("idle"); // idle | saving | saved | error
  const [errorMessage, setErrorMessage] = useState("");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [maintenanceLoading, setMaintenanceLoading] = useState(false);
  const [loadingMaintenance, setLoadingMaintenance] = useState(true);
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Store settings state
  const [storeName, setStoreName] = useState("");
  const [storeUrl, setStoreUrl] = useState("");
  const [currency, setCurrency] = useState("GHS (₵)");
  const [adminEmail, setAdminEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notifications, setNotifications] = useState({
    newOrders: true,
    failedTransactions: true,
    lowBalance: false,
    weeklyReports: true,
  });

  // Original values to detect changes
  const [original, setOriginal] = useState({});
  const saveButtonRef = useRef(null);

  // Client-side validation
  const validate = useCallback(() => {
    const errors = [];
    if (!storeName || storeName.trim().length === 0) {
      errors.push("Store name is required");
    }
    if (storeName.trim().length > 100) {
      errors.push("Store name must be 100 characters or less");
    }
    if (storeUrl && storeUrl.trim().length > 0) {
      try {
        new URL(storeUrl.trim());
      } catch {
        errors.push("Store URL is not a valid URL");
      }
    }
    if (!adminEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adminEmail.trim())) {
      errors.push("A valid admin email is required");
    }
    if (password && password.length > 0 && password.length < 6) {
      errors.push("Password must be at least 6 characters");
    }
    return errors;
  }, [storeName, storeUrl, adminEmail, password]);

  // Load maintenance mode
  useEffect(() => {
    fetch(`${API_URL}/api/admin/settings/system`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load system settings");
        return res.json();
      })
      .then((data) => {
        if (data.success) setMaintenanceMode(data.data.maintenanceMode);
        setLoadingMaintenance(false);
      })
      .catch(() => {
        setLoadingMaintenance(false);
      });
  }, []);

  // Load store settings
  useEffect(() => {
    fetch(`${API_URL}/api/admin/settings/store`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load store settings");
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          const d = data.data;
          setStoreName(d.storeName || "");
          setStoreUrl(d.storeUrl || "");
          setCurrency(d.currency || "GHS (₵)");
          setAdminEmail(d.adminEmail || "");
          setNotifications(
            d.notifications || {
              newOrders: true,
              failedTransactions: true,
              lowBalance: false,
              weeklyReports: true,
            },
          );
          setOriginal({
            storeName: d.storeName || "",
            storeUrl: d.storeUrl || "",
            currency: d.currency || "GHS (₵)",
            adminEmail: d.adminEmail || "",
            notifications: d.notifications || {},
          });
        }
        setLoadingSettings(false);
      })
      .catch(() => {
        setLoadingSettings(false);
        setLoadError(true);
      });
  }, []);

  // Detect changes
  useEffect(() => {
    if (loadingSettings) return;
    const changed =
      storeName !== original.storeName ||
      storeUrl !== original.storeUrl ||
      currency !== original.currency ||
      adminEmail !== original.adminEmail ||
      password.length > 0 ||
      JSON.stringify(notifications) !== JSON.stringify(original.notifications);
    setHasChanges(changed);
  }, [
    storeName,
    storeUrl,
    currency,
    adminEmail,
    password,
    notifications,
    original,
    loadingSettings,
  ]);

  // Keyboard shortcut: Ctrl+S / Cmd+S to save
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        if (hasChanges && saveStatus === "idle") {
          handleSave();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    hasChanges,
    saveStatus,
    storeName,
    storeUrl,
    currency,
    adminEmail,
    password,
    notifications,
  ]);

  // Warn before leaving with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasChanges]);

  const toggleMaintenanceMode = async () => {
    const newValue = !maintenanceMode;
    setMaintenanceMode(newValue);
    setMaintenanceLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/admin/settings/system`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ maintenanceMode: newValue }),
      });
      if (!res.ok) throw new Error("Failed to update");
    } catch (error) {
      console.error("Failed to toggle maintenance mode", error);
      setMaintenanceMode(!newValue); // revert on error
    } finally {
      setMaintenanceLoading(false);
    }
  };

  const toggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    // Client-side validation
    const validationErrors = validate();
    if (validationErrors.length > 0) {
      setSaveStatus("error");
      setErrorMessage(validationErrors.join(". "));
      setTimeout(() => setSaveStatus("idle"), 6000);
      return;
    }

    setSaveStatus("saving");
    setErrorMessage("");

    try {
      const res = await fetch(`${API_URL}/api/admin/settings/store`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          storeName,
          storeUrl,
          currency,
          adminEmail,
          password,
          notifications,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSaveStatus("saved");
        setPassword("");
        setOriginal({
          storeName,
          storeUrl,
          currency,
          adminEmail,
          notifications,
        });
        setHasChanges(false);
        setTimeout(() => setSaveStatus("idle"), 3000);
      } else {
        // Server validation errors or other failures
        setSaveStatus("error");
        setErrorMessage(
          data.message || data.errors?.join(". ") || "Failed to save settings",
        );
        setTimeout(() => setSaveStatus("idle"), 6000);
      }
    } catch (err) {
      console.error("Save failed:", err);
      setSaveStatus("error");
      setErrorMessage(
        "Network error. Please check your connection and try again.",
      );
      setTimeout(() => setSaveStatus("idle"), 6000);
    }
  };

  const handleDiscard = () => {
    setStoreName(original.storeName);
    setStoreUrl(original.storeUrl);
    setCurrency(original.currency);
    setAdminEmail(original.adminEmail);
    setNotifications(original.notifications);
    setPassword("");
  };

  const handleRetryLoad = () => {
    setLoadError(false);
    setLoadingSettings(true);
    setLoadingMaintenance(true);
    fetch(`${API_URL}/api/admin/settings/store`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed");
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          const d = data.data;
          setStoreName(d.storeName || "");
          setStoreUrl(d.storeUrl || "");
          setCurrency(d.currency || "GHS (₵)");
          setAdminEmail(d.adminEmail || "");
          setNotifications(d.notifications || {});
          setOriginal({
            storeName: d.storeName || "",
            storeUrl: d.storeUrl || "",
            currency: d.currency || "GHS (₵)",
            adminEmail: d.adminEmail || "",
            notifications: d.notifications || {},
          });
        }
        setLoadingSettings(false);
      })
      .catch(() => {
        setLoadingSettings(false);
        setLoadError(true);
      });
    fetch(`${API_URL}/api/admin/settings/system`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setMaintenanceMode(data.data.maintenanceMode);
        setLoadingMaintenance(false);
      })
      .catch(() => setLoadingMaintenance(false));
  };

  const notificationItems = [
    { key: "newOrders", label: "Email notifications for new orders" },
    {
      key: "failedTransactions",
      label: "Email notifications for failed transactions",
    },
    { key: "lowBalance", label: "Low wallet balance alerts" },
    { key: "weeklyReports", label: "Weekly performance reports" },
  ];

  const isLoading = loadingMaintenance || loadingSettings;

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="space-y-6 max-w-3xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-8 w-36 bg-gray-200 rounded-lg animate-pulse" />
            <div className="h-4 w-52 bg-gray-100 rounded-lg animate-pulse mt-2" />
          </div>
        </div>
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 bg-gray-200 rounded animate-pulse" />
              <div className="h-5 w-28 bg-gray-200 rounded-lg animate-pulse" />
            </div>
            <div className="space-y-3">
              <div className="h-10 bg-gray-50 rounded-xl animate-pulse" />
              <div className="h-10 bg-gray-50 rounded-xl animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Load error state
  if (loadError) {
    return (
      <div className="space-y-6 max-w-3xl">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Settings</h1>
          <p className="text-sm text-navy-500 mt-1">
            Configure your store preferences
          </p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
          <AlertTriangle className="w-10 h-10 text-red-400 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-red-800 mb-1">
            Failed to load settings
          </h3>
          <p className="text-sm text-red-600 mb-4">
            Could not connect to the server. Please check that the backend is
            running.
          </p>
          <button
            onClick={handleRetryLoad}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white text-sm font-semibold rounded-xl hover:bg-red-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" /> Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Settings</h1>
          <p className="text-sm text-navy-500 mt-1">
            Configure your store preferences
          </p>
        </div>
        <div className="flex items-center gap-3">
          {hasChanges && saveStatus === "idle" && (
            <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1.5 rounded-full font-semibold animate-pulse">
              ● Unsaved changes
            </span>
          )}
          <span className="text-xs text-navy-400 hidden sm:inline-block">
            {navigator.platform?.includes("Mac") ? "⌘" : "Ctrl"}+S to save
          </span>
        </div>
      </div>

      {/* Save status banner */}
      {saveStatus === "saved" && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm px-4 py-3 rounded-xl flex items-center gap-2 animate-fade-in">
          <CheckCircle className="w-4 h-4 flex-shrink-0" /> All settings saved
          successfully!
        </div>
      )}
      {saveStatus === "error" && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl flex items-start gap-2 animate-fade-in">
          <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">Failed to save settings</p>
            {errorMessage && (
              <p className="mt-0.5 text-red-600">{errorMessage}</p>
            )}
          </div>
        </div>
      )}

      {/* System Control */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Power className="w-5 h-5 text-red-500" />
          <h2 className="font-bold text-navy-900">System Control</h2>
        </div>
        <div
          className={`p-4 rounded-xl border flex items-center justify-between transition-colors ${maintenanceMode ? "bg-red-50 border-red-200" : "bg-gray-50 border-gray-100"}`}
        >
          <div>
            <h3 className="font-semibold text-navy-900">Maintenance Mode</h3>
            <p className="text-sm text-navy-500 mt-1">
              {maintenanceMode
                ? "System is currently OFFLINE. Users see a maintenance screen."
                : "System is LIVE. Users can access the store normally."}
            </p>
          </div>
          <button
            onClick={toggleMaintenanceMode}
            disabled={maintenanceLoading}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all duration-200 ${
              maintenanceMode
                ? "bg-red-500 text-white hover:bg-red-600 shadow-sm shadow-red-200"
                : "bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm shadow-emerald-200"
            } disabled:opacity-50`}
          >
            {maintenanceLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Power className="w-4 h-4" />
            )}
            {maintenanceMode ? "Turn System Live" : "Enable Maintenance"}
          </button>
        </div>
      </div>

      {/* General */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Globe className="w-5 h-5 text-primary-500" />
          <h2 className="font-bold text-navy-900">General</h2>
        </div>
        <div>
          <label className="block text-sm font-medium text-navy-700 mb-1.5">
            Store Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            placeholder="Enter store name"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
          />
          {storeName.length > 100 && (
            <p className="text-xs text-red-500 mt-1">
              Store name must be 100 characters or less ({storeName.length}/100)
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-navy-700 mb-1.5">
            Store URL
          </label>
          <input
            type="text"
            value={storeUrl}
            onChange={(e) => setStoreUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy-700 mb-1.5">
            Currency
          </label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
          >
            <option>GHS (₵)</option>
            <option>USD ($)</option>
            <option>NGN (₦)</option>
          </select>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Bell className="w-5 h-5 text-primary-500" />
          <h2 className="font-bold text-navy-900">Notifications</h2>
        </div>
        {notificationItems.map((item) => (
          <label
            key={item.key}
            className="flex items-center justify-between py-2 cursor-pointer group"
          >
            <span className="text-sm text-navy-700 group-hover:text-navy-900 transition-colors">
              {item.label}
            </span>
            <button
              type="button"
              onClick={() => toggleNotification(item.key)}
              className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${notifications[item.key] ? "bg-primary-500" : "bg-gray-300"}`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${notifications[item.key] ? "translate-x-5" : "translate-x-0"}`}
              />
            </button>
          </label>
        ))}
      </div>

      {/* Security */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-5 h-5 text-primary-500" />
          <h2 className="font-bold text-navy-900">Security</h2>
        </div>
        <div>
          <label className="block text-sm font-medium text-navy-700 mb-1.5">
            Admin Email <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
            placeholder="admin@example.com"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy-700 mb-1.5">
            Change Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password (leave empty to keep current)"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
          />
          {password.length > 0 && password.length < 6 && (
            <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" /> Password must be at least 6
              characters
            </p>
          )}
          {password.length >= 6 && (
            <p className="text-xs text-amber-600 mt-1.5 flex items-center gap-1">
              ⚠️ Password will be updated when you save
            </p>
          )}
        </div>
      </div>

      {/* Save Button */}
      <div className="sticky bottom-0 bg-white/80 backdrop-blur-lg border-t border-gray-100 -mx-2 px-2 py-4 flex items-center gap-4 z-10">
        <button
          ref={saveButtonRef}
          onClick={handleSave}
          disabled={
            saveStatus === "saving" || (!hasChanges && saveStatus === "idle")
          }
          className={`px-6 py-3 text-sm font-semibold text-white rounded-xl transition-all duration-200 shadow-sm flex items-center gap-2
                        ${
                          saveStatus === "saving"
                            ? "bg-gray-400 cursor-not-allowed"
                            : hasChanges
                              ? "bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 hover:shadow-md active:scale-[0.98]"
                              : "bg-gray-300 cursor-not-allowed"
                        }
                    `}
        >
          {saveStatus === "saving" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Saving...
            </>
          ) : saveStatus === "saved" ? (
            <>
              <CheckCircle className="w-4 h-4" /> Saved!
            </>
          ) : (
            <>
              <Save className="w-4 h-4" /> Save Settings
            </>
          )}
        </button>
        {hasChanges && saveStatus === "idle" && (
          <button
            onClick={handleDiscard}
            className="px-4 py-3 text-sm font-medium text-navy-500 hover:text-navy-700 transition-colors"
          >
            Discard Changes
          </button>
        )}
        {!hasChanges && saveStatus === "idle" && (
          <span className="text-xs text-navy-400">All changes saved</span>
        )}
      </div>
    </div>
  );
}
