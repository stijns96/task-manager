import plugin from 'tailwindcss/plugin';

/** @type { import('tailwindcss/types/config').PluginsConfig } */
const badgesComponent = plugin(function ({ theme, addComponents }) {
  addComponents({
    '.badges': {
      '&--sm': {
        '.badge': {
          '@apply px-3 py-1.5 text-xs': {},
        }
      },
      '&--md': {
        '.badge': {
          '@apply px-5 py-2.5 text-sm': {},
        }
      }
    },
    '.badge': {
      '@apply px-3 py-1.5 text-xs md:px-5 md:py-2.5 md:text-sm': {},
      '@apply pointer-events-none inline-block select-none': {},
      '@apply break-words font-bold': {},
      backgroundColor: `var(--product-badge-background, ${theme('backgroundColor.color-default')})`,
      color: `var(--product-badge-text,${theme('textColor.color-default')})`,

      // Variants
      '&--new': {
        '--product-badge-background': theme('colors.primary.DEFAULT'),
        '--product-badge-text': theme('colors.primary.text'),
      },
      '&--sold-out': {
        '--product-badge-background': theme('colors.danger'),
        '--product-badge-text': theme('colors.white'),
      },
      '&--pre-order': {
        '--product-badge-background': theme('colors.accent.DEFAULT'),
        '--product-badge-text': theme('colors.accent.text'),
      },
      '&--sale': {
        '--product-badge-background': theme('colors.success'),
        '--product-badge-text': theme('colors.white'),
      },
    },
  });
});

export default badgesComponent;
