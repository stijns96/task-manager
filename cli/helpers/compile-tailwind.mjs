import fse from "fs-extra";

// Terminal Styling
import chalk from "chalk";

// Compilers
import * as sass from "sass";

// PostCSS
import postcss from "postcss";
import autoprefixer from "autoprefixer";
import postcssPresetEnv from "postcss-preset-env";
import tailwind from "tailwindcss";

export async function compileTailwind(paths, spinners) {
  // spinners.add(paths, {
  //   text: `Compiling ${paths}...`,
  // });

  try {
    let combinedContent = "";

    for (const path of paths.reverse()) {
      const layerName = path.split("/").pop().replace(".scss", "");
      const { css } = sass.compile(path);

      const result = await postcss([
        tailwind,
        autoprefixer,
        postcssPresetEnv(),
      ]).process(css, {
        from: path,
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
    fse.outputFileSync(`theme/assets/main.css`, combinedContent);

    // console.log(`Bestanden zijn samengevoegd naar ${outputFileName}`);
  } catch (error) {}
}
