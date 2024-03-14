import { spawn } from 'child_process';
import fse from "fs-extra";

import prompts from "prompts";

import TOML from "@iarna/toml";

import Watch from "../scripts/watch.mjs";

// Terminal packages
import Spinnies from "spinnies";
import chalk from "chalk";
import config from "../config.mjs";

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

    this.startShopifyServer();
  }

  async watch() {
    // load parallel
    await Promise.all([this.watchTheme(), this.watchJs(), this.watchScss(), this.watchPublic()]);
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
    console.log("Starting Shopify server... \n");

    const tomlFile = fse.readFileSync("./shopify.theme.toml", "utf-8");
    const { environments } = TOML.parse(tomlFile);

    const choices = Object.entries(environments).map(([env, options]) => {
      return {
        title: `${env} - ${options.store}`,
        value: env,
      };
    });

    const selectedEnv = await prompts({
      type: 'select',
      name: 'value',
      message: 'Select environment:',
      choices
    });

    spawn("shopify", [
      "theme",
      "dev",
      "--open",
      "--path=theme",
      `-e=${selectedEnv.value}`,
    ], {
      stdio: "inherit"
    })
  }
}
