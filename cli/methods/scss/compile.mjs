import config from "../../../config.mjs";
import { pathToFileURL } from 'url';

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
  constructor({ input } = {}) {
    this.input = input ? [input] : globSync(config.assets.scss.glob.input, config.assets.scss.glob.options);

    this.errors = [];
  }

  async run() {
    await this.compileFile();
  }

  async compileFile() {
    for (const file of this.input) {
      try {
        // Compile the file
        const { css } = await sass.compileAsync(file, {
          importers: [{
            // An importer that redirects relative URLs starting with "~" to
            // `node_modules`.
            findFileUrl(url) {
              if (!url.startsWith('~')) return null;
              const baseUrl = pathToFileURL('node_modules/'); // Construct base URL
              const resolvedUrl = new URL(url.substring(1), baseUrl); // Use base URL to resolve
              return resolvedUrl;
            }
          }]
        });


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
