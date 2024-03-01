import plugin from 'tailwindcss/plugin';

/** @type { import('tailwindcss/types/config').PluginsConfig } */
const buttonsComponents = plugin(function ({ theme, addComponents }) {
  addComponents({
    '.button, .shopify-challenge__button': {
      '@apply relative inline-flex flex-wrap items-center justify-center gap-2': {},
      '@apply border border-[--button-border-color,inherit] bg-[--button-background,inherit]': {},
      '@apply px-4 py-[9px]': {},
      '@apply text-sm font-bold leading-4 text-[--button-text,inherit] select-none': {},
      '@apply cursor-pointer no-underline transition-colors': {},
      '@apply states-enabled:border-[--button-hover-border-color,inherit]': {},
      '@apply states-enabled:bg-[--button-hover-background,inherit]': {},
      '@apply states-enabled:text-[--button-hover-text,inherit]': {},
      '@apply states-enabled:no-underline': {},

      '&.loading, &--loading': {
        '@apply pointer-events-none text-transparent': {},
        '&:after': {
          '@apply absolute block aspect-square w-[1.5em] animate-spin rounded-full border-[.2em] border-[--button-text] border-l-transparent content-empty':
            {},
        },
      },

      '&:disabled, &[aria-disabled="true"], &.disabled': {
        '@apply pointer-events-none cursor-not-allowed opacity-50': {},
      },

      '&--primary': {
        '--button-background': theme('colors.primary.DEFAULT'),
        '--button-border-color': theme('colors.primary.DEFAULT'),
        '--button-text': theme('colors.primary.text'),
        '--button-hover-background': theme('colors.primary.600'),
        '--button-hover-border-color': theme('colors.primary.600'),
        '--button-hover-text': theme('colors.primary.text'),
      },

      '&--secondary': {
        '--button-background': theme('colors.secondary.DEFAULT'),
        '--button-border-color': theme('colors.secondary.DEFAULT'),
        '--button-text': theme('colors.secondary.text'),
        '--button-hover-background': theme('colors.secondary.400'),
        '--button-hover-border-color': theme('colors.secondary.400'),
        '--button-hover-text': theme('colors.secondary.text'),
      },

      '&--tertiary': {
        '--button-background': theme('colors.secondary.50'),
        '--button-border-color': theme('colors.secondary.50'),
        '--button-text': theme('colors.black'),
        '--button-hover-background': theme('colors.secondary.100'),
        '--button-hover-border-color': theme('colors.secondary.100'),
        '--button-hover-text': theme('colors.black'),
      },

      '&--outline': {
        '--button-background': 'transparent',
        '--button-border-color': theme('colors.black'),
        '--button-text': theme('colors.black'),
        '--button-hover-background': theme('colors.black'),
        '--button-hover-border-color': theme('colors.black'),
        '--button-hover-text': theme('colors.white'),
      },

      '&--outline-white': {
        '--button-background': 'transparent',
        '--button-border-color': theme('colors.white'),
        '--button-text': theme('colors.white'),
        '--button-hover-background': theme('colors.white'),
        '--button-hover-border-color': theme('colors.white'),
        '--button-hover-text': theme('colors.black'),
      },

      '&--link': {
        '@apply border-transparent': {},
        '--button-background': 'transparent',
        '--button-border-color': 'transparent',
        '--button-text': theme('textColor.color-default'),
        '--button-hover-background': 'transparent',
        '--button-hover-border-color': 'transparent',
        '--button-hover-text': theme('colors.primary.DEFAULT'),
      },

      /* Button sizes */
      '&--sm': {
        '@apply px-3 py-1 text-xs leading-4': {},
      },

      '&--md': {
        '@apply px-4 py-[9px] text-sm leading-5': {},
      },

      '&--lg': {
        '@apply px-8 py-3 text-sm leading-5': {},
      },

      '&--xl': {
        '@apply px-8 py-[19px] text-lg leading-6': {},
      },
    },

    /**
     * Shopify buttons
     */

    // This one is included in the button selector above to reduce duplicate declarations.
    '.shopify-challenge__button': {
      '@apply button--primary button--lg': {},
    },
    '.shopify-payment-button': {
      button: {
        '@apply button--secondary': {},
        '@apply relative box-border inline-flex flex-wrap items-center justify-center gap-2': {},
        '@apply cursor-pointer rounded-none border border-solid border-[--button-border-color,inherit] bg-[--button-background,inherit]':
          {},
        '@apply text-sm font-bold leading-normal no-underline': {},
        '@apply states-enabled:border-[--button-hover-border-color,inherit] states-enabled:bg-[--button-hover-background,inherit] states-enabled:text-[--button-hover-text,inherit] states-enabled:no-underline':
          {},
        '+ button': {
          '@apply mb-2': {},
        },
        '&.shopify-payment-button__button--hidden, &[disabled], &[aria-disabled]': {
          '@apply hidden': {},
        },
      },
    },

    // Overwrite Shopify styling
    '.shopify-payment-button__more-options, .shopify-payment-button__button--unbranded': {
      all: 'unset',
      background: `${theme('colors.secondary.DEFAULT')} !important`,
      'border-radius': '0 !important',
      '@apply states:!bg-secondary-400': {},
    },

    /**
     * Text link without paddings
     */
    '.link': {
      '@apply inline-flex flex-wrap items-center justify-center gap-2': {},
      '@apply text-sm font-bold text-color-link': {},
      '@apply underline cursor-pointer transition-colors states:text-color-link-states states:text-color-link-states states:no-underline':
        {},
      // link in text color
      '&.link--text': {
        '--text-color-link': theme('textColor.color-default'),
        '--text-color-link-states': theme('textColor.color-default'),
      },
    },
  });
});

export default buttonsComponents;
