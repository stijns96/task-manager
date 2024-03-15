import fse from "fs-extra";
import TOML from "@iarna/toml";
import { spawn } from 'child_process';

export default class OpenAdmins {
  constructor() {
    this.tomlFile = fse.readFileSync("./shopify.theme.toml", "utf-8");
    this.environments = TOML.parse(this.tomlFile).environments;
  }

  async run() {
    await this.openAdmins();
  }

  async openAdmins() {
    Object.entries(this.environments).forEach(([env, options]) => {
      console.log(`Opening Shopify admin for ${env} - ${options.store}`);
      spawn("open", [`https://admin.shopify.com/store/${options.store}/themes`]);
    });
  }
}