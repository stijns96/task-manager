import Dev from "./commands/dev.mjs";
import Build from "./commands/build.mjs";
import Clean from "./commands/clean.mjs";

// Terminal packages
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";

class CLI {
  constructor() {
    this.argv = yargs(hideBin(process.argv)).argv;

    this.args = {
      dev: this.argv.dev || false,
      build: this.argv.build || false,
      clean: this.argv.clean || false,
    };

    this.args.dev && this.dev();
    this.args.build && this.build({ type: this.args.build });
    this.args.clean && this.clean({ type: this.args.clean });
  }

  /**
   * Run development
   */
  async dev() {
    const dev = new Dev();

    await dev.run();
  }

  /**
   * Build assets
   */
  async build({ type } = {}) {
    const build = new Build();

    // Clean assets before building
    await this.clean({ type });

    await build.run({ type });
  }

  /**
   * Clean assets
   */
  async clean({ type } = {}) {
    const clean = new Clean();

    await clean.run({ type });
  }
}

new CLI();
