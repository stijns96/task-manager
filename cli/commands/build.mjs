import BundleJs from "../methods/js/bundle.mjs";
import CompileScss from "../methods/scss/compile.mjs";
import CompileTailwind from "../methods/tailwind/compile.mjs";
import CopyLiquid from "../methods/liquid/copy.mjs";

// Terminal packages
import Spinnies from "spinnies";
import chalk from "chalk";

export default class Build {
  constructor(
    { type, js, scss, tailwind, liquid } = {
      type: "assets",
      js: {},
      scss: {},
      tailwind: {},
      liquid: {},
    }
  ) {
    this.type = type;
    this.js = {
      input: js.files,
      errors: [],
    };
    this.scss = {
      input: scss.files,
      errors: [],
    };
    this.tailwind = {
      input: tailwind.files,
      output: tailwind.output,
      errors: [],
    };

    this.liquid = {
      input: liquid.files,
      output: liquid.output,
      errors: [],
    };

    // Spinner
    this.spinners = new Spinnies({
      succeedColor: "gray",
      failColor: "white",
    });
  }

  async run({ type = this.type, dev = false, input } = {}) {

    try {
      switch (type) {
        case "assets":
          await this.buildAssets({ dev, input });
          break;
        case "js":
          await this.buildJs({ dev, input });
          if (dev) await this.buildTailwind({ dev });
          break;
        case "css":
          await this.buildCss({ dev, input });
          if (!dev) await this.buildTailwind({ dev });
          break;
        case "liquid":
          await this.buildLiquid({ dev });
          if (dev) await this.buildTailwind({ dev });
          break;
        default:
          throw new Error(`Build type ${this.type} is not supported`);
      }

    } finally {

      const errors = [...this.js.errors, ...this.scss.errors, ...this.tailwind.errors];
      errors?.forEach((error, index) => {
        console.log(`\n${chalk.dim('-').repeat(process.stdout.columns)}\n`);
        console.log(error)

        if (index === errors.length - 1) console.log(`\n`);
      });
    }
  }

  /**
   * Build assets
   */
  async buildAssets() {
    const startTime = this.startSpinner({
      type: "assets",
      text: "Building assets...",
    });

    // Run js and css parallel
    await Promise.all([
      this.buildJs({ indent: 2 }),
      this.buildCss({ indent: 2 }),
      this.buildTailwind({ indent: 2 }),
      this.buildLiquid({ indent: 2 }),
    ]);

    this.endSpinner({
      type: "assets",
      startTime,
      text: "building assets",
    });
  }

  /**
   * Bundle js files
   */
  async buildJs({ dev = false, input = this.js.input, indent = 0 } = {}) {
    const startTime = this.startSpinner({
      type: "js",
      text: "Bundling JS files...",
      indent
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
   * Compile scss files
   */
  async buildCss({ dev = false, input = this.scss.input, indent = 0 } = {}) {
    const startTime = this.startSpinner({
      type: "css",
      text: "compiling scss files...",
      indent
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
      text: 'compiling scss files',
      errors: this.scss.errors,
    });
  }

  /**
   * Compile tailwind files
   */
  async buildTailwind({ dev = false, indent = 0 }) {
    const startTime = this.startSpinner({
      type: "tailwind",
      text: "compiling tailwind files...",
      indent
    });

    const compileTailwind = new CompileTailwind({
      input: this.tailwind.input,
      output: this.tailwind.output
    });

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
   * Copy liquid files
   */
  async buildLiquid({ dev = false, indent = 0 } = {}) {
    const startTime = this.startSpinner({
      type: "liquid",
      text: "Copying liquid files...",
      indent
    });

    const copyLiquid = new CopyLiquid({
      input: this.liquid.input,
      output: this.liquid.output
    });

    try {
      // Clear errors when dev mode is enabled
      if (dev) this.liquid.errors = [];

      await copyLiquid.run();
    } catch (errors) {
      this.liquid.errors = errors;
    }

    this.endSpinner({
      type: "liquid",
      startTime,
      text: "copying liquid files",
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
