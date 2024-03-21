import { spawn } from "child_process";
import getEnvironments from "../utils/getEnvironments.mjs";

export default class Pull {
  constructor({ flags }) {
    this.flags = flags;
  }

  async run() {
    const environment = await getEnvironments({
      environments: this.flags.environment || null,
    });

    spawn("shopify", ["theme", "pull", "--path=theme", `-e=${environment}`], {
      stdio: "inherit",
    });
  }
}
