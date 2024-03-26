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

    const args = [
      "theme",
      "pull",
      "--path=theme",
      `-e=${Object.keys(environment)[0]}`,
    ];

    if (this.flags.development) args.push("-d");
    if (this.flags.live) args.push("-l");
    if (this.flags.nodelete) args.push("-n");

    spawn("shopify", args, {
      stdio: "inherit",
    });
  }
}
