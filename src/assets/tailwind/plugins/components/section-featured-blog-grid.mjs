import plugin from 'tailwindcss/plugin';

/** @type { import('tailwindcss/types/config').PluginsConfig } */
const sectionFeaturedBlogGrid = plugin(function ({ theme, addComponents }) {
  addComponents({
    '.featured-blog-grid': {
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

export default sectionFeaturedBlogGrid;
