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
    this.jsFiles = files.js;
    this.scssFiles = files.scss;

    // Errors
    this.errors = [];

    // Spinner
    this.spinners = new Spinnies({
      succeedColor: "white",
      failColor: "white",
    });
  }

  async run() {
    const startTime = process.hrtime();
    this.spinners.add("build", {
      text: `Building ${this.type}...`,
    });

    try {
      await this[this.type]();

    } finally {
      const endTime = process.hrtime(startTime);
      const time = endTime[0] + endTime[1] / 1e9;

      const spinnerText = this.errors.length > 0 ?
        `Building ${this.type} ${chalk.green("completed")} with ${chalk.red(`${this.errors.length} errors`)} (${chalk.blue(`${time.toFixed(2)}s`)})` :
        `Building ${this.type} ${chalk.green("completed")} (${chalk.blue(`${time.toFixed(2)}s`)})`

      this.spinners.succeed("build", {
        text: spinnerText,
      });

      this.errors?.forEach((error, index) => {
        console.log(`\n${chalk.dim('-').repeat(process.stdout.columns)}\n`);
        console.log(error)

        if (index === this.errors.length - 1) console.log(`\n`);
      });
    }
  }

  /**
   * Build assets
   */
  async assets() {
    await this.js();
    await this.css();
  }

  /**
   * Bundle js files
   */
  async js() {
    const bundleJs = new BundleJs({ input: this.jsFiles });

    try {
      await bundleJs.run();
    } catch (errors) {
      this.errors = [...this.errors, ...errors];
    }
  }

  /**
   * Compile scss files
   */
  async css() {
    const compileScss = new CompileScss({ input: this.scssFiles });

    try {
      await compileScss.run();
    } catch (errors) {
      this.errors = [...this.errors, ...errors];
    }
  }
}
