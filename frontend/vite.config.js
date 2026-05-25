import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "serve-user-html",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === "/") {
            req.url = "/user.html";
          }
          next();
        });
      },
    },
  ],
  server: {
    port: 5173,
    host: true,
    open: "/",
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "user.html"),
        admin: resolve(__dirname, "admin.html"),
      },
    },
  },
});
