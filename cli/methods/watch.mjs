import BundleJs from "./js/bundle.mjs";
import CompileScss from "./scss/compile.mjs";

import { watch } from "chokidar";
import chalk from "chalk";

export default class WatchJs {
  constructor({ type, glob, spinners } = { type: "", glob: "", spinners: {} }) {
    this.type = type;
    this.glob = glob;
    this.spinners = spinners;

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

        console.log(
          `${chalk.blue("Changed")} ${chalk.gray(
            normalizedPath
          )} (${chalk.yellow(extension)})`
        );

        switch (extension) {
          case "js":
            const bundleJs = new BundleJs({ input: normalizedPath });
            await bundleJs.run();
            break;

          case "scss":
            const compileScss = new CompileScss({ input: normalizedPath });
            await compileScss.run();
            break;
        }
      });
  }
}
