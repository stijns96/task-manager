import BundleJs from "./js/bundle.mjs";
import CompileScss from "./scss/compile.mjs";

import { watch } from "chokidar";
import chalk from "chalk";

export default class WatchJs {
  constructor({ type, glob, spinners } = { type: "", glob: "", spinners: {} }) {
    this.type = type;
    this.glob = glob;
    this.spinners = spinners;

    this.errors = [];

    this.watchOptions = {
      // Ignore dotfiles
      ignored: /(^|[\/\\])\../,
      persistent: true,
    };
  }

  async run() {
    const startTime = process.hrtime();
    this.spinners.add(`watch-${this.type}`, {
      text: chalk.gray(`Starting ${this.type} watcher...`),
      indent: 2,
    });

    const watcher = watch(this.glob, this.watchOptions);

    // Wait for the "ready" event before continuing
    await new Promise((resolve, reject) => {
      watcher
        .on("ready", () => {
          const endTime = process.hrtime(startTime);
          const time = endTime[0] + endTime[1] / 1e9;

          this.spinners.succeed(`watch-${this.type}`, {
            text: chalk.gray(
              `${this.type} watcher started (${chalk.blue(
                `${time.toFixed(2)}s`
              )})`
            ),
          });
          resolve();
        })
        .on("error", (error) => {
          const endTime = process.hrtime(startTime);
          const time = endTime[0] + endTime[1] / 1e9;

          this.spinners.fail(`watch-${this.type}`, {
            text: `Error: ${error} (${chalk.blue(`${time.toFixed(2)}s`)})`,
          });
          reject(error);
        });
    });

    watcher
      // On change
      .on("change", async (path) => {
        const normalizedPath = path.replace(/\\/g, "/");
        const extension = path.split(".").pop();
        const linkedPath = chalk.blue.underline(normalizedPath);

        const startTime = this.startSpinner({
          type: this.type,
          text: `processing ${linkedPath}...`,
        });

        switch (extension) {
          case "js":
            const bundleJs = new BundleJs({ input: normalizedPath });

            try {
              await bundleJs.run();
            } catch (errors) {
              this.errors = errors;
            }
            break;

          case "scss":
            const compileScss = new CompileScss({ input: normalizedPath });

            try {
              await compileScss.run();
            } catch (errors) {
              this.errors = errors;
            }
            break;
        }

        this.endSpinner({
          type: this.type,
          startTime,
          text: `processing ${linkedPath}`,
          errors: this.errors,
        });
      })
  }

  /**
   * Start spinner
   * @param {string} type - Type of spinner
   * @param {string} text - Text to display
   * @param {number} indent - Indentation
   * @returns {Array} - Start time
   */
  startSpinner({ type, text, indent = 0 }) {
    const startTime = process.hrtime();
    this.spinners.add(`build-${type}`, {
      text,
      indent,
    });

    return startTime;
  }

  /**
   * End spinner
   * @param {string} type - Type of spinner
   * @param {Array} startTime - Start time
   * @param {string} text - Text to display
   * @param {Array} errors - Errors
   */
  endSpinner({ type, startTime, text, errors = [] }) {
    const endTime = process.hrtime(startTime);
    const time = endTime[0] + endTime[1] / 1e9;
    const timeInSeconds = `(${chalk.blue(`${time.toFixed(2)}s`)})`;

    if (errors.length > 0) {
      this.spinners.fail(`build-${type}`, {
        text: `${chalk.red("Failed")} ${text} ${timeInSeconds}`,
      });
      console.log(`\n${errors[0]}`);
    } else {
      this.spinners.succeed(`build-${type}`, {
        text: `${chalk.green("Completed")} ${text} ${timeInSeconds}`,
      });
    }
  }
}
