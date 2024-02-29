import config from "../../../config.mjs";

// File system packages
import fse from "fs-extra";

// Compilers
import * as sass from "sass";

// PostCSS
import postcss from "postcss";
import autoprefixer from "autoprefixer";
import postcssPresetEnv from "postcss-preset-env";
import tailwind from "tailwindcss";
import { globSync } from "glob";

export default class CompileScss {
  constructor({ input }) {
    this.input = input ? [input] : globSync(config.scss.glob.input, config.scss.glob.options);

    console.log(this.input);

    this.errors = [];
  }

  async run() {
    await this.compileFile();
  }

  async compileFile() {
    for (const file of this.input) {
      try {
        // Compile the file
        const { css } = await sass.compileAsync(file);

        // Process the CSS
        await postcss([
          tailwind(),
          autoprefixer(),
          postcssPresetEnv({ features: { "cascade-layers": false } }),
        ])
          .process(css, { from: file })
          .then(({ css }) => {
            // Create file name based on the directory structure. E.g. sections-files.scss
            const fileName = file
              .replace(`${config.src.assetsDir}/scss/`, "")
              .replace("theme/", "")
              .replace(".scss", ".css");

            // Replace slashes with dashes
            const outputFileName = fileName.replace(/\//g, "-");

            // Array of folder names
            const folderNames = file.split("/");

            // Make sure that the actual file name can not be the layer name
            folderNames.pop();

            // Rename snippets to components.
            // If the layer name is empty, use an empty string
            const layerName =
              folderNames[4] === "snippets"
                ? "components"
                : folderNames[4] || "";

            // Create the layer
            const layer = `@layer ${layerName} {\n${css}\n}`;

            // Write the file
            fse.outputFile(`${config.theme.assetsDir}/${outputFileName}`, layer);
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
