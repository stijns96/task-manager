import plugin from 'tailwindcss/plugin';

/** @type { import('tailwindcss/types/config').PluginsConfig } */
const accessibilityBase = plugin(function ({ addBase, theme }) {
  addBase({
    '.skip-to-content': {
      '@apply focus:not-sr-only focus:px-4 focus:py-2 focus:text-secondary-text': {}
    },
  });
});

export default accessibilityBase;
