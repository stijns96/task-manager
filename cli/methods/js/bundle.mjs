import { rollup } from "rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";

import chalk from "chalk";


export default class BundleJs {
  constructor({ input } = { input: [""] || "" }) {
    this.input = input;

    this.bundle;
    this.errors = [];

    this.rollup = {
      inputOptions: {
        input: this.input,
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
  }

  async run() {
    await this.build();
  }

  async build() {
    try {
      this.bundle = await rollup(this.rollup.inputOptions);
      await this.generateOutputs(this.bundle);

    } catch (error) {
      const { frame, id, loc, message, stack } = error;

      const errorMessages = `${chalk.red(`Bundle error:`)} ${message}`;
      const position = `${loc.line}:${loc.column}`;
      const file = loc.file.replace(process.cwd(), "");

      this.errors.push(`${errorMessages} in ${chalk.blue.underline(`${file}:${position}`)}\n\n${frame}\n\n${chalk.dim(stack)}`);


    } finally {
      if (this.bundle) {
        await this.bundle.close();
      }

      if (this.errors.length > 0) {
        throw this.errors;
      }
    }
  }

  async generateOutputs(bundle) {
    for (const outputOptions of this.rollup.outputOptionsList) {
      await bundle.write(outputOptions);
    }
  }
}
