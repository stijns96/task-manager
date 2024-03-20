// File system packages
import fse from "fs-extra";

// Terminal packages
import Spinnies from "spinnies";
import chalk from "chalk";

import config from "../config.mjs";

export default class Clean {
  constructor() {
    // Glob
    this.globOptions = { posix: true };

    // Spinner
    this.spinners = new Spinnies({
      succeedColor: "gray",
      failColor: "white",
    });
  }

  async run() {
    const startTime = this.startSpinner({
      type: this.type,
      text: `Cleaning theme`,
    });

    await this.theme();

    this.endSpinner({
      type: this.type,
      startTime,
      text: `Cleaning theme`,
    });
  }

  /**
   * Clean assets
   */
  async theme() {
    fse.emptyDirSync(config.theme.root);
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
    } else {
      this.spinners.succeed(`build-${type}`, {
        text: `${chalk.green("Completed")} ${text} ${timeInSeconds}`,
      });
    }
  }
}
