import BundleJs from "../methods/bundle-js.mjs";
import CompileScss from "../methods/compile-scss.mjs";

// Terminal packages
import Spinnies from "spinnies";
import chalk from "chalk";

export default class Build {
  constructor() {
    this.spinners = new Spinnies({
      succeedColor: "white",
      failColor: "white",
    });
  }

  async run({ type = "assets" }) {
    const startTime = process.hrtime();
    this.spinners.add("build", {
      text: `Building ${type}...`,
    });

    await this[type]();

    const endTime = process.hrtime(startTime);
    const time = endTime[0] + endTime[1] / 1e9;

    this.spinners.succeed("build", {
      text: `Building ${type} ${chalk.green("completed")} (${chalk.blue(
        `${time.toFixed(2)}s`
      )})`,
    });
  }

  async assets() {
    // Build css and js right here at the same time
    await this.js();
    await this.css();
  }

  async js() {
    const bundleJs = new BundleJs();
    await bundleJs.run();
  }

  async css() {
    const compileScss = new CompileScss();
    await compileScss.run();
  }

  startSpinner(name, text) {
    this.spinners.add(name, {
      text,
    });
    return process.hrtime();
  }
}
