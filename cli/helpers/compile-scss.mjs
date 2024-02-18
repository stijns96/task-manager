import fs from "fs";

// Terminal Styling
import chalk from "chalk";
import ora from "ora";

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
  spinners.add(path, {
    text: `Compiling ${path}...`,
  });

  try {
    const pathArr = path.split("/");
    pathArr.pop();

    const layerName = pathArr[3] === "snippets" ? "components" : pathArr[3];

    const { css } = sass.compile(path);

    const file = path
      .replace("src/scss/theme/", "")
      .replaceAll("/", "-")
      .replace(".scss", ".css");

    const to = `theme/assets/${file}`;

    const result = await postcss([
      tailwind,
      autoprefixer,
      postcssPresetEnv(),
    ]).process(css, {
      from: path,
      to,
    });

    if (!result.css) throw new Error("No CSS to compile.");

    const layer = `@layer ${layerName} {
      ${result.css}
    }\n`;

    fs.writeFileSync(to, layer);

    spinners.succeed(path, {
      text: `${chalk.green("Compiled")} ${chalk.blueBright(
        path
      )} ➔  ${chalk.blue(to)}`,
    });
  } catch (error) {
    spinners.fail(path, {
      text: `${chalk.red("Error")} compiling ${chalk.blueBright(path)}: ${
        error.message
      }`,
    });
  }
}
