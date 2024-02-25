import WatchJs from "../methods/js/watch.mjs";
import CompileScss from "../methods/scss/compile.mjs";

// Terminal packages
import Spinnies from "spinnies";
import chalk from "chalk";

export default class Dev {
  constructor(
    { files } = {
      files: {
        js: [""],
        scss: [""],
      },
    }
  ) {
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
    this.spinners.add("dev", {
      text: `Starting development...`,
    });

    this.watch();

    const endTime = process.hrtime(startTime);
    const time = endTime[0] + endTime[1] / 1e9;

    this.spinners.succeed("dev", {
      text: `Development started (${chalk.blue(`${time.toFixed(2)}s`)})`,
    });
  }

  async assets() {
    // Build css and js right here at the same time
    await this.js();
    await this.css();
  }

  watch() {
    this.WatchJs();
  }

  async WatchJs() {
    const watchJs = new WatchJs({ files: this.jsFiles });
    watchJs.run();
  }

  async css() {
    const compileScss = new CompileScss({ files: this.scssFiles });
    try {
      await compileScss.run();
    } catch (error) {
      throw error;
    }
  }
}
