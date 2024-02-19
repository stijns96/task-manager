import fs from "fs";

// Terminal Styling
import chalk from "chalk";
import ora from "ora";
import Spinnies from "spinnies";

// Helpers
import { compileTailwind } from "./helpers/compile-tailwind.mjs";
import { compileScss } from "./helpers/compile-scss.mjs";
import { minimizeJs } from "./helpers/minimize-js.mjs";

// Other
import { watch } from "chokidar";
import { globSync } from "glob";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
const argv = yargs(hideBin(process.argv)).argv;

class Cli {
  constructor() {
    this.dev = argv.dev || false;

    this.srcAssets = "./src/assets";
    this.srcJs = "./src/js/**/*.js";
    this.srcScss = "./src/scss/**/*.scss";
    this.srcTailwind = "./src/scss/tailwind/*.scss";

    this.themeAssets = "./theme/assets";

    this.spinners = new Spinnies({
      succeedColor: "white",
      failColor: "white",
    });

    this.watchOptions = {
      ignored: /(^|[\/\\])\../,
      persistent: true,
    };

    this.globOptions = {
      posix: true,
    };

    this.tailwindFiles = globSync(this.srcTailwind, this.globOptions);
    this.scssFiles = globSync(this.srcScss, {
      ignore: ["src/scss/{partials,tailwind}/**", "src/scss/**/_*.scss"],
      ...this.globOptions,
    });
    this.jsFiles = globSync(this.srcJs, this.globOptions);

    this.dev ? this.watch() : this.build();
  }

  cleanThemeAssets() {
    // Remove all files from theme/assets
    const files = globSync(`${this.themeAssets}/*`, this.globOptions);
    files.forEach((file) => fs.unlinkSync(file));
  }

  /**
   * Build files
   * @returns {void}
   */
  build() {
    const startTime = this.buildStart();

    this.cleanThemeAssets();

    // Compile Tailwind
    compileTailwind(this.tailwindFiles, this.spinners);

    // Compile SCSS
    this.scssFiles.forEach((path) => compileScss(path, this.spinners));

    // Minimize JS
    this.jsFiles.forEach((path) => minimizeJs(path, this.spinners));

    this.buildEnd(startTime);
  }

  buildStart() {
    // Start timer and spinner
    this.spinners.add("build-start", {
      text: `Building...`,
    });
    return process.hrtime();
  }

  buildEnd(startTime) {
    // End timer and spinner
    const endTime = process.hrtime(startTime);
    endTime[1] = Math.floor(endTime[1] / 1000000);

    this.spinners.add("build-end");

    ["build-start", "build-end"].forEach((name) => {
      this.spinners.succeed(name, {
        text: `Build ${chalk.green("complete")} in ${chalk.blue(
          `${endTime}s`
        )}`,
      });
    });
  }

  /**
   * Watch files
   * @returns {void}
   */
  watch() {
    this.watchScss();
    this.watchJs();
  }

  /**
   * Watch SCSS files
   * @returns {void}
   */
  watchScss() {
    this.spinners.add("scss-watcher", {
      text: "Warming up SCSS watchers",
    });

    watch(this.srcScss, this.watchOptions)
      // On error
      .on("error", (error) =>
        this.spinners.fail("scss-watcher", { text: `Watcher error: ${error}` })
      )

      // On ready
      .on("ready", () =>
        this.spinners.succeed("scss-watcher", { text: "SCSS watcher is ready" })
      )

      // On add
      .on("add", (path) => chalk.blue(`File ${path} has been added`))

      // On change
      .on("change", (path) =>
        compileScss(path.replaceAll("\\", "/"), this.spinners)
      )

      // On remove
      .on("unlink", (path) => chalk.blue(`File ${path} has been removed`));
  }

  /**
   * Watch JS files
   * @returns {void}
   */
  watchJs() {
    this.spinners.add("js-watcher", {
      text: "Warming up JS watchers",
    });

    watch(this.srcJs, this.watchOptions)
      // On error
      .on("error", (error) =>
        this.spinners.fail("js-watcher", { text: `Watcher error: ${error}` })
      )

      // On ready
      .on("ready", () =>
        this.spinners.succeed("js-watcher", { text: "JS watcher is ready" })
      )

      // On add
      .on("add", (path) => chalk.blue(`File ${path} has been added`))

      // On change
      .on("change", (path) =>
        minimizeJs(path.replaceAll("\\", "/"), this.spinners)
      )

      // On remove
      .on("unlink", (path) => chalk.blue(`File ${path} has been removed`));
  }
}

new Cli();
