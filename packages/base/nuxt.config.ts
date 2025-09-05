import { dirname, join } from "path";
import { fileURLToPath } from "url";
import Configurator from "./modules/config";

const baseDir = dirname(fileURLToPath(import.meta.url));
const userDir = process.cwd();

const pwaRevision = Date.now().toString();

export default defineNuxtConfig({
  compatibilityDate: "2025-08-20",
  modules: [
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/scripts",
    "@vueuse/nuxt",
    "@pinia/nuxt",
    Configurator,
    "@vite-pwa/nuxt",
  ],
  css: [join(baseDir, "./app/assets/styles/global.scss")],
  components: [
    {
      path: join(baseDir, "./app/components"),
      prefix: "RS",
    },
    "~/components",
  ],
  fonts: {
    defaults: {
      weights: ["100 900"],
    },
  },
  alias: {
    "@e-chan1007/regisaku-base/config": join(baseDir, "./config/index.ts"),
  },
  pinia: {
    storesDirs: [join(baseDir, "./app/stores")],
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "sass:math";
            @use "sass:list";
            @use "${join(baseDir, "./app/assets/styles/variables")}" as *;
          `,
        },
      },
    },
  },
  pwa: {
    devOptions: {
      enabled: true,
    },
    registerType: "autoUpdate",
    workbox: {
      globPatterns: ["**/*.{js,css,html,ico,png,svg,woff,woff2}"],
      additionalManifestEntries: [
        {
          url: "/",
          revision: pwaRevision,
        },
      ],
      runtimeCaching: [
        {
          urlPattern: /^\/api\//,
          method: "GET",
          handler: "NetworkFirst",
        },
      ],
    },
    pwaAssets: {
      preset: "minimal-2023",
      image: join(userDir, "./public/logo.svg"),
    },
  },
});
