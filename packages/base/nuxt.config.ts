import { dirname, join } from "path";
import { fileURLToPath } from "url";
import Configurator from "./modules/config";

const currentDir = dirname(fileURLToPath(import.meta.url));

export default defineNuxtConfig({
  compatibilityDate: "2025-08-20",
  modules: [
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/scripts",
    "@vueuse/nuxt",
    "@pinia/nuxt",
    Configurator,
  ],
  css: [join(currentDir, "./app/assets/styles/global.scss")],
  components: [
    {
      path: join(currentDir, "./app/components"),
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
    "@e-chan1007/regisaku-base/config": join(currentDir, "./config/index.ts"),
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "sass:math";
            @use "sass:list";
            @use "${join(currentDir, "./app/assets/styles/variables")}" as *;
          `,
        },
      },
    },
  },
});
