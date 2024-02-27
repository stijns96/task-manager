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
import purgecss from "@fullhuman/postcss-purgecss";

export default class CompileTailwind {
  constructor({ input, output } = { input: [""] || "", output: "" }) {
    this.inputs = globSync('./src/assets/scss/tailwind/*.scss', { posix: true });

    this.errors = [];
  }

  async run() {
    await this.compileFile();
  }

  async compileFile() {
    try {
      let combinedContent = "";

      for (const input of this.inputs.reverse()) {
        const layerName = input.split("/").pop().replace(".scss", "");
        const { css } = sass.compile(input);

        const postcssPlugins = [
          tailwind,
          autoprefixer,
          postcssPresetEnv(),
        ];

        // Add purgecss if layerName is not base
        if (layerName !== "base") {
          postcssPlugins.push(purgecss({
            content: ["./src/**/*.js", "./src/**/*.liquid"],
          }));
        }

        const result = await postcss(postcssPlugins).process(css, {
          from: input,
        });

        if (result.css) {
          const layer = `@layer ${layerName} {
            ${result.css}
          }\n`;

          // Voeg de inhoud toe aan de gecombineerde inhoud
          combinedContent += layer;
        }
      }

      // Schrijf de gecombineerde inhoud naar een uitvoerbestand
      fse.outputFileSync(`./theme/assets/main.css`, combinedContent);
    } catch (error) {
      this.errors.push(error);
    }

    if (this.errors.length > 0) {
      throw this.errors;
    }
  }
}
