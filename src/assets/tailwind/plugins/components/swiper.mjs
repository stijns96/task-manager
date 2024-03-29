import plugin from 'tailwindcss/plugin';

/** @type { import('tailwindcss/types/config').PluginsConfig } */
const swiperComponent = plugin(function ({ theme, addComponents }) {
  addComponents({
    '.swiper': {
      '--swiper-theme-color': theme('colors.primary.500'),
      '@apply select-none': {},

      // swiper-button-prev
      // swiper-button-next
      '&-button-prev, &-button-next': {
        // Only style buttons if they are not locked
        '&:not(.swiper-button-lock)': {
          '@apply flex h-10 w-10 items-center justify-center rounded-full border bg-white p-0 text-black transition-colors border-color-default':
            {},
          '&:after': {
            '@apply hidden scale-100': {},
          },
          '&:hover:not([disabled]), &:focus:not([disabled])': {
            '@apply border-black text-black': {},
            '.icon': {
              '@apply scale-110': {},
            },
          },
        },
      },
      '&-button-prev': {
        '@apply left-[--site-side-spacing]': {},
      },
      '&-button-next': {
        '@apply right-[--site-side-spacing]': [],
      },

      // swiper-scrollbar
      '&-scrollbar': {
        // swiper-scrollbar-active
        '&-active': {
          '@apply pb-12': {},
          '&:has(.swiper-scrollbar-lock)': {
            '@apply pb-0': {},
          },
        },
        // swiper-scrollbar-drag
        '&-drag': {
          '@apply bg-[--swiper-theme-color]': {},
        },
      },

      // swiper-pagination
      '&-pagination': {
        // swiper-pagination-active
        '&-active': {
          '@apply pb-12': {},
          '&:has(.swiper-pagination-lock)': {
            '@apply pb-0': {},
          },
        },
        // swiper-pagination-bullet
        '&-bullet': {
          '@apply h-[0.625rem] w-[0.625rem] rounded-lg bg-[--swiper-theme-color] opacity-50 transition-all':
            {},
          // swiper-pagination-bullet-active
          '&-active': {
            '@apply w-4 opacity-100': {},
          },
        },
      },
    },
  });
});

export default swiperComponent;
