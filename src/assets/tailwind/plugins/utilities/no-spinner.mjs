import plugin from 'tailwindcss/plugin';

/** @type { import('tailwindcss/types/config').PluginsConfig } */
const noSpinnerUtility = plugin(function ({ addUtilities }) {
  addUtilities({
    '.no-spinner': {
      '&': { appearance: 'textfield' },
      '&::-webkit-scrollbar': {
        display: 'none',
      },

      '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
        margin: '0',
        appearance: 'none',
      },
    },
  });
});

export default noSpinnerUtility;
