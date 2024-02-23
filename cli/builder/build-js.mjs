import { rollup } from "rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";

import { globSync } from "glob";

async function buildJs() {
  const files = globSync("src/assets/js/**/*.js", {
    posix: true,
  });

  const inputOptions = {
    input: files,
    perf: true,
    plugins: [nodeResolve()],
    treeshake: false,
  };

  // see below for details on these options
  let bundle;
  let buildFailed = false;

  try {
    bundle = await rollup(inputOptions);

    await generateOutputs(bundle);
  } catch (error) {
    buildFailed = true;
  }

  if (bundle) {
    // closes the bundle
    await bundle.close();
  }
}

async function generateOutputs(bundle) {
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

export { buildJs };
