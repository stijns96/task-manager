// File system packages
import fse from "fs-extra";
import { globSync } from "glob";

import config from "../../config.mjs";
import compileScss from "../../utils/compileScss.mjs";

export default class CompileTailwind {
  constructor() {
    this.inputs = globSync(
      config.assets.tailwind.glob.input,
      config.assets.tailwind.glob.options,
    );

    this.errors = [];
  }

  async run() {
    await this.compileFile();
  }

  async compileFile() {
    try {
      // Store the promises in an array to await them later so they run concurrently
      const promises = this.inputs.reverse().map(async (file) => {
        const layerName = file.split("/").pop().replace(".scss", "");
        const purge = layerName !== "base";

        const css = await compileScss({ file, purge });

        const layer = `@layer ${layerName} {
          ${css}
        }\n`;

        // Schrijf de gecombineerde inhoud naar een uitvoerbestand
        fse.outputFileSync(
          `${config.theme.assetsDir}/main-${layerName}.css`,
          layer,
        );
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
