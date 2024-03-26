// File system packages
import fse from "fs-extra";
import { globSync } from "glob";
import config from "../config.mjs";

export default class Copy {
  constructor({ input, globOptions } = {}) {
    this.inputs = globSync(input, globOptions);

    this.errors = [];
  }

  async run() {
    await this.copyFiles();
  }

  async copyFiles() {
    try {
      // Store the promises in an array to await them later so they run concurrently
      const promises = this.inputs.map(async (file) => {
        // Get the file name
        const fileName = file.split("/").pop();

        const to = file.startsWith(config.src.assetsDir)
          ? // Copy the file to theme/assets
            `${config.theme.assetsDir}/${fileName}`
          : // Copy the file to e.g. theme/layout
            file.replace(config.src.root, config.theme.root);

        fse.copySync(file, to, {
          preserveTimestamps: true,
        });
      });

      // Await all promises
      await Promise.all(promises);
    } catch (error) {
      this.errors.push(error);
    }

    if (this.errors.length > 0) {
      throw this.errors;
    }
  }
}
