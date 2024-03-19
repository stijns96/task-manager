import { program } from "commander";
import terminalLink from "terminal-link";

const commaSeparatedList = (value, dummyPrevious) => value.split(",");

/**
 * The main entry point for the CLI.
 */
program
  .name("themify")
  .description("CLI to develop and build themes for Shopify.")
  .version("0.0.0");

/**
 * The `dev` command.
 */
program
  .command("dev")
  .description(
    `Uploads the current theme as the specified theme, or a ${terminalLink("development theme", "https://shopify.dev/docs/themes/tools/cli#development-themes")}, to a store so you can preview it.`,
  )
  .option(
    "-e, --environment <env_name>",
    `The ${terminalLink("environment", "https://shopify.dev/docs/themes/tools/cli/environments")} from your ${terminalLink("shopify.theme.toml", "shopify.theme.toml")} that you want to use.`,
  )
  .action(async () => {
    const Dev = await import(`./commands/dev.mjs`);
    const dev = new Dev.default();
    dev.run();
  });

/**
 * The `build` command.
 */
program
  .command("build")
  .description(
    "Build the src folder to the theme folder to make it ready for uploading it to a Shopify.",
  )
  .action(async () => {
    const Build = await import(`./commands/build.mjs`);
    const build = new Build.default();
    build.run();
  });

/**
 * The `clean` command.
 */
program
  .command("clean")
  .description("Clean the theme folder to make it ready for a new build.")
  .action(async () => {
    const Clean = await import(`./commands/clean.mjs`);
    const clean = new Clean.default();
    clean.run();
  });

/**
 * The `push` command.
 */

program
  .command("push")
  .description(
    "Uploads your local theme files to Shopify, overwriting the remote version if specified.",
  )
  .option(
    "-e, --environments <env_names>",
    `Comma separated list of the ${terminalLink("environments", "https://shopify.dev/docs/themes/tools/cli/environments")} from your ${terminalLink("shopify.theme.toml", "shopify.theme.toml")} that you want to push to.`,
    commaSeparatedList,
  )
  .option(
    "-a, --all",
    `Pushes to all ${terminalLink("environments", "https://shopify.dev/docs/themes/tools/cli/environments")} from your ${terminalLink("shopify.theme.toml", "shopify.theme.toml")}.`,
  )
  .action(async (options, command) => {
    const Push = await import(`./commands/push.mjs`);
    const push = new Push.default({ options });
    push.run();
  });

/**
 * The `pull` command.
 */
program
  .command("pull")
  .description("Retrieves theme files from Shopify in the theme folder.")
  .action(async () => {
    const Pull = await import(`./commands/pull.mjs`);
    const pull = new Pull.default();
    pull.run();
  });

/**
 * Parse the command line arguments.
 */
program.parse(process.argv);
