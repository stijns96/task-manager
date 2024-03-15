import { getEnvironment } from "../scripts/envPrompt.mjs";
import { spawn } from 'child_process';

export default class Push {
  constructor() {
  }

  async run() {
    await this.push();
  }

  async push() {
    const { value: { env } } = await getEnvironment()

    spawn("shopify", [
      "theme",
      "push",
      "--path=theme",
      `-e=${env}`,
    ], {
      stdio: "inherit"
    })
  }
}