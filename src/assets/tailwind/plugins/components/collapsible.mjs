import plugin from 'tailwindcss/plugin';

/** @type { import('tailwindcss/types/config').PluginsConfig } */
const collapsibleComponent = plugin(function ({ theme, addComponents }) {
  addComponents({
    '.js': {
      '[data-collapsible-group]': {
        '[data-collapsible-trigger]' :{
          '@apply select-none': {},
          '&:focus-visible': {
            '@apply text-primary': {},
          },
        },
        '[data-collapsible-target]': {
          '@apply grid grid-rows-[0fr] transition-all': {},
        },
        '&.collapsible-is-open': {
          '> [data-collapsible-target]': {
            '@apply grid-rows-[1fr]': {},
          },
        },
      },
    },
  });
});

export default collapsibleComponent;
