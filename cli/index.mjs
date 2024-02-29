import Dev from "./commands/dev.mjs";
import Build from "./commands/build.mjs";
import Clean from "./commands/clean.mjs";

// File system packages
import { globSync } from "glob";

// Terminal packages
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";

class CLI {
  constructor() {
    // Get arguments from the command line
    this.argv = yargs(hideBin(process.argv)).argv;

    // Set arguments to an object
    this.args = {
      dev: this.argv.dev || false,
      build: this.argv.build || false,
      clean: this.argv.clean || false,
    };

    this.run();
  }

  /**
   * Run the CLI
   */
  run() {
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
   * @param {string} type - Type of file to build
   */
  async build({ type }) {
    const build = new Build({ type });

    // Clean assets before building
    await this.clean({ type });

    await build.run();
  }

  /**
   * Clean assets
   * @param {string} type - Type of file to clean
   */
  async clean({ type }) {
    const clean = new Clean({ type });

    await clean.run();
  }
}

new CLI();
