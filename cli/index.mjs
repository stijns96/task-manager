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

    // Src
    this.src = {
      assets: "./src/assets",
      theme: "./theme",
    };

    // JavaScript
    this.jsGlob = `${this.src.assets}/js/**/*.js`;
    this.jsFiles = globSync(this.jsGlob, this.globOptions);
    this.js = {
      glob: this.jsGlob,
      files: this.jsFiles,
    };

    // SCSS
    this.scssGlob = `${this.src.assets}/scss/**/*.scss`;
    this.scssFiles = globSync(this.scssGlob, {
      ignore: [
        `${this.src.assets}/scss/{partials,tailwind}/**`,
        `${this.src.assets}/scss/**/_*.scss`,
      ],
      ...this.globOptions,
    });
    this.scss = {
      glob: this.scssGlob,
      files: this.scssFiles,
    };

    // Tailwind
    this.tailwindGlob = `${this.src.assets}/scss/tailwind/*.scss`;
    this.tailwindFiles = globSync(this.tailwindGlob, this.globOptions);
    this.tailwind = {
      glob: this.tailwindGlob,
      files: this.tailwindFiles,
      output: `${this.src.assets}/scss/tailwind.css`,
    };

    // Liquid
    this.liquidGlob = "src/**/*.liquid";
    this.liquidFiles = globSync(this.liquidGlob, this.globOptions);
    this.liquid = {
      glob: this.liquidGlob,
      files: this.liquidFiles,
      output: this.src.theme,
    };

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
      js: this.js,
      scss: this.scss,
      tailwind: this.tailwind,
      liquid: this.liquid,
    });

    await dev.run();
  }

  /**
   * Build assets
   */
  async build({ type } = {}) {
    const build = new Build({
      type,
      js: this.js,
      scss: this.scss,
      tailwind: this.tailwind,
      liquid: this.liquid,
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
