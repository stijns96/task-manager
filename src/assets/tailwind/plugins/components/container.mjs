import plugin from 'tailwindcss/plugin';

/** @type { import('tailwindcss/types/config').PluginsConfig } */
const containerComponent = plugin(function ({ theme, addComponents }) {
  addComponents({
    '.container': {
      '@apply my-[--container-spacing]': {},
      '&--background': {
        '@apply my-0 py-[--container-spacing]': {},
      },
      '&__header, &__content, &__footer': {
        '@apply mx-auto mb-element-spacing w-full max-w-screen-2xl px-[--site-side-spacing] last:mb-0':
          {},

        // Container sizes
        '.container--sm &': {
          '@apply max-w-[--site-center-sm]': {},
        },
        '.container--md &': {
          '@apply max-w-[--site-center-md]': {},
        },
        '.container--wide &': {
          '@apply max-w-full': {},
        },
        '.container--full &': {
          '@apply max-w-full px-0': {},
        },
      },
    },
  });
});

export default containerComponent;
