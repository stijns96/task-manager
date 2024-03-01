import plugin from 'tailwindcss/plugin';

/** @type { import('tailwindcss/types/config').PluginsConfig } */
const iconComponent = plugin(function ({ theme, addComponents }) {
  addComponents({
    '.icon': {
      '@apply block aspect-square h-auto w-4 fill-current': {},
    },
  });
});

export default iconComponent;
