import plugin from 'tailwindcss/plugin';

/** @type { import('tailwindcss/types/config').PluginsConfig } */
const siteCenterComponent = plugin(function ({ theme, addComponents }) {
  addComponents({
    '.site-center': {
      '@apply mx-auto max-w-[--site-center]': {},
    },
    '.site-center-sm': {
      '@apply mx-auto max-w-[--site-center-sm]': {},
    },
    '.site-center-md': {
      '@apply mx-auto max-w-[--site-center-md]': {},
    },
    '.site-center-wide': {
      '@apply mx-auto max-w-full': {},
    },
    '.site-center-full': {
      '@apply max-w-full px-0': {},
    },
  });
});

export default siteCenterComponent;
