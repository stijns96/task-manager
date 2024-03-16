import { getEnvironment } from "../scripts/envPrompt.mjs";
import { spawn } from 'child_process';

export default class Push {
  constructor() {
  }

  async run(env) {
    await this.push(env);
  }

  async push(env) {
    let environment;

    if (env) {
      environment = env;
    } else {
      const { value: { env: selectedEnv } } = await getEnvironment();
      environment = selectedEnv;
    }

    return new Promise((resolve, reject) => {

      const process = spawn("shopify", [
        "theme",
        "push",
        "--path=theme",
        `-e=${environment}`,
      ], {
        stdio: "inherit"
      })

      process.on('close', (code) => {
        if (code === 0) {
          console.log("\n");
          resolve(); // Push successful
        } else {
          reject(new Error(`Push failed with code: ${code}`)); // Handle error
        }
      });
    });
  }
}