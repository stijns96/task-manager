import { getEnvironment } from "../scripts/envPrompt.mjs";
import { spawn } from 'child_process';

export default class Pull {
  constructor() {
  }

  async run() {
    await this.pull();
  }

  async pull() {
    const { value: { env: selectedEnv } } = await getEnvironment();

    spawn("shopify", [
      "theme",
      "pull",
      "--path=theme",
      `-e=${selectedEnv}`,
    ], {
      stdio: "inherit"
    })

  }
}