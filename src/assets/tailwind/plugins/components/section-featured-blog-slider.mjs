import plugin from 'tailwindcss/plugin';

/** @type { import('tailwindcss/types/config').PluginsConfig } */
const sectionFeaturedBlogSlider = plugin(function ({ theme, addComponents }) {
  addComponents({
    '.featured-blog-slider': {
      '&.color-scheme': {
        '&--primary, &--accent': {
          '.product-card__list-tags__item': {
            '@apply text-secondary': {},
          },
        },
      },
    },
  });
});

export default sectionFeaturedBlogSlider;
