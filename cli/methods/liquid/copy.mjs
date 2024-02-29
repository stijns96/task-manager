// File system packages
import fse from "fs-extra";
import { globSync } from "glob";
import config from "../../../config.mjs";


export default class CopyLiquid {
  constructor({ input } = {}) {
    this.input = input ? [input] : globSync(config.liquid.glob.input, config.liquid.glob.options);

    this.errors = [];
  }

  async run() {
    await this.copyFiles();
  }

  async copyFiles() {
    for (const input of this.input) {
      const to = input.replace(config.src.root, config.theme.root);

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
