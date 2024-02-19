import fse from "fs-extra";

// Terminal Styling
import chalk from "chalk";

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
    fse.read;
    const { code } = await minify(fse.readFileSync(path, "utf8"));

    if (!code) throw new Error("No code to minify.");

    const file = path.split("/").pop();
    const to = `theme/assets/${file}`;

    fse.outputFileSync(to, code);

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
