// JavaScript packages
import { rollup } from "rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";

// File packages
import { globSync } from "glob";

// Terminal packages
import dedent from "dedent";
import chalk from "chalk";
import Spinnies from "spinnies";
import { start } from "repl";

export default class Builder {
  constructor() {
    this.globOptions = { posix: true };

    // Get all files
    this.assetsDir = "src/assets";
    this.jsFiles = globSync(`${this.assetsDir}/js/**/*.js`, this.globOptions);
    this.scssFiles = globSync(`${this.assetsDir}/scss/**/*.scss`, {
      ignore: [
        `${this.assetsDir}/scss/{partials,tailwind}/**`,
        `${this.assetsDir}/scss/**/_*.scss`,
      ],
      ...this.globOptions,
    });

    // Rollup options
    this.rollup = {
      inputOptions: {
        input: this.jsFiles,
        perf: true,
        plugins: [nodeResolve()],
        treeshake: false,
      },
      outputOptionsList: [
        {
          dir: "theme/assets",
        },
      ],
    };

    this.spinners = new Spinnies({
      succeedColor: "white",
      failColor: "white",
    });
  }

  /**
   * Build CSS and JS
   */
  async build() {
    // Build css and js right here at the same time
    const cssPromise = this.buildCss();
    const jsPromise = this.buildJs();

    // // Wait till both are done before ending build
    await Promise.all([cssPromise, jsPromise]);
  }

  /**
   * Build CSS
   */
  async buildCss() {
    const startTime = this.startBuild({
      name: "build-css",
      text: "Building CSS...",
    });

    // Simulate a 2 second wait
    await new Promise((resolve) => setTimeout(resolve, 1000));

    this.endBuild({
      startTime,
      name: "build-css",
      text: "Building CSS complete",
    });
  }

  /**
   * Build JS
   */
  async buildJs() {
    const startTime = this.startBuild({
      name: "build-js",
      text: "Building JS...",
    });

    try {
      const bundle = await rollup(this.rollup.inputOptions);

      await this.generateJsOutputs(bundle);

      await bundle.close();

      this.endBuild({
        startTime,
        name: "build-js",
        text: "Building JS complete",
      });
    } catch (error) {
      this.endBuild({
        startTime,
        name: "build-js",
        text: "Building JS failed",
        fail: true,
      });

      const errorMessage = dedent`
        ${chalk.red(`Bundle error: ${error.message}`)}
        ${error.loc.file.replace(process.cwd(), "")} (${error.loc.line}:${
        error.loc.column
      })
        ${chalk.dim(error.frame)}
      `;
      console.log(errorMessage);
    }
  }

  async generateJsOutputs(bundle) {
    for (const outputOptions of this.rollup.outputOptionsList) {
      await bundle.write(outputOptions);
    }
  }

  startBuild({ name, text }) {
    this.spinners.add(name, { text });
    return process.hrtime();
  }

  endBuild({ startTime, name, text, fail = false }) {
    const endTime = process.hrtime(startTime);
    const time = endTime[0] + endTime[1] / 1e9;

    if (fail) {
      return this.spinners.fail(name, {
        text: `${text} (${time.toFixed(2)}s)`,
      });
    } else {
      return this.spinners.succeed(name, {
        text: `${text} (${time.toFixed(2)}s)`,
      });
    }
  }
}
