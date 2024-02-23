import { rollup } from "rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";

import { globSync } from "glob";

export default class BundleJs {
  constructor() {
    this.files = globSync("src/assets/js/**/*.js", {
      posix: true,
    });

    this.rollup = {
      inputOptions: {
        input: this.files,
        perf: true,
        plugins: [nodeResolve()],
        treeshake: false,
      },
      outputOptionsList: [
        {
          dir: "theme/assets",
        },
      ],
    };
  }

  async run() {
    await this.buildJs();
    await new Promise((resolve) => setTimeout(resolve, 1500));
  }

  async buildJs() {
    // see below for details on these options
    let bundle;
    let buildFailed = false;

    try {
      bundle = await rollup(this.rollup.inputOptions);

      await this.generateOutputs(bundle);
    } catch (error) {
      buildFailed = true;
    }

    if (bundle) {
      // closes the bundle
      await bundle.close();
    }
  }

  async generateOutputs(bundle) {
    for (const outputOptions of this.rollup.outputOptionsList) {
      // generate output specific code in-memory
      // you can call this function multiple times on the same bundle object
      // replace bundle.generate with bundle.write to directly write to disk
      await bundle.write(outputOptions);
    }
  }
}
