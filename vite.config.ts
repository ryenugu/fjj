import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const web3FormKey =
    env.WEB3FORM_API_KEY ||
    env.VITE_WEB3FORM_API_KEY ||
    env.VITE_WEB3FORMS_ACCESS_KEY ||
    "";

  return {
    plugins: [react()],
    define: {
      "import.meta.env.VITE_WEB3FORM_API_KEY": JSON.stringify(web3FormKey),
    },
  };
});
