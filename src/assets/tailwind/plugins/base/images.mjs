import plugin from 'tailwindcss/plugin';

/** @type { import('tailwindcss/types/config').PluginsConfig } */
const imagesBase = plugin(function ({ addBase, theme }) {
  addBase({
    '[data-custom-aspect-ratio="true"]': {
      '@apply object-cover': {},
    },

    '.svg svg': {
      '@apply m-auto max-h-full max-w-full': {}
    }
  });
});

export default imagesBase;
