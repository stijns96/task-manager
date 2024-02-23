import { globSync } from "glob";

export default class CompileScss {
  constructor() {
    this.files = globSync("src/assets/scss/**/*.scss", {
      posix: true,
    });
  }

  async run() {
    await this.compile();
  }

  async compile() {
    await new Promise((resolve) => setTimeout(resolve, 1500));
  }
}
