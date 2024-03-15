import config from "../config.mjs";

import Build from "../commands/build.mjs";

import { watch } from "chokidar";
import chalk from "chalk";

import fse from "fs-extra";

export default class Watch extends Build {
  constructor({ type, glob, spinners } = {}) {
    super();

    this.type = type;
    this.glob = glob; // E.g. config.assets.js.glob.input = "./src/assets/js/**/*.js"
    this.spinners = spinners;

    this.errors = [];
  }

  async run() {
    const startTime = process.hrtime();
    this.spinners.add(`watch-${this.type}`, {
      text: chalk.gray(`Starting ${this.type} watcher...`),
      indent: 2,
    });

    const watcher = watch(this.glob, config.watch.options);

    // Wait for the "ready" event before continuing
    await new Promise((resolve, reject) => {
      watcher

        // On ready
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

        // On error
        .on("error", (error) => {
          const endTime = process.hrtime(startTime);
          const time = endTime[0] + endTime[1] / 1e9;

          this.spinners.fail(`watch-${this.type}`, {
            text: `Error: ${error} (${chalk.blue(`${time.toFixed(2)}s`)})`,
          });
          reject(error);
        });
    });

    ["add", "change", "unlink"].forEach((event) =>
      watcher.on(event, async (path) => {
        const input = path.replace(/\\/g, "/");
        const fileName = input.split("/").pop();
        const extension = path.split(".").pop();

        let type;

        switch (extension) {
          case "js":
            type = "js";
            break;
          case "scss":
            type = "css";
            break;
          default:
            type = input.includes(config.src.assetsDir) ? "public" : 'theme';
        }

        try {
          // build.run() is called here from the parent class Build
          if (event !== "unlink") {
            await super.run({ type, dev: true, input });
          } else {
            if (input.includes(config.src.assetsDir)) {
              await fse.remove(`${config.theme.assetsDir}/${fileName}`);
            } else {
              await fse.remove(input.replace(config.src.root, config.theme.root));
            }

          }
        } catch (errors) {
          this.errors = errors;
        }
      })
    );
  }
}
