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
    this.argv = yargs(hideBin(process.argv)).argv;

    this.args = {
      dev: this.argv.dev || false,
      build: this.argv.build || false,
      clean: this.argv.clean || false,
    };

    // Glob
    this.globOptions = {
      posix: true,
    };

    this.jsFiles = globSync("src/assets/js/**/*.js", this.globOptions);
    this.scssFiles = globSync("src/assets/scss/**/*.scss", {
      ignore: [
        "src/assets/scss/{partials,tailwind}/**",
        "src/assets/scss/**/_*.scss",
      ],
      ...this.globOptions,
    });

    this.run();
  }

  run() {
    this.args.dev && this.dev();
    this.args.build && this.build({ type: this.args.build });
    this.args.clean && this.clean({ type: this.args.clean });
  }

  /**
   * Run development
   */
  async dev() {
    const dev = new Dev({
      files: {
        js: this.jsFiles,
        scss: this.scssFiles,
      },
    });

    await dev.run();
  }

  /**
   * Build assets
   */
  async build({ type } = {}) {
    const build = new Build({
      type,
      files: {
        js: this.jsFiles,
        scss: this.scssFiles,
      },
    });

    // Clean assets before building
    await this.clean({ type });

    await build.run();
  }

  /**
   * Clean assets
   */
  async clean({ type } = {}) {
    const clean = new Clean({ type });

    await clean.run();
  }
}

new CLI();
