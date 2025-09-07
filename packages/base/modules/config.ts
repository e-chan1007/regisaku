import chroma from "chroma-js";
import { defu } from "defu";
import { writeFile } from "fs/promises";
import { defineNuxtModule } from "nuxt/kit";
import { resolve } from "path";
import type { RegisakuConfig } from "../config";
import pwaManifestBase from "../pwa/manifest.json";

const createCSSVariables = (key: string, color: string): string => {
  const colorPalette = chroma
    .scale([
      chroma(color).set("lch.l", 95).set("lch.c", 10).mix("white"),
      chroma(color).set("lch.l", 60),
      chroma(color).set("lch.l", 20),
    ])
    .mode("lch")
    .colors(10);

  return colorPalette
    .map((color, index) => `  --color-${key}-${index}: ${color};`)
    .join("\n");
};

export default defineNuxtModule({
  async setup(_options, nuxt) {
    const buildDir = nuxt.options.buildDir;
    const outputPath = resolve(buildDir, "color-palette.css");
    const configPath = resolve(
      nuxt.options.rootDir,
      "./app/regisaku.config.ts",
    );
    nuxt.options.alias["#regisaku-config"] = configPath;
    nuxt.options.watch.push(configPath);
    nuxt.options.css.unshift(outputPath);
    const config: RegisakuConfig = (await import(configPath)).default;

    const pwaRevision = Date.now().toString();
    if (nuxt.options.pwa.workbox?.additionalManifestEntries) {
      const entries = nuxt.options.pwa.workbox.additionalManifestEntries;
      const tabCache = config.tabs.map(
        (path) =>
          ({
            url: path,
            revision: pwaRevision,
          }) as const,
      );
      entries.push(
        ...tabCache.filter(({ url }) =>
          entries.every((e) =>
            typeof e === "string" ? e === url : e.url !== url,
          ),
        ),
      );
    }

    nuxt.options.pwa.manifest = defu(
      {
        name: config.appName,
        short_name: config.appName,
        description: `${config.appName} - レジアプリ`,
        theme_color: config.theme.colors.primary,
      },
      pwaManifestBase,
    );

    nuxt.hook("build:before", async () => {
      const colors: Record<string, string> = config.theme?.colors ?? {};

      const css = [
        ":root {",
        Object.entries(colors).map(([key, color]) =>
          createCSSVariables(key, color),
        ),
        "}",
      ]
        .flat()
        .join("\n");

      await writeFile(outputPath, css);
    });
  },
});
