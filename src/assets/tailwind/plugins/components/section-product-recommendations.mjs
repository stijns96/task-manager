import plugin from 'tailwindcss/plugin';

/** @type { import('tailwindcss/types/config').PluginsConfig } */
const sectionProductRecommendations = plugin(function ({ theme, addComponents }) {
  addComponents({
    '.product-recommendations': {
      '&.color-scheme': {
        '&--primary': {
          '.product-card__information, .price__item': {
            '@apply text-primary-text': {},
          },
          '.price__item': {
            '@apply text-primary-text': {},
            '&--sale': {
              '@apply text-white': {},
            },
            '&--compare': {
              '@apply text-white opacity-60': {},
            },
          },
        },

        '&--secondary': {
          '.product-card__information, .price__item': {
            '&:not(.price__item--sale, .price__item--compare)': {
              '@apply text-secondary-text': {},
            },
          },
        },

        '&--accent': {
          '.product-card__information, .price__item': {
            '@apply text-accent-text': {},
          },
          '.price__item': {
            '&--sale': {
              '@apply text-black': {},
            },
            '&--compare': {
              '@apply text-gray-500': {},
            },
          },
        },
      },
    },
  });
});

export default sectionProductRecommendations;
