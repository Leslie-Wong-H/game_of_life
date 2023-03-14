import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

export default defineConfig(({ mode }) => {
  // Ref: https://github.com/vitejs/vite/issues/3105#issuecomment-939703781
  const env = loadEnv(mode, "env", "");
  const htmlPlugin = () => ({
    name: "html-transform",
    transformIndexHtml: (html: string) =>
      html.replace(
        /<%=\s*([a-zA-Z_]+)\s*%>/g,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        (_match, variableName) => env[variableName]
      ),
  });

  return {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    plugins: [svgr(), react(), htmlPlugin()],
    root: "src",
  };
});
