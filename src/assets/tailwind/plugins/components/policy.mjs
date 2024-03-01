import plugin from 'tailwindcss/plugin';

/** @type { import('tailwindcss/types/config').PluginsConfig } */
const policyComponent = plugin(function ({ theme, addComponents }) {
  addComponents({
    '.template-policy': {
      '.shopify-policy__container': {
        '@apply mx-auto my-[--container-spacing] max-w-[--site-center-md]': {},
      },

      '.rte': {
        '@apply max-w-none': {},
      },

      h1: {
        '@apply mb-element-spacing text-left text-[2.25rem] md:text-[3rem]': {},
      },
    },
  });
});

export default policyComponent;
