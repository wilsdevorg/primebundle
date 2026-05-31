/**
 * Centralized API base URL utility for PrimeBundle frontend.
 *
 * - In production: uses VITE_API_URL from the environment (e.g. https://primebundle.onrender.com)
 * - In development: falls back to empty string so requests go through the Vite dev proxy
 *   (which proxies /api → http://localhost:5000)
 *
 * Usage in any component:
 *   import { API_URL } from '../utils/api';
 *   fetch(`${API_URL}/api/health`)
 */

const API_URL = import.meta.env.VITE_API_URL || "";

export { API_URL };
