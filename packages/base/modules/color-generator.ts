import chroma from "chroma-js";
import { writeFile } from "fs/promises";
import { defineNuxtModule } from "nuxt/kit";
import { resolve } from "path";

const createCSSVariables = (key: string, color: string): string => {
  const colorPalette = chroma
    .scale([
      chroma(color).set("lch.l", 95),
      chroma(color).set("lch.l", 50),
      chroma(color).set("lch.l", 10),
    ])
    .mode("lch")
    .colors(10);

  return colorPalette
    .map((color, index) => `  --color-${key}-${index}: ${color};`)
    .join("\n");
};

export default defineNuxtModule({
  setup(_options, nuxt) {
    const buildDir = nuxt.options.buildDir;
    const outputPath = resolve(buildDir, "color-palette.css");
    nuxt.options.css.unshift(outputPath);

    nuxt.hook("nitro:build:before", async () => {
      const colors: Record<string, string> =
        nuxt.options.runtimeConfig.theme?.colors ?? {};

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
