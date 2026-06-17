import { defineConfig } from "wxt";
import tailwindcss from "@tailwindcss/vite";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  srcDir: "src",
  vite: () => ({
    plugins: [tailwindcss()],
  }),
  manifest: {
    name: "Wikie",
    description: "Extension that allow you to be on short with wiki world on gaming",
    version: "0.0.1",
    permissions: ["storage", "webRequest"],
    host_permissions: ["https://en.wikipedia.org/*"],
  },
});
