import Push from './push.mjs';
import fse from "fs-extra";
import TOML from "@iarna/toml";
import { spawn } from 'child_process';

export default class PushAll extends Push {
  constructor() {
    super();

    this.tomlFile = fse.readFileSync("./shopify.theme.toml", "utf-8");
    this.environments = TOML.parse(this.tomlFile).environments;
  }

  async run() {
    for (const [env] of Object.entries(this.environments)) {
      try {
        await super.run(env); // Await for each task to complete
        console.log(`Pushed to ${env}`);
      } catch (error) {
        console.error(`Error pushing to ${env}:`, error);
      }
    }
  }
}