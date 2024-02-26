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
    } catch (errors) {
      this.errors = [...this.errors, ...errors];
    } finally {
      const endTime = process.hrtime(startTime);
      const time = endTime[0] + endTime[1] / 1e9;

      const spinnerText = this.errors.length > 0 ?
      `Building ${this.type} ${chalk.green("completed")} with ${chalk.red(`${this.errors.length} errors`)} (${chalk.blue(`${time.toFixed(2)}s`)})` :
      `Building ${this.type} ${chalk.green("completed")} (${chalk.blue(`${time.toFixed(2)}s`)})`

      this.spinners.succeed("build", {
        text: spinnerText,
      });
      
      this.errors?.forEach(error => {
        console.log(`\n${chalk.dim('-').repeat(process.stdout.columns)}\n`);
        console.log(error)
      });
    }
  }

  async assets() {
    // Build css and js right here at the same time
    await this.js();
    await this.css();
  }

  async js() {
    const bundleJs = new BundleJs({ input: this.jsFiles });
    try {
      await bundleJs.run();
    } catch (error) {
      throw error;
    }
  }

  async css() {
    const compileScss = new CompileScss({ input: this.scssFiles });
    try {
      await compileScss.run();
    } catch (error) {
      throw error;
    }
  }
}
