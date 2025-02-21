import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/auth": {
        target: "https://donasi.lazis-sa.org",
        changeOrigin: true,
      },
      "/billing": {
        target: "https://donasi.lazis-sa.org",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/billing/, "/billing"),
      },
    },
    host: true,
    port: 5173,
    strictPort: true,
  },
});
