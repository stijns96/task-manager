import { envPrompt } from "../scripts/envPrompt.mjs";
import fse from "fs-extra";
import TOML from "@iarna/toml";
import { spawn } from "child_process";

export default class Push {
  constructor({ options }) {
    this.options = options;

    this.all = options.all || false;
  }

  async run() {
    const environments = await this.getEnvironments();

    for (const env of environments) {
      try {
        // Await the completion of the spawn process for each environment
        await new Promise((resolve, reject) => {
          const process = spawn(
            "shopify",
            ["theme", "push", "--path=theme", `-e=${env}`],
            {
              stdio: "inherit",
            },
          );

          process.on("close", (code) => {
            code === 0
              ? resolve()
              : reject(new Error(`Push failed with code: ${code}`));
          });
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  async getEnvironments() {
    if (this.options.environments) return this.options.environments;

    const tomlFile = fse.readFileSync("./shopify.theme.toml", "utf-8");
    const { environments } = TOML.parse(tomlFile);

    if (this.all) return Object.keys(environments);

    const {
      value: { env },
    } = await envPrompt();

    return [env];
  }
}
