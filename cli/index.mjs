import { program } from "commander";
import terminalLink from "terminal-link";
import { globSync } from "glob";
import compileScss from "./utils/compileScss.mjs";
import config from "./config.mjs";

import fse from "fs-extra";
import { Option } from "commander";

const SHOPIFY_ENVIRONMENTS_URL =
  "https://shopify.dev/docs/themes/tools/cli/environments";
const SHOPIFY_THEME_TOML_LINK = terminalLink(
  "shopify.theme.toml",
  "shopify.theme.toml",
);

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
    `The ${terminalLink("environment", SHOPIFY_ENVIRONMENTS_URL)} from your ${SHOPIFY_THEME_TOML_LINK} that you want to use.`,
  )
  .action(async (options) => {
    const Dev = await import(`./commands/dev.mjs`);
    const dev = new Dev.default({ flags: options });
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
    `Comma separated list of the ${terminalLink("environments", SHOPIFY_ENVIRONMENTS_URL)} from your ${SHOPIFY_THEME_TOML_LINK} that you want to push to.`,
    commaSeparatedList,
  )
  .option(
    "-a, --all",
    `Pushes to all ${terminalLink("environments", SHOPIFY_ENVIRONMENTS_URL)} from your ${SHOPIFY_THEME_TOML_LINK}.`,
  )
  .action(async (options) => {
    const Push = await import(`./commands/push.mjs`);
    const push = new Push.default({ flags: options });
    push.run();
  });

/**
 * The `pull` command.
 */
program
  .command("pull")
  .description("Retrieves theme files from Shopify in the theme folder.")
  .option(
    "-e, --environment <env_name>",
    `The ${terminalLink("environment", SHOPIFY_ENVIRONMENTS_URL)} from your ${SHOPIFY_THEME_TOML_LINK} that you want to use.`,
  )
  .addOption(
    new Option(
      "-d, --development",
      `Downloads theme files from your remote ${terminalLink("development theme", "https://shopify.dev/docs/themes/tools/cli#development-themes")}.`,
    ).conflicts("live"),
  )
  .addOption(
    new Option("-l, --live", `Pulls the live theme from your store.`).conflicts(
      "development",
    ),
  )
  .option(
    "-n, --nodelete",
    "Runs the pull command without deleting local files.",
  )
  .action(async (options) => {
    const Pull = await import(`./commands/pull.mjs`);
    const pull = new Pull.default({ flags: options });
    pull.run();
  });

/**
 * The `open` command.
 */
program
  .command("open")
  .description("Opens the Shopify admin in your default browser.")
  .option(
    "--admins",
    `Opens all the Shopify admins  ${terminalLink("environments", SHOPIFY_ENVIRONMENTS_URL)} from your ${SHOPIFY_THEME_TOML_LINK}.`,
  )
  .action(async (options) => {
    const Open = await import(`./commands/open.mjs`);
    const open = new Open.default({ flags: options });
    open.run();
  });

/**
 * Parse the command line arguments.
 */
program.parse(process.argv);
