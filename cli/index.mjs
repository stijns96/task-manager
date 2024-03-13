import Dev from "./bin/dev.mjs";
import Build from "./bin/build.mjs";
import Clean from "./bin/clean.mjs";

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
    this.args.build && this.build();
    this.args.clean && this.clean();
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
  async build() {
    const build = new Build();

    // Clean assets before building
    await this.clean();

    await build.run();
  }

  /**
   * Clean assets
   */
  async clean() {
    const clean = new Clean();

    await clean.run();
  }
}

new CLI();
