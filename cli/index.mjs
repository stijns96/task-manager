import Dev from "./commands/dev.mjs";
import Build from "./commands/build.mjs";
import Clean from "./commands/clean.mjs";
import Push from "./commands/push.mjs";
import OpenAdmins from "./commands/openAdmins.mjs";

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
      push: this.argv.push || false,
      openAdmins: this.argv.openAdmins || false,
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
    this.args.push && this.push();
    this.args.openAdmins && this.openAdmins();
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

  /**
   * Push to Shopify
   */
  async push() {
    const push = new Push();

    await push.run();
  }

  /**
   * Open Shopify admins
   */
  async openAdmins() {
    const openAdmins = new OpenAdmins();

    await openAdmins.run();
  }
}

new CLI();
