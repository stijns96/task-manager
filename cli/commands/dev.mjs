import Watch from "../methods/watch.mjs";

// Terminal packages
import Spinnies from "spinnies";
import chalk from "chalk";

export default class Dev {
  constructor() {
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
    await Promise.all([this.watchJs(), this.watchScss(), this.watchStatic()]);
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

  async watchStatic() {
    const watch = new Watch({
      type: "static",
      spinners: this.spinners,
    });
    await watch.run();
  }
}
