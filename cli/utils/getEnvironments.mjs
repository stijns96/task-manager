import fse from "fs-extra";
import prompts from "prompts";
import TOML from "@iarna/toml";

/**
 * Get the environments to push to
 * @param {Boolean} all - Push to all environments if --all flag is set
 * @param {Array} environments - The environments to push to if --environments flag is set
 */
export default async ({ all, environments }) => {
  const tomlFile = fse.readFileSync("./shopify.theme.toml", "utf-8");
  const tomlEnvs = TOML.parse(tomlFile).environments;

  // Return all environments if the --environments flag is set
  if (environments)
    return Object.fromEntries(
      Object.entries(tomlEnvs).filter(([key]) => environments.includes(key)),
    );

  // Return all environments if the --all flag is set
  if (all) return tomlEnvs;

  // Prompt the user to select an environment if no flags are set
  const choices = Object.entries(tomlEnvs).map(([env, options]) => {
    return {
      title: `${env} - ${options.store}`,
      value: env,
    };
  });

  // Store the selected environment
  const { value } = await prompts({
    type: "select",
    name: "value",
    message: "Select environment:",
    choices,
  });

  // Return the selected environment
  return { [value]: tomlEnvs[value] };
};
