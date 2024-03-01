import plugin from 'tailwindcss/plugin';

/** @type { import('tailwindcss/types/config').PluginsConfig } */
const siteSpacingComponent = plugin(function ({ theme, addComponents }) {
  addComponents({
    '.site-spacing-left': {
      '@apply pl-[--site-side-spacing]': {},
    },
    '.site-spacing-right': {
      '@apply pr-[--site-side-spacing]': {},
    },
    '.site-spacing-side': {
      '@apply px-[--site-side-spacing]': {},
    },
  });
});

export default siteSpacingComponent;
