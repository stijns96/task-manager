import plugin from 'tailwindcss/plugin';

/** @type { import('tailwindcss/types/config').PluginsConfig } */
const flexibleHolderComponent = plugin(function ({ theme, addComponents }) {
  addComponents({
    '.flexible-holder': {
      '@apply block': {},
      'max-width': 'var(--max-width)',
    },
  });
});

export default flexibleHolderComponent;
