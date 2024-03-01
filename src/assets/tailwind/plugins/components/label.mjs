import plugin from 'tailwindcss/plugin';

/** @type { import('tailwindcss/types/config').PluginsConfig } */
const labelComponent = plugin(function ({ theme, addComponents }) {
  addComponents({
    '.label-sm': {
      '@apply text-xs font-bold leading-4': {},
    },
    '.label, .label-md': {
      '@apply text-sm font-bold leading-5': {},
    },
    '.label-lg': {
      '@apply text-lg font-bold leading-6': {},
    },
    '.label-xl': {
      '@apply text-3xl font-bold leading-8': {},
    },
  });
});

export default labelComponent;
