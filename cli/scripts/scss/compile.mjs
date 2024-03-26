// File system packages
import fse from "fs-extra";
import { globSync } from "glob";

import config from "../../config.mjs";
import compileScss from "../../utils/compileScss.mjs";

export default class CompileScss {
  constructor({ input } = {}) {
    this.input = input
      ? [input]
      : globSync(
          config.assets.scss.glob.input,
          config.assets.scss.glob.options,
        );

    this.errors = [];
  }

  async run() {
    await this.compileFile();
  }

  async compileFile() {
    for (const file of this.input) {
      try {
        const css = await compileScss({ file });

        // Create file name based on the directory structure. E.g. sections-files.scss
        const fileName = file
          .replace(`${config.src.assetsDir}/scss/`, "")
          .split("/")
          .join("-")
          .replace(".scss", ".css");

        // Array of folder names
        const folderNames = file.split("/");

        // Make sure that the actual file name can not be the layer name
        folderNames.pop();

        // Rename snippets to components.
        // If the layer name is empty, use an empty string
        const layerName =
          folderNames[4] === "snippets" ? "components" : folderNames[4] || "";

        // Create the layer
        const layer = `@layer ${layerName} {\n${css}\n}`;

        const data = layerName ? layer : css;

        // Write the file
        fse.outputFile(`${config.theme.assetsDir}/${fileName}`, data);
      } catch (error) {
        this.errors.push(error);
      }
    }

    if (this.errors.length > 0) {
      throw this.errors;
    }
  }
}
