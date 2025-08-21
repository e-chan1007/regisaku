import { dirname, join } from "path";
import { fileURLToPath } from "url";
import ColorGenerator from "./modules/color-generator";

const currentDir = dirname(fileURLToPath(import.meta.url));

declare module "nuxt/schema" {
  interface PublicRuntimeConfig {
    appName?: string;
    tabs?: string[];
    theme?: {
      colors?: {
        primary?: string;
        gray?: string;
        info?: string;
        success?: string;
        error?: string;
        warning?: string;
      };
    };
  }
}

export default defineNuxtConfig({
  compatibilityDate: "2025-08-20",
  modules: ["@nuxt/fonts", "@nuxt/icon", "@nuxt/scripts", ColorGenerator],
  css: [join(currentDir, "./app/assets/styles/global.scss")],
  runtimeConfig: {
    public: {
      appName: "regisaku",
      tabs: ["index", "tab2", "tab3"],
      theme: {
        colors: {
          primary: "#0063b2",
          gray: "#374151",
          info: "#3b92f6",
          success: "#22a06b",
          error: "#b91c3a",
          warning: "#c58a1c",
        },
      },
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "sass:math";
            @use "${join(currentDir, "./app/assets/styles/variables")}" as *;
          `,
        },
      },
    },
  },
});
