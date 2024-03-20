import { spawn } from "child_process";

import getEnvironments from "../utils/getEnvironments.mjs";

export default class Push {
  constructor({ flags }) {
    this.flags = flags;
  }

  async run() {
    const environments = await getEnvironments({
      all: this.flags.all || false,
      environments: this.flags.environments || null,
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
