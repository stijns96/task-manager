import plugin from 'tailwindcss/plugin';

/** @type { import('tailwindcss/types/config').PluginsConfig } */
const listOptionsComponent = plugin(function ({ theme, addComponents }) {
  addComponents({
    '.list-options': {
      '@apply flex flex-col gap-2': {},
    },

    '.list-option': {
      '@apply relative p-0.5': {},

      '&__input': {
        '@apply sr-only': {},
      },

      '&__label': {
        '@apply relative flex cursor-pointer pl-7 font-body text-sm leading-5 transition-colors text-color-default':
          {},
        '@apply states:text-primary': {},

        '&:before': {
          '@apply absolute left-0 top-1/2 block h-[18px] w-[18px] -translate-y-1/2 rounded-full bg-gray-100 content-empty':
            {},
        },

        '&:after': {
          '@apply absolute left-[5px] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-secondary opacity-0 transition-opacity content-empty':
            {},
        },

        '.icon': {
          '@apply absolute left-0.5 top-1/2 -translate-y-1/2 text-secondary opacity-0 transition-opacity':
            {},
        },

        // Use a checkbox style
        '&--checkmark': {
          '@apply before:rounded-none after:hidden after:content-none': {},
        },

        '&:hover, &:focus, &:active': {
          '.icon, &:after': {
            '@apply opacity-100': {},
          },

          '&--disabled': {
            '@apply pointer-events-none cursor-default line-through opacity-50 text-color-light':
              {},
            '.icon, &:after': {
              '@apply hidden': {},
            },
          },
        },

        '&__input:checked + .list-option__label, .list-option__label--checked': {
          '.icon, &:after': {
            '@apply opacity-100': {},
          },
        },
      },
    },
  });
});

export default listOptionsComponent;
