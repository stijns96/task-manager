import Watch from "../methods/watch.mjs";

// Terminal packages
import Spinnies from "spinnies";
import chalk from "chalk";

export default class Dev {
  constructor({ js, scss, tailwind, liquid } = { js: {}, scss: {}, tailwind: {}, liquid: {} }) {
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

    // Tailwind
    this.tailwind = {
      input: tailwind.files,
      output: tailwind.output,
      errors: [],
    };

    // Liquid
    this.liquid = {
      glob: liquid.glob,
      files: liquid.files,
    };


    // Spinner
    this.spinners = new Spinnies({
      succeedColor: "gray",
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
    await Promise.all([this.watchJs(), this.watchScss(), this.watchLiquid()]);
  }

  async watchJs() {
    const watch = new Watch({
      type: "js",
      spinners: this.spinners,
    });
    await watch.run();
  }

  async watchScss() {
    const watch = new Watch({
      type: "scss",
      spinners: this.spinners,
    });
    await watch.run();
  }

  async watchLiquid() {
    const watch = new Watch({
      type: "liquid",
      spinners: this.spinners,
    });
    await watch.run();
  }
}
