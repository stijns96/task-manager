import config from "../config.mjs";

import BundleJs from "../scripts/js/bundle.mjs";
import CompileScss from "../scripts/scss/compile.mjs";
import CompileTailwind from "../scripts/tailwind/compile.mjs";
import Copy from "../scripts/copy.mjs";

// Terminal packages
import Spinnies from "spinnies";
import chalk from "chalk";

export default class Build {
  constructor({ type } = { type: "all" }) {
    this.type = type;

    this.theme = {
      errors: [],
    };
    this.js = {
      errors: [],
    };
    this.scss = {
      errors: [],
    };
    this.tailwind = {
      errors: [],
    };
    this.public = {
      errors: [],
    };

    // Spinner
    this.spinners = new Spinnies({
      succeedColor: "gray",
      failColor: "white",
    });
  }

  /**
   * Run build
   * @param {string} type - Type of file to build
   * @param {boolean} dev - Development mode
   * @param {string} input - Input file - only used in dev mode
   */
  async run({ type, dev, input } = { type: this.type, dev: false, input: "" }) {
    try {
      switch (type) {
        case "theme":
          await this.buildTheme({ dev, input });
          // Only build tailwind when in dev mode
          if (dev) await this.buildTailwind({ dev });
          break;

        case "js":
          await this.buildJs({ dev, input });
          // Only build tailwind when in dev mode
          if (dev) await this.buildTailwind({ dev });
          break;

        case "css":
          await this.buildCss({ dev, input });
          // Only build tailwind when in *NOT* dev mode.
          if (!dev) await this.buildTailwind({ dev });
          break;

        case "public":
          await this.buildPublic({ dev, input });
          break;

        default:
          await this.buildAll();
          break;
      }
    } finally {
      const errors = [
        ...this.js.errors,
        ...this.scss.errors,
        ...this.tailwind.errors,
      ];
      errors?.forEach((error, index) => {
        console.log(`\n${chalk.dim("-").repeat(process.stdout.columns)}\n`);
        console.log(error);

        if (index === errors.length - 1) console.log(`\n`);
      });
    }
  }

  /**
   * Build all
   */
  async buildAll() {
    const startTime = this.startSpinner({
      type: "all",
      text: "Building all...",
    });

    // Run js and css parallel
    await Promise.all([
      this.buildTheme({ indent: 2 }),
      this.buildPublic({ indent: 2 }),
      this.buildCss({ indent: 2 }),
      this.buildJs({ indent: 2 }),
      this.buildTailwind({ indent: 2 }),
    ]);

    this.endSpinner({
      type: "all",
      startTime,
      text: "building all",
    });
  }

  /**
   * Copy theme files
   */
  async buildTheme({ dev = false, indent = 0 } = {}) {
    const startTime = this.startSpinner({
      type: "theme",
      text: "Copying theme files...",
      indent,
    });

    const copyTheme = new Copy({
      input: config.theme.glob.input,
      globOptions: config.theme.glob.options,
    });

    try {
      // Clear errors when dev mode is enabled
      if (dev) this.theme.errors = [];

      await copyTheme.run();
    } catch (errors) {
      this.theme.errors = errors;
    }

    this.endSpinner({
      type: "theme",
      startTime,
      text: "copying theme files",
    });
  }

  /**
   * Compile scss files
   * @param {boolean} dev - Development mode
   * @param {String} input - Input file - only used in dev mode
   * @param {number} indent - Indentation level in the terminal
   */
  async buildCss({ dev = false, input, indent = 0 } = {}) {
    const startTime = this.startSpinner({
      type: "css",
      text: "compiling scss files...",
      indent,
    });

    const compileScss = new CompileScss({ input });

    try {
      // Clear errors when dev mode is enabled
      if (dev) this.scss.errors = [];

      await compileScss.run();
    } catch (errors) {
      this.scss.errors = errors;
    }

    this.endSpinner({
      type: "css",
      startTime,
      text: "compiling scss files",
      errors: this.scss.errors,
    });
  }

  /**
   * Bundle js files
   * @param {boolean} dev - Development mode
   * @param {String} input - Input file - only used in dev mode
   * @param {number} indent - Indentation level in the terminal
   */
  async buildJs({ dev = false, input, indent = 0 } = {}) {
    const startTime = this.startSpinner({
      type: "js",
      text: "Bundling JS files...",
      indent,
    });

    const bundleJs = new BundleJs({ input });

    try {
      // Clear errors when dev mode is enabled
      if (dev) this.js.errors = [];

      await bundleJs.run();
    } catch (errors) {
      this.js.errors = errors;
    }

    this.endSpinner({
      type: "js",
      startTime,
      text: "bundling js files",
      errors: this.js.errors,
    });
  }

  /**
   * Compile tailwind files
   * @param {boolean} dev - Development mode
   * @param {number} indent - Indentation level in the terminal
   */
  async buildTailwind({ dev = false, indent = 0 }) {
    const startTime = this.startSpinner({
      type: "tailwind",
      text: "compiling tailwind files...",
      indent,
    });

    const compileTailwind = new CompileTailwind();

    try {
      // Clear errors when dev mode is enabled
      if (dev) this.tailwind.errors = [];

      await compileTailwind.run();
    } catch (errors) {
      this.tailwind.errors = errors;
    }

    this.endSpinner({
      type: "tailwind",
      startTime,
      text: "compiling tailwind files",
      errors: this.tailwind.errors,
    });
  }

  /**
   * Copy public files
   */
  async buildPublic({ dev = false, indent = 0 } = {}) {
    const startTime = this.startSpinner({
      type: "public",
      text: "Copying public files...",
      indent,
    });

    const copyPublic = new Copy({
      input: config.assets.public.glob.input,
      globOptions: config.assets.public.glob.options,
    });

    try {
      // Clear errors when dev mode is enabled
      if (dev) this.public.errors = [];

      await copyPublic.run();
    } catch (errors) {
      this.public.errors = errors;
    }

    this.endSpinner({
      type: "public",
      startTime,
      text: "copying public files",
    });
  }

  /**
   * Start spinner
   * @param {string} type - Type of spinner
   * @param {string} text - Text to display
   * @param {number} indent - Indentation
   * @returns {Array} - Start time
   */
  startSpinner({ type, text, indent = 0 }) {
    const startTime = process.hrtime();
    this.spinners.add(`build-${type}`, {
      text,
      indent,
    });

    return startTime;
  }

  /**
   * End spinner
   * @param {string} type - Type of spinner
   * @param {Array} startTime - Start time
   * @param {string} text - Text to display
   * @param {Array} errors - Errors
   */
  endSpinner({ type, startTime, text, errors = [] }) {
    const endTime = process.hrtime(startTime);
    const time = endTime[0] + endTime[1] / 1e9;
    const timeInSeconds = `(${chalk.blue(`${time.toFixed(2)}s`)})`;

    if (errors.length > 0) {
      this.spinners.fail(`build-${type}`, {
        text: `${chalk.red("Failed")} ${text} ${timeInSeconds}`,
      });
    } else {
      this.spinners.succeed(`build-${type}`, {
        text: `${chalk.green("Completed")} ${text} ${timeInSeconds}`,
      });
    }
  }
}
