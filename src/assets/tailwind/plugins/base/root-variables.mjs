import plugin from 'tailwindcss/plugin';

/** @type { import('tailwindcss/types/config').PluginsConfig } */
const rootVariables = plugin(function ({ addBase, theme }) {
  addBase({
    ':root': {
      /*
       * Site dimensions
       */

      '--swiper-theme-color': theme('colors.primary.DEFAULT'),

      /*
       * Site dimensions
       */
      '--site-center': '1440px',
      '--site-center-md': '820px',
      '--site-center-sm': '620px',

      /*
       * Spacings
       */
      // Site side spacing
      '--site-side-spacing': theme('spacing.4'),

      // Container
      '--container-spacing': theme('spacing.8'),

      // Element
      '--element-spacing': theme('spacing.6'),

      /*
       * Grid
       */
      // Col gaps
      '--gap-x': theme('gap.4'),
      // Row gaps
      '--gap-y': theme('gap.4'),

      '@screen md': {
        '--site-side-spacing': theme('spacing.10'),
        '--container-spacing': theme('spacing.14'),
        '--gap-x': theme('gap.8'),
        '--gap-y': theme('gap.8'),
      },
    },
  });
});

export default rootVariables;
