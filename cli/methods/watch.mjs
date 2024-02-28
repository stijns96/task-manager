import config from "../../config.mjs";

import Build from "../commands/build.mjs";

import { watch } from "chokidar";
import chalk from "chalk";

export default class Watch extends Build {
  constructor({
    type,
    spinners
  } = {
      type: "",
      spinners: {}
    }) {
    super();

    this.type = type;
    this.glob = config[this.type].glob.input;
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
        const input = path.replace(/\\/g, "/");
        const extension = path.split(".").pop();

        const type = extension === "scss" ? "css" : extension;

        try {
          await super.run({ type, dev: true, input });

        } catch (errors) {
          this.errors = errors;
        }
      })
  }
}