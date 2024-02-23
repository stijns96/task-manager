import BundleJs from "../methods/bundle-js.mjs";
import CompileScss from "../methods/compile-scss.mjs";

// Terminal packages
import Spinnies from "spinnies";

export default class Build {
  constructor() {
    this.spinners = new Spinnies({
      succeedColor: "white",
      failColor: "white",
    });
  }

  async run({ type = "assets" }) {
    await this[type]();
  }

  async assets() {
    // Build css and js right here at the same time
    this.js();
    this.css();
  }

  async js() {
    const startTime = this.startSpinner("bundle-js", "Bundling JS...");
    const bundleJs = new BundleJs();

    await bundleJs.run();

    this.endSpinner("bundle-js", "Bundling JS completed", startTime);
  }

  async css() {
    const startTime = this.startSpinner("compile-scss", "Compiling SCSS...");

    const compileScss = new CompileScss();

    await compileScss.run();

    this.endSpinner("compile-scss", "Compiling SCSS completed", startTime);
  }

  startSpinner(name, text) {
    this.spinners.add(name, {
      text,
    });
    return process.hrtime();
  }

  endSpinner(name, text, startTime) {
    const endTime = process.hrtime(startTime);
    const time = endTime[0] + endTime[1] / 1e9;

    this.spinners.succeed(name, {
      text: `${text} (${time.toFixed(2)}s)`,
    });
  }
}
