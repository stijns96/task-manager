// File system packages
import fse from "fs-extra";

// Compilers
import * as sass from "sass";

// PostCSS
import postcss from "postcss";
import autoprefixer from "autoprefixer";
import postcssPresetEnv from "postcss-preset-env";
import tailwind from "tailwindcss";

export default class CompileScss {
  constructor({ files } = { files: [""] }) {
    this.files = files;
  }

  async run() {
    await this.compileFile();
  }

  async compileFile() {
    for (const file of this.files) {
      try {
        const { css } = await sass.compileAsync(file);
        await postcss([
          tailwind(),
          autoprefixer(),
          postcssPresetEnv({ features: { "cascade-layers": false } }),
        ])
          .process(css, { from: file })
          .then(({ css }) => {
            // Create file name based on the directory structure. E.g. sections-files.scss
            const fileName = file
              .replace("src/assets/scss/", "")
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
            fse.outputFile(`theme/assets/${outputFileName}`, layer);
          });
      } catch (error) {
        // console.error(error); // Handle errors appropriately
        throw error;
      }
    }
  }
}
