import { program } from 'commander';
import terminalLink from 'terminal-link';

program
  .name('themify')
  .description('CLI to develop and build themes for Shopify.')
  .version('0.0.0');

program
  .command('dev')
  .description(`Uploads the current theme as the specified theme, or a ${terminalLink('development theme', 'https://shopify.dev/docs/themes/tools/cli#development-themes')}, to a store so you can preview it.`)
  .option("-e, --environment <env_name>", `The ${terminalLink('environment', 'https://shopify.dev/docs/themes/tools/cli/environments')} from your ${terminalLink('shopify.theme.toml', 'shopify.theme.toml')} that you want to use.`)
  .action(async () => {
    const Dev = await import(`./commands/dev.mjs`);
    const dev = new Dev.default();
    dev.run();
  });

program
  .command('build')
  .description('Build the src folder to the theme folder to make it ready for uploading it to a Shopify.')
  .action(async () => {
    const Build = await import(`./commands/build.mjs`);
    const build = new Build.default();
    build.run();
  });

program
  .command('clean')
  .description('Clean the theme folder to make it ready for a new build.')
  .action(async () => {
    const Clean = await import(`./commands/clean.mjs`);
    const clean = new Clean.default();
    clean.run();
  });

program
  .command('push')
  .description('Uploads your local theme files to Shopify, overwriting the remote version if specified.')
  .option("-e, --environment <env_name>", `The ${terminalLink('environment', 'https://shopify.dev/docs/themes/tools/cli/environments')} from your ${terminalLink('shopify.theme.toml', 'shopify.theme.toml')} that you want to push to.`)
  .action(async () => {
    const Push = await import(`./commands/push.mjs`);
    const push = new Push.default();
    push.run();
  });

program
  .command('pull')
  .description('Retrieves theme files from Shopify in the theme folder.')
  .action(async () => {
    const Pull = await import(`./commands/pull.mjs`);
    const pull = new Pull.default();
    pull.run();
  });

program.parse(process.argv);
