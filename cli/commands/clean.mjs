import config from "../../config.mjs";


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
      succeedColor: "gray",
      failColor: "white",
    });
  }

  async run() {
    const startTime = this.startSpinner({
      type: this.type,
      text: `Cleaning ${this.type}`,
    })

    await this[this.type]();

    this.endSpinner({
      type: this.type,
      startTime,
      text: `Cleaning ${this.type}`,
    });
  }

  /**
   * Clean assets
   */
  async assets() {
    fse.emptyDirSync(config.theme.root);
  }

  /**
   * Clean js
   */
  async js() {
    // Get all js files
    const files = globSync(`${config.theme.assetsDir}/*.js`, this.globOptions);

    // Remove all files
    files.forEach((file) => fse.removeSync(file));
  }

  /**
   * Clean css
   */
  async css() {
    // Get all css files
    const files = globSync(`${config.theme.assetsDir}/*.css`, this.globOptions);

    // Remove all css files
    files.forEach((file) => fse.removeSync(file));
  }

  /**
   * Clean liquid
   */
  async liquid() {
    // Get all liquid files
    const files = globSync(`${config.theme.root}/**/*.liquid`, this.globOptions);

    // Remove all liquid files
    files.forEach((file) => fse.removeSync(file));
  }

  /**
   * Clean json
   */
  async json() {
    // Get all json files
    const files = globSync(`${config.theme.root}/**/*.json`, this.globOptions);

    // Remove all json files
    files.forEach((file) => fse.removeSync(file));
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
