import plugin from 'tailwindcss/plugin';

/** @type { import('tailwindcss/types/config').PluginsConfig } */
const layoutBase = plugin(function ({ addBase, theme }) {
  addBase({
    '.content-for-layout': {
      '@apply flex-auto': {},
    }
  });
});

export default layoutBase;
