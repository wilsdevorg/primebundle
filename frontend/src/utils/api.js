/**
 * PrimeBundle API base URL (production + development safe)
 *
 * - Production: uses VITE_API_URL (Render backend)
 * - Development: uses Vite proxy (/api)
 */

const isProd = import.meta.env.PROD;

const API_URL = isProd ? import.meta.env.VITE_API_URL : ""; // dev uses Vite proxy

export { API_URL };
