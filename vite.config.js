import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/rss": {
        target: "https://sadar.co.id",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/rss/, "/feed/"),
      },
      "/auth": {
        target: "https://donasi.lazis-sa.org",
        changeOrigin: true,
      },
      "/billing": {
        target: "https://donasi.lazis-sa.org",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/billing/, "/billing"),
      },
      "/api-bima": {
        target: "https://bimaqr.bankjateng.co.id",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api-bima/, ""),
      },
      "/auth/google": {
        target: "https://skyconnect.lazis-sa.org",
        changeOrigin: true,
        secure: false,
      },
    },
    host: true,
    port: 5173,
    strictPort: true,
  },
});
