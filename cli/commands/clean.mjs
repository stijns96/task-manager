// File system packages
import fse from "fs-extra";
import { globSync } from "glob";

// Terminal packages
import Spinnies from "spinnies";
import chalk from "chalk";

export default class Clean {
  constructor({ type } = { type: "assets" }) {
    this.type = type;

    // Glob
    this.globOptions = { posix: true };

    // Spinner
    this.spinners = new Spinnies({
      succeedColor: "white",
      failColor: "white",
    });
  }

  async run() {
    const startTime = process.hrtime();
    this.spinners.add("clean", {
      text: `Cleaning ${this.type}...`,
    });

    await this[this.type]();

    const endTime = process.hrtime(startTime);
    const time = endTime[0] + endTime[1] / 1e9;

    this.spinners.succeed("clean", {
      text: `Cleaning ${this.type} ${chalk.green("completed")} (${chalk.blue(
        `${time.toFixed(2)}s`
      )})`,
    });
  }

  /**
   * Clean assets
   */
  async assets() {
    fse.emptyDirSync("theme/assets");
  }

  /**
   * Clean js
   */
  async js() {
    // Get all js files
    const files = globSync("theme/assets/*.js", this.globOptions);

    // Remove all files
    files.forEach((file) => fse.removeSync(file));
  }

  /**
   * Clean css
   */
  async css() {
    // Get all css files
    const files = globSync("theme/assets/*.css", this.globOptions);

    // Remove all css files
    files.forEach((file) => fse.removeSync(file));
  }
}
