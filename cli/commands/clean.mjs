// File system packages
import fse from "fs-extra";

// Terminal packages
import Spinnies from "spinnies";

import { globSync } from "glob";

export default class Clean {
  constructor() {
    this.globOptions = { posix: true };

    this.spinners = new Spinnies({
      succeedColor: "white",
      failColor: "white",
    });
  }

  async run({ type = "assets" }) {
    const startTime = process.hrtime();
    this.spinners.add("clean-assets", {
      text: `Cleaning ${type}...`,
    });

    await this[type]();

    const endTime = process.hrtime(startTime);
    const time = endTime[0] + endTime[1] / 1e9;

    this.spinners.succeed("clean-assets", {
      text: `Cleaning ${type} completed (${time.toFixed(2)}s)`,
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
