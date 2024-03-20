import { spawn } from "child_process";

import getEnvironments from "../utils/getEnvironments.mjs";

export default class Push {
  constructor({ options }) {
    this.options = options;

    this.all = options.all || false;
  }

  async run() {
    // Gebruik de functie
    const environments = await getEnvironments({
      all: this.all,
      environments: this.options.environments,
    });

    for (const env of environments) {
      try {
        // Await the completion of the spawn process for each environment
        await new Promise((resolve, reject) => {
          console.log(`\n`);
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
}
