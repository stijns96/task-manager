import Watch from "../methods/watch.mjs";

// Terminal packages
import Spinnies from "spinnies";
import chalk from "chalk";

export default class Dev {
  constructor({ js, scss } = { js: {}, scss: {} }) {
    // JavaScript files
    this.js = {
      glob: js.glob,
      files: js.files,
    };

    // SCSS files
    this.scss = {
      glob: scss.glob,
      files: scss.files,
    };

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

    await this.watch();

    const endTime = process.hrtime(startTime);
    const time = endTime[0] + endTime[1] / 1e9;

    this.spinners.succeed("dev", {
      text: `Development started (${chalk.blue(`${time.toFixed(2)}s`)})`,
    });
  }

  async watch() {
    // load parallel
    await Promise.all([this.watchJs(), this.watchScss()]);
  }

  async watchJs() {
    const watchJs = new Watch({
      type: "js",
      glob: this.js.glob,
      spinners: this.spinners,
    });
    await watchJs.run();
  }

  async watchScss() {
    const watchScss = new Watch({
      type: "scss",
      glob: this.scss.glob,
      spinners: this.spinners,
    });
    await watchScss.run();
  }
}
