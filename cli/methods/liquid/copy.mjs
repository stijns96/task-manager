// File system packages
import fse from "fs-extra";
import { globSync } from "glob";
import config from "../../../config.mjs";


export default class CopyLiquid {
  constructor({ input, output } = { input: "", output: "" }) {
    this.input = input || globSync(config.liquid.glob.input, config.liquid.glob.options);
    this.output = output;

    this.errors = [];
  }

  async run() {
    await this.copyFiles();
  }

  async copyFiles() {
    for (const input of this.input) {
      const to = input.replace("src", config.theme.root);

      console.log("input", input);
      console.log("to", to);

      try {
        fse.copy(input, to, {
          preserveTimestamps: true,
        });

      } catch (error) {
        this.errors.push(error);
      }
    }

    if (this.errors.length > 0) {
      throw this.errors;
    }
  }
}
