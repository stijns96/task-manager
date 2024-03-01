import plugin from 'tailwindcss/plugin';

/** @type { import('tailwindcss/types/config').PluginsConfig } */
const optionsComponent = plugin(function ({ addComponents }) {
  addComponents({
    '.options': {
      '@apply flex flex-wrap gap-1': {},
    },

    '.option': {
      '@apply relative p-1.5': {},

      '&__input': {
        '@apply sr-only': {},
      },

      '&__label': {
        '@apply relative flex min-h-[2.25rem] min-w-[36px] cursor-pointer items-center justify-center rounded-[1.125rem] bg-secondary-50 px-2 py-2 text-center text-xs leading-4 text-color-default no-underline transition-colors':
          {},

        '&:before': {
          '@apply absolute -inset-[5px] rounded-[24px] border border-solid border-black opacity-0 transition-opacity content-empty':
            {},
          '@apply states:text-color-default states:no-underline states:before:opacity-100': {},
        },

        '&--disabled': {
          '@apply pointer-events-none cursor-default overflow-hidden text-color-light opacity-50 before:hidden':
            {},
          '&:after': {
            '@apply absolute left-1/2 top-1/2 block h-[200%] w-0.5 -translate-x-1/2 -translate-y-1/2 rotate-45 text-color-default content-empty':
              {},
          },
        },
      },

      '&__input:checked + .option__label, .option__label--checked': {
        '@apply bg-primary-100': {},
        '&:before': {
          '@apply opacity-100': {},
        },
      },
    },
  });
});

export default optionsComponent;
