import { useState } from "react";
import { useAdmin } from "./AdminContext";
import { useNavigate } from "react-router-dom";
import { Zap, Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";

export default function AdminLogin() {
  const { login, error, clearError, isAuthenticated } = useAdmin();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate("/dashboard", { replace: true });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    clearError();
    setTimeout(() => {
      const success = login(email, password);
      setLoading(false);
      if (success) {
        navigate("/dashboard", { replace: true });
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-500 to-primary-700 p-8 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl mx-auto mb-4 flex items-center justify-center backdrop-blur-sm">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
            <p className="text-primary-100 text-sm mt-1">
              PrimeBundle Management
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-300" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@primebundle.com"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-300" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-navy-300 hover:text-navy-500"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full py-3 text-sm font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl hover:from-primary-600 hover:to-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-primary-500/25"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In to Admin"
              )}
            </button>

            {/* Demo Credentials Hint */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
              <p className="text-xs text-amber-700 font-medium">
                Demo Credentials
              </p>
              <p className="text-xs text-amber-600 mt-1">
                Email: <span className="font-mono">admin@primebundle.com</span>
              </p>
              <p className="text-xs text-amber-600">
                Password: <span className="font-mono">admin123</span>
              </p>
            </div>
          </form>
        </div>

        <p className="text-center text-navy-400 text-xs mt-6">
          PrimeBundle Admin Panel v1.0
        </p>
      </div>
    </div>
  );
}
