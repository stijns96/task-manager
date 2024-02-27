// File system packages
import fse from "fs-extra";


export default class CopyLiquid {
  constructor({ input, output } = { input: [""] || "", output: "" }) {
    this.input = typeof input === "string" ? [input] : input;
    this.output = output;

    this.errors = [];
  }

  async run() {
    await this.copyFiles();
  }

  async copyFiles() {
    for (const input of this.input) {
      const to = input.replace("src", this.output);

      try {
        await fse.copy(input, to, {
          preserveTimestamps: true,
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
