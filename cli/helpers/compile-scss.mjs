import fse from "fs-extra";
import {pathToFileURL} from 'url';

// Terminal Styling
import chalk from "chalk";

// Compilers
import * as sass from "sass";

// PostCSS
import postcss from "postcss";
import autoprefixer from "autoprefixer";
import postcssPresetEnv from "postcss-preset-env";
import tailwind from "tailwindcss";

/**
 * Compile SCSS to CSS
 * @param {String} path - Path to SCSS file
 */
export async function compileScss(path, spinners) {
  spinners.add('compile-css', {
    text: `Compiling CSS`,
  });

  try {
    const pathArr = path.split("/");
    pathArr.pop();

    const layerName = pathArr[3] === "snippets" ? "components" : pathArr[3];

    const { css } = sass.compile(path, {
      importers: [{
        // An importer that redirects relative URLs starting with "~" to
        // `node_modules`.
        findFileUrl(url) {
          if (!url.startsWith('~')) return null;
          const baseUrl = pathToFileURL('node_modules/'); // Construct base URL
          const resolvedUrl = new URL(url.substring(1), baseUrl); // Use base URL to resolve
          return resolvedUrl;
        }
      }]
    });

    const file = path
      .replace("src/scss/theme/", "")
      .replaceAll("/", "-")
      .replace(".scss", ".css");

    const to = `theme/assets/${file}`;

    const result = await postcss([
      tailwind,
      autoprefixer,
      postcssPresetEnv({
        features: {
          "cascade-layers": false,
        },
      }),
    ]).process(css, {
      from: path,
      to,
    });

    if (!result.css) throw new Error("No CSS to compile.");

    const layer = `@layer ${layerName} {
      ${result.css}
    }\n`;

    fse.outputFileSync(to, layer);

    spinners.succeed('compile-css', {
      text: `${chalk.green("CSS compiled")}`,
    });
  } catch (error) {
    // console.log(chalk.red(`Failed to compile ${path}`), error);
  }
}
