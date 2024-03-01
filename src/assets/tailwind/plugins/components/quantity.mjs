import plugin from 'tailwindcss/plugin';

/** @type { import('tailwindcss/types/config').PluginsConfig } */
const quantityComponent = plugin(function ({ addComponents }) {
  addComponents({
    '.quantity': {
      '@apply relative flex': {},

      '&__input': {
        '@apply h-10 w-7 appearance-none border-none bg-transparent p-0 text-center text-sm font-bold text-current opacity-80 focus:border-none':
          {},
        '&:focus': {
          '@apply ring-0': {},
        },
        '&[type="number"]': {
          '@apply no-spinner': {},
        },
      },

      '&__button': {
        '@apply flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-color-default bg-transparent p-0 text-black transition-all':
          {},
        '&:hover': {
          '@apply border-primary text-black': {},
          '.icon': {
            '@apply scale-110': {},
          },
        },

        '&:active': {
          '@apply border-primary bg-primary text-white': {},
          '.icon': {
            '@apply scale-100': {},
          },
        },

        '.icon': {
          '@apply pointer-events-none transition-transform duration-75 ease-linear': {},
        },
      },
    },
  });
});

export default quantityComponent;
