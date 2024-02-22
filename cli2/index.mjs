import Builder from "./builder/index.mjs";

class CLI {
  constructor() {
    this.builder = new Builder();
    this.build();
  }

  async build() {
    await this.builder.build();
  }
}

new CLI();
