// File system packages
import fse from "fs-extra";
import { globSync } from "glob";

// Compilers
import * as sass from "sass";

// PostCSS
import postcss from "postcss";
import autoprefixer from "autoprefixer";
import postcssPresetEnv from "postcss-preset-env";
import tailwind from "tailwindcss";

export default class CompileScss {
  constructor() {
    this.files = globSync("src/assets/scss/**/*.scss", {
      ignore: [
        "src/assets/scss/{partials,tailwind}/**",
        "src/assets/scss/**/_*.scss",
      ],
      posix: true,
    });
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
            const outputFileName = fileName.replace(/\//g, "-");
            const outputFile = `theme/assets/${outputFileName}`;

            // Write the file
            fse.outputFile(outputFile, css);
          });
      } catch (error) {
        console.error(error); // Handle errors appropriately
      }
    }
  }
}
