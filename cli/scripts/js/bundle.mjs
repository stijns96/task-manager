import config from "../../config.mjs";
import { rollup } from "rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { ESLint } from 'eslint';
import { globSync } from "glob";

export default class BundleJs {
  constructor({ input } = {}) {
    this.input = input ? [input] : globSync(config.assets.js.glob.input, config.assets.js.glob.options);

    this.eslintInstance = new ESLint({ useEslintrc: true, fix: true });
    this.bundle;
    this.errors = [];

    this.rollup = {
      inputOptions: {
        input: this.input,
        perf: true,
        plugins: [nodeResolve()],
        treeshake: false,
      },
      outputOptions: {
        dir: config.theme.assetsDir,
      },
    };
  }

  async run() {
    await this.build();
  }

  async build() {
    try {
      await this.lintFiles();

      this.bundle = await rollup(this.rollup.inputOptions);
      await this.bundle.write(this.rollup.outputOptions);

    } finally {
      if (this.bundle) {
        await this.bundle.close();
      }

      if (this.errors.length > 0) {
        // eslint-disable-next-line no-unsafe-finally
        throw this.errors;
      }
    }
  }

  // Lint the specified files and return the results
  async lintAndFix(eslint, filePaths) {
    const results = await eslint.lintFiles(filePaths);

    // Apply automatic fixes and output fixed code
    await ESLint.outputFixes(results);

    return results;
  }

  // Log results to console if there are any problems
  async outputLintingResults(results) {
    // Identify the number of problems found
    const problems = results.reduce((acc, result) => acc + result.errorCount + result.warningCount, 0);

    if (problems > 0) {
      const eslintFormatter = await this.eslintInstance.loadFormatter("stylish");
      const output = await eslintFormatter.format(results);

      if (!output) return;

      this.errors.push(output);
    }

    return results;
  }

  // Put previous functions all together
  async lintFiles() {
    const results = await this.lintAndFix(this.eslintInstance, this.input);
    return this.outputLintingResults(results);
  }
}
