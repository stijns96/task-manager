import { spawn, spawnSync } from "child_process";
import getEnvironments from "../utils/getEnvironments.mjs";

export default class Open {
  constructor({ flags }) {
    this.flags = flags;
  }

  async run() {
    const environments = await getEnvironments({
      all: this.flags.all || false,
      environments: this.flags.environments || null,
    });

    for (const key in environments) {
      const environment = key;
      const { store } = environments[key];

      try {
        // Await the completion of the spawn process for each environment
        await new Promise((resolve, reject) => {
          console.log(`\n`);
          try {
            spawnSync("shopify", ["theme", "open", `-e=${environment}`], {
              stdio: "inherit",
            });

            resolve();
          } catch (error) {
            reject(new Error(`Open failed with code: ${error}`));
          } finally {
            if (this.flags.admin) {
              spawn("open", [
                `https://admin.shopify.com/store/${store}/themes`,
              ]);
            }
          }
        });
      } catch (error) {
        console.error(error);
      }
    }
  }
}
