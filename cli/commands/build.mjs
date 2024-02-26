import BundleJs from "../methods/js/bundle.mjs";
import CompileScss from "../methods/scss/compile.mjs";

// Terminal packages
import Spinnies from "spinnies";
import chalk from "chalk";

export default class Build {
  constructor(
    { type, files } = {
      type: "assets",
      files: {
        js: [""],
        scss: [""],
      },
    }
  ) {
    this.type = type;
    this.js = {
      files: files.js,
      errors: [],
    };
    this.scss = {
      files: files.scss,
      errors: [],
    };

    // Spinner
    this.spinners = new Spinnies({
      succeedColor: "gray",
      failColor: "white",
    });
  }

  async run() {

    try {
      switch (this.type) {
        case "assets":
          await this.buildAssets();
          break;
        case "js":
          await this.buildJs();
          break;
        case "css":
          await this.buildCss();
          break;
        default:
          throw new Error(`Build type ${this.type} is not supported`);
      }

    } finally {

      const errors = [...this.js.errors, ...this.scss.errors];
      errors?.forEach((error, index) => {
        console.log(`\n${chalk.dim('-').repeat(process.stdout.columns)}\n`);
        console.log(error)

        if (index === errors.length - 1) console.log(`\n`);
      });
    }
  }

  /**
   * Build assets
   */
  async buildAssets() {
    const startTime = this.startSpinner({
      type: "assets",
      text: "Building assets...",
    });

    // Run js and css parallel
    await Promise.all([this.buildJs(), this.buildCss()]);

    this.endSpinner({
      type: "assets",
      startTime,
      text: "building assets",
    });
  }

  /**
   * Bundle js files
   */
  async buildJs() {
    const startTime = this.startSpinner({
      type: "js",
      text: "Bundling JS files...",
      indent: 2,
    });

    const bundleJs = new BundleJs({ input: this.js.files });

    try {
      await bundleJs.run();
    } catch (errors) {
      this.js.errors = errors;
    }

    this.endSpinner({
      type: "js",
      startTime,
      text: "bundling js files",
      errors: this.js.errors,
    });
  }

  /**
   * Compile scss files
   */
  async buildCss() {
    const startTime = this.startSpinner({
      type: "css",
      text: "compiling scss files...",
      indent: 2,
    });

    const compileScss = new CompileScss({ input: this.scss.files });

    try {
      await compileScss.run();
    } catch (errors) {
      this.scss.errors = errors;
    }

    this.endSpinner({
      type: "css",
      startTime,
      text: 'compiling scss files',
      errors: this.scss.errors,
    });
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
