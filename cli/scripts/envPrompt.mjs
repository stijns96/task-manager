import fse from "fs-extra";
import prompts from "prompts";
import TOML from "@iarna/toml";

const tomlFile = fse.readFileSync("./shopify.theme.toml", "utf-8");
const { environments } = TOML.parse(tomlFile);

async function envPrompt() {
  const choices = Object.entries(environments).map(([env, options]) => {
    return {
      title: `${env} - ${options.store}`,
      value: {
        env,
        store: options.store,
      },
    };
  });

  return await prompts({
    type: "select",
    name: "value",
    message: "Select environment:",
    choices,
  });
}

export { envPrompt };
