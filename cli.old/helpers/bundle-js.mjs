import path from "path";

import { rollup } from "rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";

// Terminal Styling
import chalk from "chalk";

async function bundleJs(paths, spinners) {

  const inputOptions = {
    input: paths,
    perf: true,
    plugins: [nodeResolve()],
    treeshake: false
  };

  // see below for details on these options
  let bundle;
  let buildFailed = false;

  try {
    spinners.add('bundle-js', {
      text: `Start bundling`,
    });

    bundle = await rollup(inputOptions);

    await generateOutputs(bundle, spinners);

    spinners.succeed('bundle-js', {
      text: `Bundling complete!`,
    });

  } catch (error) {
    buildFailed = true;
    
    console.log(process.cwd());
    console.log('frame', error.frame);
    console.log('id', error.id);
    console.log('loc', error.loc);
    console.log('message', error.message);

    // [!] RollupError: Expected unicode escape
    // src/js/collapsible.js (8:5)

    spinners.fail('bundle-js', {
      text: `${chalk.red(`Bundle error: ${error.message}`)}
  ${error.loc.file.replace(process.cwd(), "")} (${error.loc.line}:${error.loc.column})
  ${chalk.dim(error.frame)}
  ${chalk.dim(error.stack)}
      `,
    });
  }

  if (bundle) {
    // closes the bundle
    await bundle.close();
  }
}

async function generateOutputs(bundle, spinners) {
  // you can create multiple outputs from the same input to generate e.g.
  // different formats like CommonJS and ESM
  const outputOptionsList = [
    {
      dir: "theme/assets",
    },
  ];

  for (const outputOptions of outputOptionsList) {
    // generate output specific code in-memory
    // you can call this function multiple times on the same bundle object
    // replace bundle.generate with bundle.write to directly write to disk
    const generatedBundle = await bundle.generate(outputOptions);

    // Wacht tot de code is gegenereerd

    await bundle.write(outputOptions);
  }
}

export { bundleJs };
