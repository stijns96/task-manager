import { rollup } from "rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";

// Terminal Styling
import chalk from "chalk";

async function bundleJs(paths, spinners) {
  // spinners.add(path, {
  //   text: `Compiling ${path}...`,
  // });

  const inputOptions = {
    input: paths,
    plugins: [nodeResolve()],
    treeshake: false,
  };

  // see below for details on these options
  let bundle;
  let buildFailed = false;

  try {
    bundle = await rollup(inputOptions);

    await generateOutputs(bundle);

    // spinners.succeed(path, {
    //   text: `${chalk.green("Compiled")} ${chalk.blueBright(
    //     path
    //   )} ➔  ${chalk.blue(to)}`,
    // });
  } catch (error) {
    buildFailed = true;
    // do some error reporting
    console.error(error);

    // spinners.fail(path, {
    //   text: `${chalk.red("Error")} compiling ${chalk.blueBright(path)}: ${
    //     error.message
    //   }`,
    // });
  }

  if (bundle) {
    // closes the bundle
    await bundle.close();
  }

  // process.exit(buildFailed ? 1 : 0);
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

export { bundleJs };
