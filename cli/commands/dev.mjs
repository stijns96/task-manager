import { spawn } from "child_process";

import getEnvironments from "../utils/getEnvironments.mjs";

import Watch from "../scripts/watch.mjs";

// Terminal packages
import Spinnies from "spinnies";
import chalk from "chalk";
import config from "../config.mjs";

export default class Dev {
  constructor({ flags }) {
    this.flags = flags;

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

    this.startShopifyServer();
  }

  async watch() {
    // load parallel
    await Promise.all([
      this.watchTheme(),
      this.watchJs(),
      this.watchScss(),
      this.watchPublic(),
    ]);
  }

  async watchTheme() {
    const watch = new Watch({
      type: "theme",
      glob: config.theme.glob.input,
      spinners: this.spinners,
    });
    await watch.run();
  }

  async watchJs() {
    const watch = new Watch({
      type: "js",
      glob: config.assets.js.glob.input,
      spinners: this.spinners,
    });
    await watch.run();
  }

  async watchScss() {
    const watch = new Watch({
      type: "scss",
      glob: config.assets.scss.glob.input,
      spinners: this.spinners,
    });
    await watch.run();
  }

  async watchPublic() {
    const watch = new Watch({
      type: "public",
      glob: config.assets.public.glob.input,
      spinners: this.spinners,
    });
    await watch.run();
  }

  async startShopifyServer() {
    console.log(`\n`);

    const environment = await getEnvironments({
      environments: this.flags.environment || null,
    });

    const key = Object.keys(environment)[0];

    spawn(
      "shopify",
      [
        "theme",
        "dev",
        "--open",
        "--path=theme",
        "--theme-editor-sync",
        `-e=${key}`,
      ],
      {
        stdio: "inherit",
      },
    );
  }
}
