import plugin from 'tailwindcss/plugin';

/** @type { import('tailwindcss/types/config').PluginsConfig } */
const shopifyBase = plugin(function ({ addBase, theme }) {
  addBase({
    '.shopify-challenge__container': {
      '@apply !mx-auto !my-[--container-spacing]': {},
    },

    '.g-recaptcha': {
      '@apply !mx-auto !my-[16rem]': {},
    },

    '#shopify-privacy-banner': {
      'box-sizing': 'border-box',
    },
  });
});

export default shopifyBase;
