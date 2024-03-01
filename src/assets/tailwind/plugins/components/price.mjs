import plugin from 'tailwindcss/plugin';

/** @type { import('tailwindcss/types/config').PluginsConfig } */
const priceComponent = plugin(function ({ addComponents, theme }) {
  addComponents({
    '.price': {
      'dd, dt': {
        '@apply m-0': '',
      },
      '&__item': {
        '@apply font-bold': {},
        color: `var(--price-color, ${theme('textColor.color-default')})`,
        '&--sale': {
          '--price-color': theme('colors.primary.DEFAULT'),
        },
        '&--compare': {
          '--price-color': theme('textColor.color-light'),
        },
      },
    },
  });
});

export default priceComponent;
