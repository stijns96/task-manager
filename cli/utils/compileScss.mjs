import { pathToFileURL } from "url";

// Compilers
import * as sass from "sass";

// PostCSS
import postcss from "postcss";
import autoprefixer from "autoprefixer";
import postcssPresetEnv from "postcss-preset-env";
import tailwind from "tailwindcss";
import purgecss from "@fullhuman/postcss-purgecss";
import config from "../config.mjs";

export default async ({ file, purge, cascadeLayers }) => {
  const plugins = [
    tailwind(),
    autoprefixer(),
    postcssPresetEnv({ features: { "cascade-layers": cascadeLayers } }),
  ];

  if (purge) {
    plugins.push(
      purgecss({
        content: [...config.theme.glob.input, ...config.assets.js.glob.input],
        skippedContentGlobs: config.theme.glob.options.ignore,
      }),
    );
  }

  try {
    const { css } = await sass.compileAsync(file, {
      importers: [
        {
          // An importer that redirects relative URLs starting with "~" to
          // `node_modules`.
          findFileUrl(url) {
            if (!url.startsWith("~")) return null;
            const baseUrl = pathToFileURL("node_modules/"); // Construct base URL
            const resolvedUrl = new URL(url.substring(1), baseUrl); // Use base URL to resolve
            return resolvedUrl;
          },
        },
      ],
    });

    const result = await postcss(plugins).process(css, { from: file });
    return result.css;
  } catch (error) {
    // Return the error
    console.log(error);
  }
};
