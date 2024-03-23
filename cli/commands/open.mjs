import { spawn, spawnSync } from "child_process";
import getEnvironments from "../utils/getEnvironments.mjs";

export default class Open {
  constructor({ flags }) {
    this.flags = flags;
  }

  async run() {
    if (!this.flags.admins) return;

    const environments = await getEnvironments({
      all: true,
    });

    for (const key in environments) {
      const { store } = environments[key];

      spawn("open", [`https://admin.shopify.com/store/${store}/themes`]);
    }
  }
}
