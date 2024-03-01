import plugin from 'tailwindcss/plugin';

/** @type { import('tailwindcss/types/config').PluginsConfig } */
const sectionMainProduct = plugin(function ({ theme, addComponents }) {
  addComponents({
    '.product-media-slider__thumbnails': {
      '.swiper-slide-thumb-active': {
        '@apply border-primary': {},
      },
    },
  });
});

export default sectionMainProduct;
