import fs from "fs";

// Terminal Styling
import chalk from "chalk";
import ora from "ora";

import { minify } from "terser";

/**
 * Minify JS files
 * @param {String} path - Path to JS file
 */
export async function minimizeJs(path, spinners) {
  spinners.add(path, {
    text: `Compiling ${path}...`,
  });

  try {
    const { code } = await minify(fs.readFileSync(path, "utf8"));

    if (!code) throw new Error("No code to minify.");

    const file = path.split("/").pop();
    const to = `theme/assets/${file}`;

    fs.writeFileSync(to, code);

    spinners.succeed(path, {
      text: `${chalk.green("Minified")} ${chalk.blueBright(
        path
      )} ➔  ${chalk.blue(to)}`,
    });
  } catch (error) {
    spinners.fail(path, {
      text: `${chalk.red("Error")} minifying ${chalk.blueBright(
        path
      )}: ${error}`,
    });
  }
}
