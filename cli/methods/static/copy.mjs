// File system packages
import fse from "fs-extra";
import { globSync } from "glob";
import config from "../../../config.mjs";


export default class CopyStatic {
  constructor({ input } = {}) {
    this.input = input ? [input] : globSync(config.static.glob.input, config.static.glob.options);

    this.errors = [];
  }

  async run() {
    await this.copyFiles();
  }

  async copyFiles() {
    for (const input of this.input) {
      // Get the file name
      const fileName = input.split('/').pop();

      const to = input.startsWith(config.src.assetsDir)
        // Copy the file to theme/assets
        ? `${config.theme.assetsDir}/${fileName}`
        // Copy the file to e.g. theme/layout
        : input.replace(config.src.root, config.theme.root);

      try {
        await fse.copy(input, to, {
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
