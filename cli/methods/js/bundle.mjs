import { rollup } from "rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default class BundleJs {
  constructor({ input } = { input: [""] || "" }) {
    this.input = input;

    this.bundle;

    this.rollup = {
      inputOptions: {
        input: this.input,
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
    await this.build();
  }

  async build() {
    try {
      this.bundle = await rollup(this.rollup.inputOptions);
      await this.generateOutputs(this.bundle);
    } catch (error) {
      throw error;
    }

    if (this.bundle) {
      // closes the bundle
      await this.bundle.close();
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
